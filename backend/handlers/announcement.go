package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"nis-platform/models"
)

type AnnouncementHandler struct {
	db *gorm.DB
}

func NewAnnouncementHandler(db *gorm.DB) *AnnouncementHandler {
	return &AnnouncementHandler{db: db}
}

func (h *AnnouncementHandler) GetAnnouncements(c *gin.Context) {
	var announcements []models.Announcement
	
	query := h.db.Preload("Author").Preload("EventRegistrations.User")
	
	// Фильтрация по категории
	if category := c.Query("category"); category != "" {
		query = query.Where("category = ?", category)
	}
	
	// Фильтрация по типу
	if announcementType := c.Query("type"); announcementType != "" {
		query = query.Where("type = ?", announcementType)
	}
	
	// Сортировка
	query = query.Order("is_pinned DESC, created_at DESC")
	
	if err := query.Find(&announcements).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch announcements"})
		return
	}

	c.JSON(http.StatusOK, announcements)
}

func (h *AnnouncementHandler) GetAnnouncement(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid announcement ID"})
		return
	}

	var announcement models.Announcement
	if err := h.db.Preload("Author").Preload("Comments.Author").Preload("EventRegistrations.User").First(&announcement, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Announcement not found"})
		return
	}

	// Увеличиваем счетчик просмотров
	h.db.Model(&announcement).Update("view_count", gorm.Expr("view_count + 1"))

	c.JSON(http.StatusOK, announcement)
}

func (h *AnnouncementHandler) CreateAnnouncement(c *gin.Context) {
	userID, _ := c.Get("user_id")
	
	var announcement models.Announcement
	if err := c.ShouldBindJSON(&announcement); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	announcement.AuthorID = userID.(uint)

	if err := h.db.Create(&announcement).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create announcement"})
		return
	}

	// Начисляем очки за создание объявления
	userPoint := models.UserPoint{
		UserID:      userID.(uint),
		Points:      5,
		Action:      "create_announcement",
		Description: "Создание объявления",
	}
	h.db.Create(&userPoint)

	// Обновляем общие очки пользователя
	h.db.Model(&models.User{}).Where("id = ?", userID).Update("points", gorm.Expr("points + 5"))

	// Загружаем автора для ответа
	h.db.Preload("Author").First(&announcement, announcement.ID)

	c.JSON(http.StatusCreated, announcement)
}

func (h *AnnouncementHandler) UpdateAnnouncement(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid announcement ID"})
		return
	}

	userID, _ := c.Get("user_id")
	userRole, _ := c.Get("user_role")

	var announcement models.Announcement
	if err := h.db.First(&announcement, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Announcement not found"})
		return
	}

	// Проверяем права доступа
	if announcement.AuthorID != userID.(uint) && userRole != "admin" && userRole != "moderator" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
		return
	}

	var updateData models.Announcement
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.db.Model(&announcement).Updates(updateData).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update announcement"})
		return
	}

	h.db.Preload("Author").First(&announcement, announcement.ID)
	c.JSON(http.StatusOK, announcement)
}

func (h *AnnouncementHandler) DeleteAnnouncement(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid announcement ID"})
		return
	}

	userID, _ := c.Get("user_id")
	userRole, _ := c.Get("user_role")

	var announcement models.Announcement
	if err := h.db.First(&announcement, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Announcement not found"})
		return
	}

	// Проверяем права доступа
	if announcement.AuthorID != userID.(uint) && userRole != "admin" && userRole != "moderator" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
		return
	}

	if err := h.db.Delete(&announcement).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete announcement"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Announcement deleted successfully"})
}

func (h *AnnouncementHandler) RegisterForEvent(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid announcement ID"})
		return
	}

	userID, _ := c.Get("user_id")

	var announcement models.Announcement
	if err := h.db.First(&announcement, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Announcement not found"})
		return
	}

	if announcement.Type != "event" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This is not an event"})
		return
	}

	// Проверяем, не зарегистрирован ли уже пользователь
	var existingRegistration models.EventRegistration
	if err := h.db.Where("user_id = ? AND announcement_id = ?", userID, id).First(&existingRegistration).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Already registered for this event"})
		return
	}

	// Проверяем лимит участников
	if announcement.MaxSlots > 0 {
		var registrationCount int64
		h.db.Model(&models.EventRegistration{}).Where("announcement_id = ? AND status = ?", id, "registered").Count(&registrationCount)
		if registrationCount >= int64(announcement.MaxSlots) {
			c.JSON(http.StatusConflict, gin.H{"error": "Event is full"})
			return
		}
	}

	// Создаем регистрацию
	registration := models.EventRegistration{
		UserID:         userID.(uint),
		AnnouncementID: uint(id),
		Status:         "registered",
	}

	if err := h.db.Create(&registration).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register for event"})
		return
	}

	// Начисляем очки за регистрацию на мероприятие
	userPoint := models.UserPoint{
		UserID:      userID.(uint),
		Points:      3,
		Action:      "event_registration",
		Description: "Регистрация на мероприятие",
	}
	h.db.Create(&userPoint)

	// Обновляем общие очки пользователя
	h.db.Model(&models.User{}).Where("id = ?", userID).Update("points", gorm.Expr("points + 3"))

	c.JSON(http.StatusCreated, gin.H{"message": "Successfully registered for event"})
}