from sqlalchemy import Column, Integer, String
from app.database import Base

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    specialization = Column(String)
    email = Column(String)