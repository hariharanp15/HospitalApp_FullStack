from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.appointment import Appointment
from app.schemas.appointment import AppointmentCreate
from app.websockets import manager
from app.models.patient import Patient
from app.models.doctor import Doctor
from app.tasks import send_notification

router = APIRouter(prefix="/appointments")

@router.post("/")
async def create_appointment(
    data: AppointmentCreate,
    db: Session = Depends(get_db),
    background_tasks: BackgroundTasks = None
):
    appointment = Appointment(**data.dict())
    db.add(appointment)
    db.commit()

    await manager.broadcast("New Appointment Booked")

    background_tasks.add_task(send_notification, "doctor@email.com")

    return {"message": "Appointment created"}

@router.get("/")
def get_appointments(db: Session = Depends(get_db)):
    appointments = db.query(Appointment).all()

    result = []
    for a in appointments:
        patient = db.query(Patient).filter(Patient.id == a.patient_id).first()
        doctor = db.query(Doctor).filter(Doctor.id == a.doctor_id).first()

        result.append({
            "id": a.id,
            "patient_name": patient.name if patient else None,
            "doctor_name": doctor.name if doctor else None
        })

    return result