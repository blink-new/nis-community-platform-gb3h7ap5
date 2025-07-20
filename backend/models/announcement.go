package models

import (
	"time"

	"gorm.io/gorm"
)

type Announcement struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Title       string         `json:"title" gorm:"not null"`
	Content     string         `json:"content" gorm:"type:text"`
	Category    string         `json:"category" gorm:"not null"` // school, network, event
	Type        string         `json:"type" gorm:"not null"`     // announcement, event
	AuthorID    uint           `json:"author_id" gorm:"not null"`
	ImageURL    string         `json:"image_url"`
	EventDate   *time.Time     `json:"event_date"`
	Location    string         `json:"location"`
	MaxSlots    int            `json:"max_slots" gorm:"default:0"`
	IsActive    bool           `json:"is_active" gorm:"default:true"`
	IsPinned    bool           `json:"is_pinned" gorm:"default:false"`
	ViewCount   int            `json:"view_count" gorm:"default:0"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`

	// Связи
	Author             User                `json:"author,omitempty" gorm:"foreignKey:AuthorID"`
	Comments           []Comment           `json:"comments,omitempty" gorm:"foreignKey:TargetID;constraint:OnDelete:CASCADE"`
	EventRegistrations []EventRegistration `json:"event_registrations,omitempty" gorm:"foreignKey:AnnouncementID"`
}

type EventRegistration struct {
	ID             uint      `json:"id" gorm:"primaryKey"`
	UserID         uint      `json:"user_id" gorm:"not null"`
	AnnouncementID uint      `json:"announcement_id" gorm:"not null"`
	Status         string    `json:"status" gorm:"default:registered"` // registered, attended, cancelled
	CreatedAt      time.Time `json:"created_at"`

	// Связи
	User         User         `json:"user,omitempty" gorm:"foreignKey:UserID"`
	Announcement Announcement `json:"announcement,omitempty" gorm:"foreignKey:AnnouncementID"`
}