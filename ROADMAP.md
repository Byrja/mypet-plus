# MyPet+ — Roadmap

## Phase 0: Фундамент (DONE → в процессе)
- [x] Первичный аудит кода (~10,750 строк)
- [x] Исправление путей (css/style.css → style.css, js/script.js → script.js)
- [x] GitHub репозиторий: https://github.com/Byrja/mypet-plus
- [x] Деплой фронта на nl-vmnano (/srv/mypet-plus)
- [x] Nginx конфиг + домен mypet.byrja.duckdns.org
- [ ] SSL (Let's Encrypt) ← сейчас
- [ ] CORS заголовки для API

## Phase 1: Бэкенд MVP
- [ ] Python FastAPI + SQLite
- [ ] Регистрация / логин (JWT токены)
- [ ] Синхронизация данных (питомцы, события, настройки)
- [ ] CRUD: питомцы, события календаря, уведомления
- [ ] API документация (Swagger)

## Phase 2: Telegram Web App
- [ ] Telegram Bot + WebApp initData
- [ ] Авторизация через Telegram (без пароля)
- [ ] Адаптация UI под Telegram (safe areas, темы)
- [ ] Отправка уведомлений через бота

## Phase 3: Разделы (убрать заглушки)
- [ ] **Обучение** — реальные видео (YouTube embed или загрузка)
- [ ] **Чат-помощник** — интеграция LLM API (Wormsoft / OpenRouter)
- [ ] **Соцсеть** — лента постов, комментарии, лайки
- [ ] **Маркетплейс** — каталог товаров, корзина (без оплаты)

## Phase 4: Продакшен
- [ ] Резервное копирование БД (авто дампы)
- [ ] Rate limiting, защита от брутфорса
- [ ] Мониторинг (uptime, ошибки)
- [ ] Собственный домен (вместо duckdns)

## Phase 5: Масштабирование (опционально)
- [ ] PostgreSQL вместо SQLite
- [ ] Docker-compose
- [ ] CI/CD (автодеплой из GitHub)

---

## Техстек
- **Frontend:** Vanilla HTML/CSS/JS (PWA)
- **Backend:** Python FastAPI
- **DB:** SQLite → PostgreSQL
- **Server:** nginx + certbot (nl-vmnano, 82.24.195.196)
- **Domain:** mypet.byrja.duckdns.org
