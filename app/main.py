from fastapi import FastAPI
from app.routers import doctor, patient, appointment, auth, upload, websocket
from app.database import Base, engine
from app.logger import setup_logger
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hospital App")

setup_logger()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router)
app.include_router(doctor.router)
app.include_router(patient.router)
app.include_router(appointment.router)
app.include_router(upload.router)
app.include_router(websocket.router)