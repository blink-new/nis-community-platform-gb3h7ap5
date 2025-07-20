package models

import (
	"time"

	"gorm.io/gorm"
)

type StudyMaterial struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Title       string         `json:"title" gorm:"not null"`
	Description string         `json:"description" gorm:"type:text"`
	Subject     string         `json:"subject" gorm:"not null"`
	Grade       int            `json:"grade" gorm:"not null"`
	Type        string         `json:"type" gorm:"not null"` // notes, presentation, video, document
	AuthorID    uint           `json:"author_id" gorm:"not null"`
	FileURL     string         `json:"file_url"`
	FileName    string         `json:"file_name"`
	FileSize    int64          `json:"file_size"`
	UpVotes     int            `json:"up_votes" gorm:"default:0"`
	DownVotes   int            `json:"down_votes" gorm:"default:0"`
	Downloads   int            `json:"downloads" gorm:"default:0"`
	IsApproved  bool           `json:"is_approved" gorm:"default:false"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`

	// Связи
	Author   User           `json:"author,omitempty" gorm:"foreignKey:AuthorID"`
	Comments []Comment      `json:"comments,omitempty" gorm:"foreignKey:TargetID;constraint:OnDelete:CASCADE"`
	Votes    []MaterialVote `json:"votes,omitempty" gorm:"foreignKey:MaterialID"`
}

type MaterialVote struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	UserID     uint      `json:"user_id" gorm:"not null"`
	MaterialID uint      `json:"material_id" gorm:"not null"`
	VoteType   string    `json:"vote_type" gorm:"not null"` // up, down
	CreatedAt  time.Time `json:"created_at"`

	// Связи
	User     User          `json:"user,omitempty" gorm:"foreignKey:UserID"`
	Material StudyMaterial `json:"material,omitempty" gorm:"foreignKey:MaterialID"`
}