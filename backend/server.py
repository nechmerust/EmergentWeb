from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from datetime import datetime, timedelta
import os
from typing import List, Optional
import uuid
import httpx
from urllib.parse import urlencode
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Nech Mě Růst API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client.nech_me_rust

# Google Calendar API credentials
GOOGLE_CLIENT_ID = "248101801640-f7tm4f1111e3p9kac4mgehislaj5ramb.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "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"
GOOGLE_REDIRECT_URI = "http://localhost:8001/api/auth/google/callback"

# Pydantic models
class EventRegistration(BaseModel):
    event_id: str
    name: str
    email: EmailStr
    registered_at: datetime = None
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class Event(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    location: Optional[str] = None
    max_attendees: Optional[int] = None
    current_attendees: int = 0
    google_event_id: Optional[str] = None
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class EventRegistrationRequest(BaseModel):
    name: str
    email: EmailStr

# Helper functions
def generate_uuid():
    return str(uuid.uuid4())

async def get_google_calendar_service():
    """Get Google Calendar service - for now returns mock data"""
    # In production, this would handle OAuth2 flow
    return None

# Database operations
async def create_event_registration(event_id: str, name: str, email: str):
    registration = {
        "_id": generate_uuid(),
        "event_id": event_id,
        "name": name,
        "email": email,
        "registered_at": datetime.utcnow()
    }
    await db.registrations.insert_one(registration)
    return registration

async def get_event_registrations(event_id: str):
    registrations = []
    async for registration in db.registrations.find({"event_id": event_id}):
        registrations.append(registration)
    return registrations

async def check_existing_registration(event_id: str, email: str):
    registration = await db.registrations.find_one({
        "event_id": event_id,
        "email": email
    })
    return registration is not None

# API Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@app.get("/api/events", response_model=List[Event])
async def get_events():
    """Get all upcoming events"""
    try:
        # Mock events for now - in production, this would fetch from Google Calendar
        current_time = datetime.utcnow()
        mock_events = [
            {
                "id": "event-1",
                "title": "Setkání s přáteli statku",
                "description": "Přijďte se podívat na naše zvířata a poznat naši práci blíže. Připravili jsme prohlídku statku a povídání o našich obyvatelích.",
                "start_time": current_time + timedelta(days=7),
                "end_time": current_time + timedelta(days=7, hours=3),
                "location": "Vlkaneč, Česká Republika",
                "max_attendees": 20,
                "current_attendees": 5,
                "google_event_id": "google-event-1"
            },
            {
                "id": "event-2", 
                "title": "Workshop: Péče o zvířata",
                "description": "Praktický workshop o základech péče o domácí zvířata. Ukážeme si, jak správně krmit, ošetřovat a poskytovat první pomoc.",
                "start_time": current_time + timedelta(days=14),
                "end_time": current_time + timedelta(days=14, hours=4),
                "location": "Vlkaneč, Česká Republika",
                "max_attendees": 15,
                "current_attendees": 8,
                "google_event_id": "google-event-2"
            },
            {
                "id": "event-3",
                "title": "Dobrovolnický den",
                "description": "Pomozите нám s péčí o zvířata a údržbou statku. Připravili jsme různé aktivity pro všechny věkové kategorie.",
                "start_time": current_time + timedelta(days=21),
                "end_time": current_time + timedelta(days=21, hours=6),
                "location": "Vlkaneč, Česká Republika", 
                "max_attendees": 25,
                "current_attendees": 12,
                "google_event_id": "google-event-3"
            }
        ]
        
        # Get current registration counts from database
        for event in mock_events:
            registrations = await get_event_registrations(event["id"])
            event["current_attendees"] = len(registrations)
            
        return mock_events
        
    except Exception as e:
        logger.error(f"Error fetching events: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch events")

@app.get("/api/events/{event_id}", response_model=Event)
async def get_event(event_id: str):
    """Get specific event details"""
    try:
        # Mock event data - in production, fetch from Google Calendar
        mock_events = {
            "event-1": {
                "id": "event-1",
                "title": "Setkání s přáteli statku",
                "description": "Přijďte se podívat na naše zvířata a poznat naši práci blíže. Připravili jsme prohlídku statku a povídání o našich obyvatelích.",
                "start_time": datetime.utcnow() + timedelta(days=7),
                "end_time": datetime.utcnow() + timedelta(days=7, hours=3),
                "location": "Vlkaneč, Česká Republika",
                "max_attendees": 20,
                "current_attendees": 5,
                "google_event_id": "google-event-1"
            }
        }
        
        if event_id not in mock_events:
            raise HTTPException(status_code=404, detail="Event not found")
            
        event = mock_events[event_id]
        registrations = await get_event_registrations(event_id)
        event["current_attendees"] = len(registrations)
        
        return event
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch event")

@app.post("/api/events/{event_id}/register")
async def register_for_event(event_id: str, registration: EventRegistrationRequest):
    """Register for an event"""
    try:
        # Check if event exists
        event = await get_event(event_id)
        
        # Check if already registered
        if await check_existing_registration(event_id, registration.email):
            raise HTTPException(status_code=400, detail="Email already registered for this event")
        
        # Check if event is full
        registrations = await get_event_registrations(event_id)
        if event.max_attendees and len(registrations) >= event.max_attendees:
            raise HTTPException(status_code=400, detail="Event is full")
        
        # Create registration
        new_registration = await create_event_registration(
            event_id=event_id,
            name=registration.name,
            email=registration.email
        )
        
        return {
            "message": "Registration successful",
            "registration_id": new_registration["_id"],
            "event_title": event.title
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error registering for event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to register for event")

@app.get("/api/events/{event_id}/registrations")
async def get_event_registrations_count(event_id: str):
    """Get event registration count"""
    try:
        registrations = await get_event_registrations(event_id)
        return {
            "event_id": event_id,
            "registration_count": len(registrations)
        }
    except Exception as e:
        logger.error(f"Error getting registration count for event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get registration count")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)