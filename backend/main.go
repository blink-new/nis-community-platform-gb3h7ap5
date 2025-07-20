package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"nis-platform/config"
	"nis-platform/handlers"
	"nis-platform/middleware"
	"nis-platform/models"
)

func main() {
	// Загрузка переменных окружения
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Подключение к базе данных
	db := config.ConnectDB()

	// Автомиграция моделей
	db.AutoMigrate(
		&models.User{},
		&models.Announcement{},
		&models.Community{},
		&models.StudyMaterial{},
		&models.Comment{},
		&models.UserPoint{},
		&models.EventRegistration{},
		&models.CommunityMember{},
		&models.MaterialVote{},
	)

	// Создание роутера
	r := gin.Default()

	// CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://nis-community-platform-gb3h7ap5.sites.blink.new"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	// Инициализация хендлеров
	authHandler := handlers.NewAuthHandler(db)
	announcementHandler := handlers.NewAnnouncementHandler(db)
	communityHandler := handlers.NewCommunityHandler(db)
	materialHandler := handlers.NewMaterialHandler(db)
	userHandler := handlers.NewUserHandler(db)

	// Публичные роуты
	auth := r.Group("/api/auth")
	{
		auth.POST("/register", authHandler.Register)
		auth.POST("/login", authHandler.Login)
		auth.POST("/refresh", authHandler.RefreshToken)
	}

	// Защищенные роуты
	api := r.Group("/api")
	api.Use(middleware.AuthMiddleware())
	{
		// Пользователи
		api.GET("/profile", userHandler.GetProfile)
		api.PUT("/profile", userHandler.UpdateProfile)
		api.GET("/leaderboard", userHandler.GetLeaderboard)

		// Объявления
		api.GET("/announcements", announcementHandler.GetAnnouncements)
		api.POST("/announcements", announcementHandler.CreateAnnouncement)
		api.GET("/announcements/:id", announcementHandler.GetAnnouncement)
		api.PUT("/announcements/:id", announcementHandler.UpdateAnnouncement)
		api.DELETE("/announcements/:id", announcementHandler.DeleteAnnouncement)
		api.POST("/announcements/:id/register", announcementHandler.RegisterForEvent)

		// Сообщества
		api.GET("/communities", communityHandler.GetCommunities)
		api.POST("/communities", communityHandler.CreateCommunity)
		api.GET("/communities/:id", communityHandler.GetCommunity)
		api.PUT("/communities/:id", communityHandler.UpdateCommunity)
		api.DELETE("/communities/:id", communityHandler.DeleteCommunity)
		api.POST("/communities/:id/join", communityHandler.JoinCommunity)
		api.DELETE("/communities/:id/leave", communityHandler.LeaveCommunity)

		// Учебные материалы
		api.GET("/materials", materialHandler.GetMaterials)
		api.POST("/materials", materialHandler.CreateMaterial)
		api.GET("/materials/:id", materialHandler.GetMaterial)
		api.PUT("/materials/:id", materialHandler.UpdateMaterial)
		api.DELETE("/materials/:id", materialHandler.DeleteMaterial)
		api.POST("/materials/:id/vote", materialHandler.VoteMaterial)

		// Комментарии
		api.GET("/comments/:type/:id", materialHandler.GetComments)
		api.POST("/comments", materialHandler.CreateComment)
		api.DELETE("/comments/:id", materialHandler.DeleteComment)
	}

	// Статические файлы
	r.Static("/uploads", "./uploads")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	r.Run(":" + port)
}