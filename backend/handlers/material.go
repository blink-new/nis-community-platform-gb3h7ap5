package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"nis-platform/models"
)

type MaterialHandler struct {
	db *gorm.DB
}

func NewMaterialHandler(db *gorm.DB) *MaterialHandler {
	return &MaterialHandler{db: db}
}

func (h *MaterialHandler) GetMaterials(c *gin.Context) {
	var materials []models.StudyMaterial
	
	query := h.db.Preload("Author").Preload("Votes")
	
	// Фильтрация по предмету
	if subject := c.Query("subject"); subject != "" {
		query = query.Where("subject = ?", subject)
	}
	
	// Фильтрация по классу
	if grade := c.Query("grade"); grade != "" {
		query = query.Where("grade = ?", grade)
	}
	
	// Фильтрация по типу
	if materialType := c.Query("type"); materialType != "" {
		query = query.Where("type = ?", materialType)
	}
	
	// Только одобренные материалы для обычных пользователей
	userRole, _ := c.Get("user_role")
	if userRole != "admin" && userRole != "moderator" {
		query = query.Where("is_approved = ?", true)
	}
	
	// Сортировка
	sortBy := c.DefaultQuery("sort", "created_at")
	order := c.DefaultQuery("order", "desc")
	
	switch sortBy {
	case "rating":
		query = query.Order("(up_votes - down_votes) " + order + ", created_at DESC")
	case "downloads":
		query = query.Order("downloads " + order + ", created_at DESC")
	default:
		query = query.Order("created_at " + order)
	}
	
	if err := query.Find(&materials).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch materials"})
		return
	}

	c.JSON(http.StatusOK, materials)
}

func (h *MaterialHandler) GetMaterial(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid material ID"})
		return
	}

	var material models.StudyMaterial
	if err := h.db.Preload("Author").Preload("Comments.Author").Preload("Votes.User").First(&material, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Material not found"})
		return
	}

	c.JSON(http.StatusOK, material)
}

func (h *MaterialHandler) CreateMaterial(c *gin.Context) {
	userID, _ := c.Get("user_id")
	
	var material models.StudyMaterial
	if err := c.ShouldBindJSON(&material); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	material.AuthorID = userID.(uint)
	material.IsApproved = false // Требует модерации

	if err := h.db.Create(&material).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create material"})
		return
	}

	// Начисляем очки за загрузку материала
	userPoint := models.UserPoint{
		UserID:      userID.(uint),
		Points:      5,
		Action:      "upload_material",
		Description: "Загрузка учебного материала",
	}
	h.db.Create(&userPoint)

	// Обновляем общие очки пользователя
	h.db.Model(&models.User{}).Where("id = ?", userID).Update("points", gorm.Expr("points + 5"))

	// Загружаем автора для ответа
	h.db.Preload("Author").First(&material, material.ID)

	c.JSON(http.StatusCreated, material)
}

func (h *MaterialHandler) UpdateMaterial(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid material ID"})
		return
	}

	userID, _ := c.Get("user_id")
	userRole, _ := c.Get("user_role")

	var material models.StudyMaterial
	if err := h.db.First(&material, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Material not found"})
		return
	}

	// Проверяем права доступа
	if material.AuthorID != userID.(uint) && userRole != "admin" && userRole != "moderator" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
		return
	}

	var updateData models.StudyMaterial
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.db.Model(&material).Updates(updateData).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update material"})
		return
	}

	h.db.Preload("Author").First(&material, material.ID)
	c.JSON(http.StatusOK, material)
}

func (h *MaterialHandler) DeleteMaterial(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid material ID"})
		return
	}

	userID, _ := c.Get("user_id")
	userRole, _ := c.Get("user_role")

	var material models.StudyMaterial
	if err := h.db.First(&material, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Material not found"})
		return
	}

	// Проверяем права доступа
	if material.AuthorID != userID.(uint) && userRole != "admin" && userRole != "moderator" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
		return
	}

	if err := h.db.Delete(&material).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete material"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Material deleted successfully"})
}

