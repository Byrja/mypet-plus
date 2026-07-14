from fastapi import FastAPI, Depends, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, Field
from datetime import datetime, timedelta
from typing import Optional, List
import sqlite3
import uuid
import os

# ===== CONFIG =====
SECRET_KEY = os.getenv("SECRET_KEY", "mypet-plus-secret-key-change-in-prod")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 30
DATABASE = "/srv/mypet-plus-api/mypet.db"

app = FastAPI(title="MyPet+ API", version="1.0.0")

# CORS для фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mypet.byrja.duckdns.org", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# ===== DATABASE =====
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE,
            phone TEXT UNIQUE,
            password_hash TEXT NOT NULL,
            first_name TEXT,
            last_name TEXT,
            middle_name TEXT,
            full_name TEXT,
            birthdate TEXT,
            gender TEXT,
            city TEXT,
            photo TEXT,
            email_verified INTEGER DEFAULT 0,
            phone_verified INTEGER DEFAULT 0,
            registered_at TEXT,
            last_login TEXT,
            preferences TEXT DEFAULT '{}'
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pets (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            type TEXT NOT NULL,
            name TEXT NOT NULL,
            gender TEXT,
            weight REAL,
            birthdate TEXT,
            breed TEXT,
            photo TEXT,
            created_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            pet_id TEXT,
            type TEXT NOT NULL,
            title TEXT NOT NULL,
            event_date TEXT NOT NULL,
            event_time TEXT,
            repeat_type TEXT DEFAULT 'none',
            repeat_end TEXT,
            reminders TEXT,
            notes TEXT,
            completed INTEGER DEFAULT 0,
            food_amount REAL,
            created_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS notifications (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            title TEXT NOT NULL,
            message TEXT,
            type TEXT DEFAULT 'system',
            read INTEGER DEFAULT 0,
            created_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    ''')
    
    conn.commit()
    conn.close()
    print("Database initialized.")

# ===== MODELS =====
class UserRegister(BaseModel):
    email_phone: str
    password: str = Field(..., min_length=8)
    first_name: str
    last_name: str
    middle_name: Optional[str] = None
    birthdate: Optional[str] = None
    gender: Optional[str] = "male"
    city: Optional[str] = None

class UserLogin(BaseModel):
    email_phone: str
    password: str

class UserOut(BaseModel):
    id: str
    email: Optional[str]
    phone: Optional[str]
    first_name: str
    last_name: str
    full_name: str
    photo: Optional[str] = None
    city: Optional[str] = None
    registered_at: Optional[str] = None

class PetCreate(BaseModel):
    type: str
    name: str
    gender: Optional[str] = None
    weight: Optional[float] = None
    birthdate: Optional[str] = None
    breed: Optional[str] = None
    photo: Optional[str] = None

class PetOut(PetCreate):
    id: str
    user_id: str
    created_at: Optional[str] = None

class EventCreate(BaseModel):
    pet_id: Optional[str] = None
    type: str
    title: str
    event_date: str
    event_time: Optional[str] = None
    repeat_type: Optional[str] = "none"
    repeat_end: Optional[str] = None
    reminders: Optional[str] = None
    notes: Optional[str] = None
    food_amount: Optional[float] = None

class EventOut(EventCreate):
    id: str
    user_id: str
    completed: int = 0
    created_at: Optional[str] = None

class SyncData(BaseModel):
    pets: List[dict] = []
    events: List[dict] = []
    notifications: List[dict] = []

# ===== AUTH HELPERS =====
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    if user is None:
        raise credentials_exception
    return dict(user)

# ===== INIT =====
@app.on_event("startup")
def on_startup():
    init_db()

# ===== AUTH ENDPOINTS =====
@app.post("/api/auth/register")
def register(data: UserRegister):
    conn = get_db()
    cursor = conn.cursor()
    
    # Determine email vs phone
    is_email = '@' in data.email_phone
    email = data.email_phone if is_email else None
    phone = data.email_phone if not is_email else None
    
    # Check existing
    existing = cursor.execute(
        "SELECT id FROM users WHERE email = ? OR phone = ?",
        (email, phone)
    ).fetchone()
    if existing:
        conn.close()
        raise HTTPException(400, "User already exists")
    
    user_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat()
    full_name = f"{data.last_name} {data.first_name} {data.middle_name or ''}".strip()
    
    cursor.execute('''
        INSERT INTO users (id, email, phone, password_hash, first_name, last_name, middle_name, full_name, birthdate, gender, city, registered_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (user_id, email, phone, get_password_hash(data.password), data.first_name, data.last_name, data.middle_name, full_name, data.birthdate, data.gender, data.city, now))
    
    conn.commit()
    conn.close()
    
    token = create_access_token({"sub": user_id})
    return {"success": True, "token": token, "user_id": user_id}

@app.post("/api/auth/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    conn = get_db()
    cursor = conn.cursor()
    
    # Try find by email or phone
    user = cursor.execute(
        "SELECT * FROM users WHERE email = ? OR phone = ?",
        (form_data.username, form_data.username)
    ).fetchone()
    
    if not user or not verify_password(form_data.password, user["password_hash"]):
        conn.close()
        raise HTTPException(401, "Invalid credentials")
    
    # Update last login
    now = datetime.utcnow().isoformat()
    cursor.execute("UPDATE users SET last_login = ? WHERE id = ?", (now, user["id"]))
    conn.commit()
    conn.close()
    
    token = create_access_token({"sub": user["id"]})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/api/auth/me", response_model=UserOut)
def get_me(current: dict = Depends(get_current_user)):
    return current

@app.delete("/api/auth/delete")
def delete_account(current: dict = Depends(get_current_user)):
    conn = get_db()
    conn.execute("DELETE FROM users WHERE id = ?", (current["id"],))
    conn.commit()
    conn.close()
    return {"success": True, "message": "Account deleted"}

# ===== PETS ENDPOINTS =====
@app.get("/api/pets", response_model=List[PetOut])
def get_pets(current: dict = Depends(get_current_user)):
    conn = get_db()
    pets = conn.execute(
        "SELECT * FROM pets WHERE user_id = ? ORDER BY created_at DESC",
        (current["id"],)
    ).fetchall()
    conn.close()
    return [dict(p) for p in pets]

@app.post("/api/pets", response_model=PetOut)
def create_pet(pet: PetCreate, current: dict = Depends(get_current_user)):
    conn = get_db()
    pet_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat()
    
    conn.execute('''
        INSERT INTO pets (id, user_id, type, name, gender, weight, birthdate, breed, photo, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (pet_id, current["id"], pet.type, pet.name, pet.gender, pet.weight, pet.birthdate, pet.breed, pet.photo, now))
    
    conn.commit()
    new_pet = conn.execute("SELECT * FROM pets WHERE id = ?", (pet_id,)).fetchone()
    conn.close()
    return dict(new_pet)

@app.delete("/api/pets/{pet_id}")
def delete_pet(pet_id: str, current: dict = Depends(get_current_user)):
    conn = get_db()
    conn.execute("DELETE FROM pets WHERE id = ? AND user_id = ?", (pet_id, current["id"]))
    conn.commit()
    conn.close()
    return {"success": True}

# ===== EVENTS ENDPOINTS =====
@app.get("/api/events")
def get_events(
    year: Optional[int] = None,
    month: Optional[int] = None,
    current: dict = Depends(get_current_user)
):
    conn = get_db()
    query = "SELECT * FROM events WHERE user_id = ?"
    params = [current["id"]]
    
    if year and month:
        month_str = f"{year:04d}-{month:02d}"
        query += " AND event_date LIKE ?"
        params.append(f"{month_str}%")
    
    query += " ORDER BY event_date, event_time"
    events = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(e) for e in events]

@app.post("/api/events", response_model=EventOut)
def create_event(event: EventCreate, current: dict = Depends(get_current_user)):
    conn = get_db()
    event_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat()
    
    conn.execute('''
        INSERT INTO events (id, user_id, pet_id, type, title, event_date, event_time, repeat_type, repeat_end, reminders, notes, food_amount, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (event_id, current["id"], event.pet_id, event.type, event.title, event.event_date, event.event_time, event.repeat_type, event.repeat_end, event.reminders, event.notes, event.food_amount, now))
    
    conn.commit()
    new_event = conn.execute("SELECT * FROM events WHERE id = ?", (event_id,)).fetchone()
    conn.close()
    return dict(new_event)

@app.delete("/api/events/{event_id}")
def delete_event(event_id: str, current: dict = Depends(get_current_user)):
    conn = get_db()
    conn.execute("DELETE FROM events WHERE id = ? AND user_id = ?", (event_id, current["id"]))
    conn.commit()
    conn.close()
    return {"success": True}

# ===== SYNC ENDPOINT =====
@app.post("/api/sync")
def sync_data(data: SyncData, current: dict = Depends(get_current_user)):
    """Full sync: push client data, return server state"""
    conn = get_db()
    cursor = conn.cursor()
    
    # Simple approach: replace all user data
    cursor.execute("DELETE FROM pets WHERE user_id = ?", (current["id"],))
    cursor.execute("DELETE FROM events WHERE user_id = ?", (current["id"],))
    
    for pet in data.pets:
        cursor.execute('''
            INSERT OR REPLACE INTO pets (id, user_id, type, name, gender, weight, birthdate, breed, photo, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (pet.get("id", str(uuid.uuid4())), current["id"], pet.get("type"), pet.get("name"),
              pet.get("gender"), pet.get("weight"), pet.get("birthdate"), pet.get("breed"),
              pet.get("photo"), pet.get("created_at", datetime.utcnow().isoformat())))
    
    for event in data.events:
        cursor.execute('''
            INSERT OR REPLACE INTO events (id, user_id, pet_id, type, title, event_date, event_time, repeat_type, repeat_end, reminders, notes, food_amount, completed, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (event.get("id", str(uuid.uuid4())), current["id"], event.get("pet_id"), event.get("type"),
              event.get("title"), event.get("date"), event.get("time"), event.get("repeat", "none"),
              event.get("repeatEnd"), str(event.get("reminders", [])), event.get("notes"),
              event.get("foodAmount"), event.get("completed", 0), event.get("createdAt", datetime.utcnow().isoformat())))
    
    conn.commit()
    
    # Return current server state
    pets = cursor.execute("SELECT * FROM pets WHERE user_id = ?", (current["id"],)).fetchall()
    events = cursor.execute("SELECT * FROM events WHERE user_id = ? ORDER BY event_date, event_time", (current["id"],)).fetchall()
    notifications = cursor.execute("SELECT * FROM notifications WHERE user_id = ? AND read = 0 ORDER BY created_at DESC", (current["id"],)).fetchall()
    
    conn.close()
    return {
        "pets": [dict(p) for p in pets],
        "events": [dict(e) for e in events],
        "notifications": [dict(n) for n in notifications],
        "synced_at": datetime.utcnow().isoformat()
    }

# ===== HEALTH CHECK =====
@app.get("/api/health")
def health_check():
    return {"status": "ok", "version": "1.0.0"}

# Root redirect
@app.get("/")
def root():
    return {"message": "MyPet+ API", "docs": "/docs"}
