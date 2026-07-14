# MyPet+ Backend API

## Стек
- Python 3.10 + FastAPI + SQLite
- Uvicorn + systemd
- Nginx reverse proxy

## API Endpoints

### Auth
- `POST /api/auth/register` — регистрация
- `POST /api/auth/login` — логин
- `GET /api/auth/me` — текущий пользователь
- `DELETE /api/auth/delete` — удаление аккаунта

### Pets
- `GET /api/pets` — список питомцев
- `POST /api/pets` — добавить питомца
- `PUT /api/pets/{id}` — редактировать
- `DELETE /api/pets/{id}` — удалить

### Events
- `GET /api/events` — события (фильтр по дате)
- `POST /api/events` — создать событие
- `PUT /api/events/{id}` — обновить
- `DELETE /api/events/{id}` — удалить

### Sync
- `POST /api/sync` — полная синхронизация (push + pull)

## Запуск
```bash
cd /srv/mypet-plus-api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```