func (h *MaterialHandler) VoteMaterial(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid material ID"})
		return
	}

	userID, _ := c.Get("user_id")

	type VoteRequest struct {
		VoteType string `json:"vote_type" binding:"required,oneof=up down"`
	}

	var req VoteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var material models.StudyMaterial
	if err := h.db.First(&material, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Material not found"})
		return
	}

	// Проверяем существующий голос
	var existingVote models.MaterialVote
	if err := h.db.Where("user_id = ? AND material_id = ?", userID, id).First(&existingVote).Error; err == nil {
		// Если голос уже существует и тот же тип - удаляем
		if existingVote.VoteType == req.VoteType {
			h.db.Delete(&existingVote)
			
			// Обновляем счетчики
			if req.VoteType == "up" {
				h.db.Model(&material).Update("up_votes", gorm.Expr("up_votes - 1"))
			} else {
				h.db.Model(&material).Update("down_votes", gorm.Expr("down_votes - 1"))
			}
			
			c.JSON(http.StatusOK, gin.H{"message": "Vote removed"})
			return
		} else {
			// Если другой тип голоса - обновляем
			h.db.Model(&existingVote).Update("vote_type", req.VoteType)
			
			// Обновляем счетчики
			if req.VoteType == "up" {
				h.db.Model(&material).Updates(map[string]interface{}{
					"up_votes":   gorm.Expr("up_votes + 1"),
					"down_votes": gorm.Expr("down_votes - 1"),
				})
			} else {
				h.db.Model(&material).Updates(map[string]interface{}{
					"up_votes":   gorm.Expr("up_votes - 1"),
					"down_votes": gorm.Expr("down_votes + 1"),
				})
			}
			
			c.JSON(http.StatusOK, gin.H{"message": "Vote updated"})
			return
		}
	}

	// Создаем новый голос
	vote := models.MaterialVote{
		UserID:     userID.(uint),
		MaterialID: uint(id),
		VoteType:   req.VoteType,
	}

	if err := h.db.Create(&vote).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to vote"})
		return
	}

	// Обновляем счетчики
	if req.VoteType == "up" {
		h.db.Model(&material).Update("up_votes", gorm.Expr("up_votes + 1"))
	} else {
		h.db.Model(&material).Update("down_votes", gorm.Expr("down_votes + 1"))
	}

	// Начисляем очки автору за положительный голос
	if req.VoteType == "up" {
		userPoint := models.UserPoint{
			UserID:      material.AuthorID,
			Points:      1,
			Action:      "material_upvote",
			Description: "Положительная оценка материала",
		}
		h.db.Create(&userPoint)
		h.db.Model(&models.User{}).Where("id = ?", material.AuthorID).Update("points", gorm.Expr("points + 1"))
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Vote recorded"})
}

func (h *MaterialHandler) GetComments(c *gin.Context) {
	targetType := c.Param("type")
	targetID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid target ID"})
		return
	}

	var comments []models.Comment
	if err := h.db.Preload("Author").Preload("Replies.Author").Where("target_type = ? AND target_id = ? AND parent_id IS NULL", targetType, targetID).Order("created_at ASC").Find(&comments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch comments"})
		return
	}

	c.JSON(http.StatusOK, comments)
}

func (h *MaterialHandler) CreateComment(c *gin.Context) {
	userID, _ := c.Get("user_id")
	
	var comment models.Comment
	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	comment.AuthorID = userID.(uint)

	if err := h.db.Create(&comment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create comment"})
		return
	}

	// Начисляем очки за комментарий
	userPoint := models.UserPoint{
		UserID:      userID.(uint),
		Points:      1,
		Action:      "create_comment",
		Description: "Написание комментария",
	}
	h.db.Create(&userPoint)

	// Обновляем общие очки пользователя
	h.db.Model(&models.User{}).Where("id = ?", userID).Update("points", gorm.Expr("points + 1"))

	// Загружаем автора для ответа
	h.db.Preload("Author").First(&comment, comment.ID)

	c.JSON(http.StatusCreated, comment)
}

func (h *MaterialHandler) DeleteComment(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid comment ID"})
		return
	}

	userID, _ := c.Get("user_id")
	userRole, _ := c.Get("user_role")

	var comment models.Comment
	if err := h.db.First(&comment, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Comment not found"})
		return
	}

	// Проверяем права доступа
	if comment.AuthorID != userID.(uint) && userRole != "admin" && userRole != "moderator" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
		return
	}

	if err := h.db.Delete(&comment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete comment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Comment deleted successfully"})
}