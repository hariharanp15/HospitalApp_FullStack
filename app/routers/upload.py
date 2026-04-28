from fastapi import APIRouter, UploadFile, File
from app.upload import save_file

router = APIRouter()

@router.post("/")
def upload(file: UploadFile = File(...)):
    return {"path": save_file(file)}