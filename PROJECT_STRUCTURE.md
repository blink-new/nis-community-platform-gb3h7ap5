# 📁 Структура проекта НИШ Платформа

Полная структура MVP социальной платформы для школьников сети НИШ.

## 🏗️ Общая архитектура

```
nis-community-platform/
├── 🎨 Frontend (React + TypeScript + Tailwind)
├── 🔧 Backend (Go + Gin + GORM)
├── 🗄️ Database (SQLite/PostgreSQL)
└── 🐳 Docker (Контейнеризация)
```

## 📂 Детальная структура

```
nis-community-platform-gb3h7ap5/
│
├── 📱 FRONTEND (React App)
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── vite.svg
│   │   └── _redirects
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx          # Верхняя навигация
│   │   │   │   └── Sidebar.tsx         # Боковое меню
│   │   │   └── ui/                     # ShadCN компоненты
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── input.tsx
│   │   │       ├── badge.tsx
│   │   │       ├── avatar.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── dropdown-menu.tsx
│   │   │       ├── tabs.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── select.tsx
│   │   │       ├── progress.tsx
│   │   │       ├── separator.tsx
│   │   │       ├── skeleton.tsx
│   │   │       ├── toast.tsx
│   │   │       └── ... (другие UI компоненты)
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.tsx              # Страница входа
│   │   │   ├── Dashboard.tsx          # Главная панель
│   │   │   ├── Announcements.tsx      # Доска объявлений
│   │   │   ├── Communities.tsx        # Сообщества/клубы
│   │   │   ├── StudyMaterials.tsx     # Учебные материалы
│   │   │   ├── Leaderboard.tsx        # Рейтинг пользователей
│   │   │   └── Profile.tsx            # Профиль пользователя
│   │   │
│   │   ├── hooks/
│   │   │   ├── use-mobile.tsx         # Хук для мобильных устройств
│   │   │   └── use-toast.ts           # Хук для уведомлений
│   │   │
│   │   ├── lib/
│   │   │   └── utils.ts               # Утилиты
│   │   │
│   │   ├── App.tsx                    # Главный компонент
│   │   ├── main.tsx                   # Точка входа
│   │   ├── index.css                  # Глобальные стили
│   │   └── vite-env.d.ts             # TypeScript типы
│   │
│   ├── package.json                   # Зависимости фронтенда
│   ├── tailwind.config.cjs           # Конфигурация Tailwind
│   ├── vite.config.ts                # Конфигурация Vite
│   ├── tsconfig.json                 # Конфигурация TypeScript
│   └── components.json               # Конфигурация ShadCN
│
├── 🔧 BACKEND (Go API Server)
│   ├── models/                       # Модели данных
│   │   ├── user.go                   # Пользователи + очки
│   │   ├── announcement.go           # Объявления + регистрации
│   │   ├── community.go              # Сообщества + участники
│   │   ├── study_material.go         # Материалы + голосования
│   │   └── comment.go                # Комментарии
│   │
│   ├── handlers/                     # HTTP обработчики
│   │   ├── auth.go                   # Аутентификация (регистрация/вход)
│   │   ├── announcement.go           # CRUD объявлений
│   │   ├── community.go              # CRUD сообществ
│   │   ├── material.go               # CRUD материалов + голосование
│   │   └── user.go                   # Профиль + рейтинг
│   │
│   ├── middleware/
│   │   └── auth.go                   # JWT аутентификация
│   │
│   ├── config/
│   │   └── database.go               # Подключение к БД
│   │
│   ├── main.go                       # Точка входа сервера
│   ├── go.mod                        # Зависимости Go
│   ├── go.sum                        # Хеши зависимостей
│   ├── .env.example                  # Пример конфигурации
│   ├── Dockerfile                    # Docker образ для бэкенда
│   └── README.md                     # Документация API
│
├── 🐳 DOCKER & DEPLOYMENT
│   ├── docker-compose.yml            # Оркестрация контейнеров
│   ├── Dockerfile.frontend           # Docker образ для фронтенда
│   └── nginx.conf                    # Конфигурация Nginx
│
├── 📚 DOCUMENTATION
│   ├── README.md                     # Основная документация
│   ├── PROJECT_STRUCTURE.md          # Этот файл
│   └── API_DOCS.md                   # Документация API
│
└── 🔧 CONFIG FILES
    ├── .gitignore                    # Игнорируемые файлы
    ├── eslint.config.js              # Конфигурация ESLint
    ├── postcss.config.cjs            # Конфигурация PostCSS
    └── stylelint.config.cjs          # Конфигурация Stylelint
```

