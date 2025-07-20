# Многоэтапная сборка для оптимизации размера образа
FROM golang:1.21-alpine AS builder

# Установка необходимых пакетов
RUN apk add --no-cache git ca-certificates tzdata

# Создание пользователя для безопасности
RUN adduser -D -g '' appuser

# Рабочая директория
WORKDIR /build

# Копирование go.mod и go.sum для кеширования зависимостей
COPY go.mod go.sum ./

# Загрузка зависимостей
RUN go mod download

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN CGO_ENABLED=1 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static"' -o main .

# Финальный образ
FROM alpine:latest

# Установка ca-certificates для HTTPS запросов
RUN apk --no-cache add ca-certificates

# Создание директорий
RUN mkdir -p /app/uploads

# Копирование пользователя из builder
COPY --from=builder /etc/passwd /etc/passwd

# Копирование исполняемого файла
COPY --from=builder /build/main /app/

# Копирование примера конфигурации
COPY --from=builder /build/.env.example /app/.env

# Установка прав
RUN chown -R appuser:appuser /app

# Переключение на непривилегированного пользователя
USER appuser

# Рабочая директория
WORKDIR /app

# Открытие порта
EXPOSE 8080

# Проверка здоровья
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

# Запуск приложения
CMD ["./main"]