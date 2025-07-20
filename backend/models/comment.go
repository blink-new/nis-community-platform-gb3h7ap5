package models

import (
	"time"

	"gorm.io/gorm"
)

type Comment struct {
	ID         uint           `json:"id" gorm:"primaryKey"`
	Content    string         `json:"content" gorm:"type:text;not null"`
	AuthorID   uint           `json:"author_id" gorm:"not null"`
	TargetID   uint           `json:"target_id" gorm:"not null"`
	TargetType string         `json:"target_type" gorm:"not null"` // announcement, community, material
	ParentID   *uint          `json:"parent_id"`                   // для ответов на комментарии
	IsEdited   bool           `json:"is_edited" gorm:"default:false"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `json:"-" gorm:"index"`

	// Связи
	Author  User      `json:"author,omitempty" gorm:"foreignKey:AuthorID"`
	Parent  *Comment  `json:"parent,omitempty" gorm:"foreignKey:ParentID"`
	Replies []Comment `json:"replies,omitempty" gorm:"foreignKey:ParentID"`
}