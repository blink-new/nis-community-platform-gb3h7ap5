# НИШ Платформа - Backend API

Go backend для MVP социальной платформы школьников сети НИШ.

## 🚀 Технологии

- **Go 1.21+** - основной язык
- **Gin** - HTTP веб-фреймворк
- **GORM** - ORM для работы с базой данных
- **JWT** - аутентификация
- **SQLite/PostgreSQL** - база данных
- **bcrypt** - хеширование паролей

## 📦 Установка и запуск

### 1. Клонирование и установка зависимостей

```bash
cd backend
go mod download
```

### 2. Настройка окружения

```bash
cp .env.example .env
# Отредактируйте .env файл под ваши настройки
```

### 3. Запуск сервера

```bash
# Режим разработки
go run main.go

# Или сборка и запуск
go build -o nis-platform
./nis-platform
```

Сервер запустится на `http://localhost:8080`

## 🗄️ База данных

### SQLite (по умолчанию)
Автоматически создается файл `nis_platform.db` в корне проекта.

### PostgreSQL
Настройте в `.env`:
```env
DB_TYPE=postgres
DATABASE_URL=postgres://username:password@localhost:5432/nis_platform
```

### Автомиграция
Все таблицы создаются автоматически при запуске сервера.

## 🔐 API Эндпоинты

### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `POST /api/auth/refresh` - Обновление токена

### Пользователи
- `GET /api/profile` - Профиль пользователя
- `PUT /api/profile` - Обновление профиля
- `GET /api/leaderboard` - Рейтинг пользователей

### Объявления
- `GET /api/announcements` - Список объявлений
- `POST /api/announcements` - Создание объявления
- `GET /api/announcements/:id` - Получение объявления
- `PUT /api/announcements/:id` - Обновление объявления
- `DELETE /api/announcements/:id` - Удаление объявления
- `POST /api/announcements/:id/register` - Регистрация на мероприятие

### Сообщества
- `GET /api/communities` - Список сообществ
- `POST /api/communities` - Создание сообщества
- `GET /api/communities/:id` - Получение сообщества
- `PUT /api/communities/:id` - Обновление сообщества
- `DELETE /api/communities/:id` - Удаление сообщества
- `POST /api/communities/:id/join` - Вступление в сообщество
- `DELETE /api/communities/:id/leave` - Выход из сообщества

### Учебные материалы
- `GET /api/materials` - Список материалов
- `POST /api/materials` - Загрузка материала
- `GET /api/materials/:id` - Получение материала
- `PUT /api/materials/:id` - Обновление материала
- `DELETE /api/materials/:id` - Удаление материала
- `POST /api/materials/:id/vote` - Голосование за материал

### Комментарии
- `GET /api/comments/:type/:id` - Комментарии к объекту
- `POST /api/comments` - Создание комментария
- `DELETE /api/comments/:id` - Удаление комментария

## 🏗️ Структура проекта

```
backend/
├── main.go                 # Точка входа
├── go.mod                  # Зависимости Go
├── config/
│   └── database.go         # Конфигурация БД
├── models/                 # Модели данных
│   ├── user.go
│   ├── announcement.go
│   ├── community.go
│   ├── study_material.go
│   └── comment.go
├── handlers/               # HTTP обработчики
│   ├── auth.go
│   ├── announcement.go
│   ├── community.go
│   ├── material.go
│   └── user.go
├── middleware/             # Middleware
│   └── auth.go
└── uploads/               # Загруженные файлы
```

## 🎯 Основные модели

### User (Пользователь)
- Базовая информация (email, имя, школа, класс)
- Система очков и рейтинга
- Роли (student, moderator, admin)

### Announcement (Объявление)
- Новости и мероприятия
- Категории (school, network, event)
- Регистрация на события

### Community (Сообщество)
- Клубы по интересам
- Система участников и модераторов
- Приватные/публичные сообщества

### StudyMaterial (Учебный материал)
- Конспекты и материалы
- Система голосования
- Фильтрация по предметам и классам

### Comment (Комментарий)
- Комментарии к любым объектам
- Вложенные ответы
- Модерация

## 🔒 Аутентификация

Используется JWT токены:
- **Access Token** - 15 минут
- **Refresh Token** - 7 дней

Заголовок авторизации: `Authorization: Bearer <token>`

## 🎮 Система очков

Пользователи получают очки за активность:
- Регистрация: +10 очков
- Создание объявления: +5 очков
- Создание сообщества: +10 очков
- Загрузка материала: +5 очков
- Вступление в сообщество: +2 очка
- Регистрация на мероприятие: +3 очка
- Комментарий: +1 очко
- Положительная оценка материала: +1 очко (автору)

## 🛡️ Безопасность

- Пароли хешируются с помощью bcrypt
- JWT токены с коротким временем жизни
- CORS настроен для фронтенда
- Валидация всех входных данных
- Проверка прав доступа на всех операциях

## 🚀 Деплой

### Docker (рекомендуется)

```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
COPY --from=builder /app/.env .
CMD ["./main"]
```

### Обычный деплой

```bash
# Сборка
go build -o nis-platform

# Запуск
./nis-platform
```

## 📝 Переменные окружения

```env
DB_TYPE=sqlite                    # sqlite или postgres
SQLITE_PATH=./nis_platform.db     # путь к SQLite файлу
DATABASE_URL=postgres://...       # строка подключения к PostgreSQL
JWT_SECRET=your-secret-key        # секретный ключ для JWT
PORT=8080                         # порт сервера
GIN_MODE=release                  # режим Gin (debug/release)
CORS_ORIGINS=http://localhost:3000 # разрешенные CORS origins
```

## 🤝 Интеграция с фронтендом

API полностью совместим с React фронтендом. Все эндпоинты возвращают JSON и поддерживают CORS для веб-приложения.

Пример запроса с фронтенда:

```javascript
// Логин
const response = await fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
localStorage.setItem('access_token', data.access_token);

// Авторизованный запрос
const announcements = await fetch('http://localhost:8080/api/announcements', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }
});
```