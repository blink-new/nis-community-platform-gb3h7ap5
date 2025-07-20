package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"nis-platform/models"
)

type UserHandler struct {
	db *gorm.DB
}

func NewUserHandler(db *gorm.DB) *UserHandler {
	return &UserHandler{db: db}
}

func (h *UserHandler) GetProfile(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var user models.User
	if err := h.db.Preload("UserPoints").First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Убираем пароль из ответа
	user.Password = ""

	// Получаем статистику пользователя
	var stats struct {
		AnnouncementsCount int64 `json:"announcements_count"`
		CommunitiesCount   int64 `json:"communities_count"`
		MaterialsCount     int64 `json:"materials_count"`
		CommentsCount      int64 `json:"comments_count"`
	}

	h.db.Model(&models.Announcement{}).Where("author_id = ?", userID).Count(&stats.AnnouncementsCount)
	h.db.Model(&models.Community{}).Where("creator_id = ?", userID).Count(&stats.CommunitiesCount)
	h.db.Model(&models.StudyMaterial{}).Where("author_id = ?", userID).Count(&stats.MaterialsCount)
	h.db.Model(&models.Comment{}).Where("author_id = ?", userID).Count(&stats.CommentsCount)

	c.JSON(http.StatusOK, gin.H{
		"user":  user,
		"stats": stats,
	})
}

func (h *UserHandler) UpdateProfile(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var user models.User
	if err := h.db.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	type UpdateRequest struct {
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		Avatar    string `json:"avatar"`
		School    string `json:"school"`
		Grade     int    `json:"grade"`
	}

	var req UpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Обновляем только разрешенные поля
	updates := map[string]interface{}{
		"first_name": req.FirstName,
		"last_name":  req.LastName,
		"avatar":     req.Avatar,
		"school":     req.School,
		"grade":      req.Grade,
	}

	if err := h.db.Model(&user).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}

	// Убираем пароль из ответа
	user.Password = ""

	c.JSON(http.StatusOK, user)
}

func (h *UserHandler) GetLeaderboard(c *gin.Context) {
	var users []models.User
	
	// Параметры пагинации
	limit := 50
	if l := c.Query("limit"); l != "" {
		// Можно добавить парсинг лимита
	}

	// Фильтрация по школе
	query := h.db.Where("is_active = ?", true)
	if school := c.Query("school"); school != "" {
		query = query.Where("school = ?", school)
	}

	// Фильтрация по классу
	if grade := c.Query("grade"); grade != "" {
		query = query.Where("grade = ?", grade)
	}

	// Сортировка по очкам
	query = query.Order("points DESC, created_at ASC").Limit(limit)

	if err := query.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch leaderboard"})
		return
	}

	// Убираем пароли и добавляем позиции
	leaderboard := make([]gin.H, len(users))
	for i, user := range users {
		leaderboard[i] = gin.H{
			"position":   i + 1,
			"id":         user.ID,
			"username":   user.Username,
			"first_name": user.FirstName,
			"last_name":  user.LastName,
			"avatar":     user.Avatar,
			"school":     user.School,
			"grade":      user.Grade,
			"points":     user.Points,
			"created_at": user.CreatedAt,
		}
	}

	c.JSON(http.StatusOK, leaderboard)
}