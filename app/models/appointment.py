from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True)
    patient_id = Column(Integer)
    doctor_id = Column(Integer)
    problem = Column(String)