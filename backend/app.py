from fastapi import FastAPI, UploadFile, File
import os
from services.pdf_loader import extract_pdf_text

app = FastAPI(
    title="AI Hiring Copilot",
    version="1.0.0"
)

@app.get('/')
def home():
    return{
        'message' : 'welcome to home page. AI Hiring Copilot Backend Running'
    }

@app.get('/health')
def health():
    return{
        'status' : 'healthy'
    }

@app.post('/upload-pdf')
async def upload_pdf(file : UploadFile = File(...)):
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    extracted_text = extract_pdf_text(file_path)
    return{
        "filename": file.filename,
        "characters": len(extracted_text),
        "preview": extracted_text[:1000]

    }