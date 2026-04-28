from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.patient import Patient

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.post("/")
def create_patient(data: dict, db: Session = Depends(get_db)):

    patient = Patient(
        name=data["name"],
        email=data["email"]
    )

    db.add(patient)
    db.commit()
    db.refresh(patient)

    return patient


@router.get("/")
def get_patients(db: Session = Depends(get_db)):
    return db.query(Patient).all()


@router.delete("/{id}")
def delete_patient(id: int, db: Session = Depends(get_db)):

    patient = db.query(Patient).filter(Patient.id == id).first()

    if patient:
        db.delete(patient)
        db.commit()

    return {"message": "Deleted"}