## 🎯 Ключевые компоненты

### 🎨 Frontend (React)

**Технологии:**
- React 18 + TypeScript
- Vite (сборщик)
- Tailwind CSS (стили)
- ShadCN/UI (компоненты)
- React Router (роутинг)

**Основные страницы:**
1. **Login** - Аутентификация пользователей
2. **Dashboard** - Обзор активности и статистики
3. **Announcements** - Доска объявлений с фильтрацией
4. **Communities** - Клубы и сообщества по интересам
5. **StudyMaterials** - Учебные материалы с голосованием
6. **Leaderboard** - Рейтинг активности пользователей
7. **Profile** - Личный профиль и настройки

### 🔧 Backend (Go)

**Технологии:**
- Go 1.21+
- Gin (HTTP фреймворк)
- GORM (ORM)
- JWT (аутентификация)
- SQLite/PostgreSQL (база данных)
- bcrypt (хеширование паролей)

**Основные модели:**
1. **User** - Пользователи с системой очков
2. **Announcement** - Объявления и мероприятия
3. **Community** - Сообщества с участниками
4. **StudyMaterial** - Учебные материалы с голосованием
5. **Comment** - Комментарии к любым объектам
6. **UserPoint** - История начисления очков

### 🗄️ База данных

**Основные таблицы:**
- `users` - Пользователи
- `announcements` - Объявления
- `communities` - Сообщества
- `study_materials` - Учебные материалы
- `comments` - Комментарии
- `user_points` - Очки пользователей
- `event_registrations` - Регистрации на мероприятия
- `community_members` - Участники сообществ
- `material_votes` - Голоса за материалы

## 🚀 Запуск проекта

### Локальная разработка

```bash
# Фронтенд
npm install
npm run dev

# Бэкенд
cd backend
go mod download
go run main.go
```

### Docker

```bash
# Полный стек
docker-compose up -d

# Только бэкенд
docker-compose up backend postgres

# Только фронтенд
docker-compose up frontend
```

## 🔐 Система безопасности

- JWT токены для аутентификации
- bcrypt для хеширования паролей
- CORS настроен для фронтенда
- Валидация всех входных данных
- Проверка прав доступа
- Защита от SQL инъекций (GORM)

## 🎮 Геймификация

**Система очков:**
- Регистрация: +10 очков
- Создание объявления: +5 очков
- Создание сообщества: +10 очков
- Загрузка материала: +5 очков
- Вступление в сообщество: +2 очка
- Регистрация на мероприятие: +3 очка
- Комментарий: +1 очко
- Положительная оценка: +1 очко (автору)

## 📱 Адаптивность

- Полностью адаптивный дизайн
- Мобильная навигация
- Оптимизация для планшетов
- Touch-friendly интерфейс

## 🔄 API Интеграция

**Эндпоинты:**
- `/api/auth/*` - Аутентификация
- `/api/announcements/*` - Объявления
- `/api/communities/*` - Сообщества
- `/api/materials/*` - Учебные материалы
- `/api/comments/*` - Комментарии
- `/api/profile` - Профиль пользователя
- `/api/leaderboard` - Рейтинг

## 🎨 Дизайн-система

**Цветовая палитра:**
- Основной: #6366F1 (индиго)
- Акцент: #F59E0B (янтарный)
- Фон: #FAFBFC (светло-серый)
- Темная тема: #1E293B

**Типографика:**
- Основной шрифт: Inter
- Заголовки: Inter Medium
- Скругления: 8px
- Тени: мягкие, многослойные

## 🚀 Будущие возможности

- Мобильное приложение (React Native)
- Push уведомления
- Видеоконференции
- Интеграция с LMS
- Аналитика для администрации
- Система бейджей и достижений
- Шаныраки (команды/дома)
- Портфолио активности

## 📞 Поддержка

Для вопросов по проекту обращайтесь к команде разработки или создавайте issues в репозитории.