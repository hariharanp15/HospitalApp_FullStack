from pydantic import BaseModel

class AppointmentCreate(BaseModel):
    doctor_id: int
    patient_id: int

class AppointmentResponse(BaseModel):
    id: int
    doctor_id: int
    patient_id: int

    class Config:
        from_attributes = True