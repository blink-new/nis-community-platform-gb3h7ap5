package models

import (
	"time"

	"gorm.io/gorm"
)

type Community struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Name        string         `json:"name" gorm:"not null"`
	Description string         `json:"description" gorm:"type:text"`
	Category    string         `json:"category" gorm:"not null"` // academic, sports, arts, tech, etc.
	CreatorID   uint           `json:"creator_id" gorm:"not null"`
	ImageURL    string         `json:"image_url"`
	IsActive    bool           `json:"is_active" gorm:"default:true"`
	IsPrivate   bool           `json:"is_private" gorm:"default:false"`
	MaxMembers  int            `json:"max_members" gorm:"default:0"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`

	// Связи
	Creator  User              `json:"creator,omitempty" gorm:"foreignKey:CreatorID"`
	Members  []CommunityMember `json:"members,omitempty" gorm:"foreignKey:CommunityID"`
	Comments []Comment         `json:"comments,omitempty" gorm:"foreignKey:TargetID;constraint:OnDelete:CASCADE"`
}

type CommunityMember struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	UserID      uint      `json:"user_id" gorm:"not null"`
	CommunityID uint      `json:"community_id" gorm:"not null"`
	Role        string    `json:"role" gorm:"default:member"` // member, moderator, admin
	JoinedAt    time.Time `json:"joined_at"`

	// Связи
	User      User      `json:"user,omitempty" gorm:"foreignKey:UserID"`
	Community Community `json:"community,omitempty" gorm:"foreignKey:CommunityID"`
}