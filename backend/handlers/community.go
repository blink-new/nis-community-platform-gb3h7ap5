package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"nis-platform/models"
)

type CommunityHandler struct {
	db *gorm.DB
}

func NewCommunityHandler(db *gorm.DB) *CommunityHandler {
	return &CommunityHandler{db: db}
}

func (h *CommunityHandler) GetCommunities(c *gin.Context) {
	var communities []models.Community
	
	query := h.db.Preload("Creator").Preload("Members.User")
	
	// Фильтрация по категории
	if category := c.Query("category"); category != "" {
		query = query.Where("category = ?", category)
	}
	
	// Только активные сообщества
	query = query.Where("is_active = ?", true)
	
	// Сортировка по количеству участников
	query = query.Order("created_at DESC")
	
	if err := query.Find(&communities).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch communities"})
		return
	}

	c.JSON(http.StatusOK, communities)
}

func (h *CommunityHandler) GetCommunity(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid community ID"})
		return
	}

	var community models.Community
	if err := h.db.Preload("Creator").Preload("Members.User").Preload("Comments.Author").First(&community, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Community not found"})
		return
	}

	c.JSON(http.StatusOK, community)
}

func (h *CommunityHandler) CreateCommunity(c *gin.Context) {
	userID, _ := c.Get("user_id")
	
	var community models.Community
	if err := c.ShouldBindJSON(&community); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	community.CreatorID = userID.(uint)

	if err := h.db.Create(&community).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create community"})
		return
	}

	// Автоматически добавляем создателя как администратора сообщества
	member := models.CommunityMember{
		UserID:      userID.(uint),
		CommunityID: community.ID,
		Role:        "admin",
	}
	h.db.Create(&member)

	// Начисляем очки за создание сообщества
	userPoint := models.UserPoint{
		UserID:      userID.(uint),
		Points:      10,
		Action:      "create_community",
		Description: "Создание сообщества",
	}
	h.db.Create(&userPoint)

	// Обновляем общие очки пользователя
	h.db.Model(&models.User{}).Where("id = ?", userID).Update("points", gorm.Expr("points + 10"))

	// Загружаем создателя для ответа
	h.db.Preload("Creator").Preload("Members.User").First(&community, community.ID)

	c.JSON(http.StatusCreated, community)
}

func (h *CommunityHandler) UpdateCommunity(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid community ID"})
		return
	}

	userID, _ := c.Get("user_id")
	userRole, _ := c.Get("user_role")

	var community models.Community
	if err := h.db.First(&community, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Community not found"})
		return
	}

	// Проверяем права доступа
	var member models.CommunityMember
	isMember := h.db.Where("user_id = ? AND community_id = ? AND role IN ?", userID, id, []string{"admin", "moderator"}).First(&member).Error == nil
	
	if community.CreatorID != userID.(uint) && !isMember && userRole != "admin" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
		return
	}

	var updateData models.Community
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.db.Model(&community).Updates(updateData).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update community"})
		return
	}

	h.db.Preload("Creator").Preload("Members.User").First(&community, community.ID)
	c.JSON(http.StatusOK, community)
}

func (h *CommunityHandler) DeleteCommunity(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid community ID"})
		return
	}

	userID, _ := c.Get("user_id")
	userRole, _ := c.Get("user_role")

	var community models.Community
	if err := h.db.First(&community, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Community not found"})
		return
	}

	// Проверяем права доступа
	if community.CreatorID != userID.(uint) && userRole != "admin" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
		return
	}

	if err := h.db.Delete(&community).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete community"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Community deleted successfully"})
}

func (h *CommunityHandler) JoinCommunity(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid community ID"})
		return
	}

	userID, _ := c.Get("user_id")

	var community models.Community
	if err := h.db.First(&community, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Community not found"})
		return
	}

	// Проверяем, не является ли уже участником
	var existingMember models.CommunityMember
	if err := h.db.Where("user_id = ? AND community_id = ?", userID, id).First(&existingMember).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Already a member of this community"})
		return
	}

	// Проверяем лимит участников
	if community.MaxMembers > 0 {
		var memberCount int64
		h.db.Model(&models.CommunityMember{}).Where("community_id = ?", id).Count(&memberCount)
		if memberCount >= int64(community.MaxMembers) {
			c.JSON(http.StatusConflict, gin.H{"error": "Community is full"})
			return
		}
	}

	// Создаем участника
	member := models.CommunityMember{
		UserID:      userID.(uint),
		CommunityID: uint(id),
		Role:        "member",
	}

	if err := h.db.Create(&member).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to join community"})
		return
	}

	// Начисляем очки за вступление в сообщество
	userPoint := models.UserPoint{
		UserID:      userID.(uint),
		Points:      2,
		Action:      "join_community",
		Description: "Вступление в сообщество",
	}
	h.db.Create(&userPoint)

	// Обновляем общие очки пользователя
	h.db.Model(&models.User{}).Where("id = ?", userID).Update("points", gorm.Expr("points + 2"))

	c.JSON(http.StatusCreated, gin.H{"message": "Successfully joined community"})
}

func (h *CommunityHandler) LeaveCommunity(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid community ID"})
		return
	}

	userID, _ := c.Get("user_id")

	var member models.CommunityMember
	if err := h.db.Where("user_id = ? AND community_id = ?", userID, id).First(&member).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not a member of this community"})
		return
	}

	// Проверяем, не является ли создателем сообщества
	var community models.Community
	h.db.First(&community, id)
	if community.CreatorID == userID.(uint) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Creator cannot leave community"})
		return
	}

	if err := h.db.Delete(&member).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to leave community"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully left community"})
}