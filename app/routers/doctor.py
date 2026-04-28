from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.doctor import Doctor

router = APIRouter(prefix="/doctors")

@router.post("/")
def create_doctor(data: dict, db: Session = Depends(get_db)):
    doctor = Doctor(
    name=data["name"],
    email=data["email"],
    specialization=data["specialization"]
)
    db.add(doctor)
    db.commit()
    return {"msg": "Doctor added"}

@router.get("/")
def get_doctors(db: Session = Depends(get_db)):
    return db.query(Doctor).all()

@router.delete("/doctors/{id}")
def delete_doctor(id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.id == id).first()

    if doctor:
        db.delete(doctor)
        db.commit()

    return {"message": "Doctor deleted"}