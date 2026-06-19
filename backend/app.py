from fastapi import FastAPI, UploadFile, File
import os
from services.pdf_loader import extract_pdf_text
from graph.nodes.resume_parser import parse_resume

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




@app.post("/resume-parser")
async def parse_resume_endpoint(file : UploadFile = File(...)) : 

    os.makedirs("uploads", exist_ok=True)
    file_path = f"uploads/{file.filename}"

    contents = await file.read()

    with open(file_path, "wb") as buffer :
        buffer.write(contents)

    resume_text = extract_pdf_text(file_path)



    parsed_resume = parse_resume(resume_text)

    return parsed_resume
