from pydantic import BaseModel

class DoctorCreate(BaseModel):
    name: str
    specialization: str
    email: str