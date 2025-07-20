package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Email       string         `json:"email" gorm:"uniqueIndex;not null"`
	Username    string         `json:"username" gorm:"uniqueIndex;not null"`
	Password    string         `json:"-" gorm:"not null"`
	FirstName   string         `json:"first_name"`
	LastName    string         `json:"last_name"`
	Avatar      string         `json:"avatar"`
	School      string         `json:"school"`
	Grade       int            `json:"grade"`
	Points      int            `json:"points" gorm:"default:0"`
	Role        string         `json:"role" gorm:"default:student"` // student, moderator, admin
	IsActive    bool           `json:"is_active" gorm:"default:true"`
	LastLoginAt *time.Time     `json:"last_login_at"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`

	// Связи
	Announcements      []Announcement      `json:"announcements,omitempty" gorm:"foreignKey:AuthorID"`
	Communities        []Community         `json:"communities,omitempty" gorm:"foreignKey:CreatorID"`
	StudyMaterials     []StudyMaterial     `json:"study_materials,omitempty" gorm:"foreignKey:AuthorID"`
	Comments           []Comment           `json:"comments,omitempty" gorm:"foreignKey:AuthorID"`
	EventRegistrations []EventRegistration `json:"event_registrations,omitempty" gorm:"foreignKey:UserID"`
	CommunityMembers   []CommunityMember   `json:"community_members,omitempty" gorm:"foreignKey:UserID"`
	MaterialVotes      []MaterialVote      `json:"material_votes,omitempty" gorm:"foreignKey:UserID"`
	UserPoints         []UserPoint         `json:"user_points,omitempty" gorm:"foreignKey:UserID"`
}

type UserPoint struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	UserID      uint      `json:"user_id" gorm:"not null"`
	Points      int       `json:"points" gorm:"not null"`
	Action      string    `json:"action" gorm:"not null"` // post_announcement, join_community, upload_material, etc.
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`

	// Связи
	User User `json:"user,omitempty" gorm:"foreignKey:UserID"`
}