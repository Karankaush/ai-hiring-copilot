from fastapi import FastAPI, UploadFile, File, Form
import os
from services.pdf_loader import extract_pdf_text
from graph.nodes.resume_parser import parse_resume
from pydantic import BaseModel
from typing import List
from graph.workflow import workflow

from graph.nodes.jd_analyzer import analyze_jd

class JDRequest(BaseModel):
    jd: str

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








@app.post("/analyze-jd")
def analyze_jd_endpoint(request: JDRequest):

    result = analyze_jd(request.jd)

    return result.model_dump()










@app.post("/analyze")
async def analyze_candidates(
    jd: str = Form(...),
    files: List[UploadFile] = File(...)
):

    os.makedirs("uploads", exist_ok=True)

    resume_texts = []

    for file in files:

        file_path = f"uploads/{file.filename}"

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        resume_text = extract_pdf_text(file_path)

        resume_texts.append(resume_text)

        os.remove(file_path)

    result = workflow.invoke(
        {
            "jd_text": jd,
            "resume_texts": resume_texts
        }
    )

    return {
    "jd_data": result["jd_data"],
    "resumes": result["resumes"],
    "matches": result["matches"],
    "evaluations": result["evaluations"]
    }