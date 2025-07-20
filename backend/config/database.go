package config

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func ConnectDB() *gorm.DB {
	var db *gorm.DB
	var err error

	// Проверяем переменную окружения для типа БД
	dbType := os.Getenv("DB_TYPE")
	if dbType == "" {
		dbType = "sqlite" // По умолчанию SQLite для разработки
	}

	switch dbType {
	case "postgres":
		dsn := os.Getenv("DATABASE_URL")
		if dsn == "" {
			dsn = "host=localhost user=postgres password=password dbname=nis_platform port=5432 sslmode=disable"
		}
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Info),
		})
	case "sqlite":
		dbPath := os.Getenv("SQLITE_PATH")
		if dbPath == "" {
			dbPath = "./nis_platform.db"
		}
		db, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Info),
		})
	default:
		log.Fatal("Unsupported database type: " + dbType)
	}

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connected successfully")
	return db
}