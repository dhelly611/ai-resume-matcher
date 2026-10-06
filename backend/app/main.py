from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.parser import extract_text_from_pdf_bytes, extract_contact_info
from app.analyzer import calculate_ats_report

app = FastAPI(
    title="AI Resume & ATS Job Matcher API",
    description="Backend API for scanning resumes, computing ATS compatibility, and highlighting skill gaps.",
    version="1.0.0"
)

# Enable CORS so frontend (React/Vite) can communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TextScanRequest(BaseModel):
    resume_text: str
    job_description: str


SAMPLE_RESUME = """
Rahul Verma
Email: rahul.verma@example.com | Phone: +91 9876543210
LinkedIn: linkedin.com/in/rahulverma | GitHub: github.com/rahulverma

EDUCATION
B.Tech Computer Science and Engineering (Semester 5)

TECHNICAL SKILLS
- Languages: Python, JavaScript, SQL
- Frameworks & Tools: FastAPI, React, Git, Linux
- Databases: PostgreSQL, SQLite

PROJECTS
Smart ATS Resume Matcher
- Engineered RESTful backend microservices using FastAPI and Python.
- Designed interactive React dashboard with Tailwind CSS, improving load speed by 30%.
- Integrated PDF document parser processing multi-page candidate resumes.
"""

SAMPLE_JOB_DESCRIPTION = """
Job Title: Associate Full-Stack Developer
Location: Remote / Hybrid

We are seeking a driven Junior/Associate Developer to join our engineering team.

Key Requirements:
- Proficiency in Python, JavaScript, and SQL.
- Hands-on experience with modern frameworks like FastAPI, Django, or React.
- Working knowledge of Docker, AWS, and Git version control.
- Understanding of database design with PostgreSQL or MySQL.
- Strong problem-solving abilities and clear communication.
"""


@app.get("/")
def health_check():
    """Basic health check and system status."""
    return {
        "status": "online",
        "service": "AI Resume & ATS Matcher API",
        "docs_url": "/docs"
    }


@app.get("/api/sample")
def get_sample_data():
    """Provides sample resume and job description for 1-click testing."""
    return {
        "sample_resume": SAMPLE_RESUME.strip(),
        "sample_job_description": SAMPLE_JOB_DESCRIPTION.strip()
    }


@app.post("/api/scan-text")
def scan_text(payload: TextScanRequest):
    """Analyzes raw text resume against a job description."""
    if not payload.resume_text.strip() or not payload.job_description.strip():
        raise HTTPException(status_code=400, detail="Resume text and Job description are required.")

    contacts = extract_contact_info(payload.resume_text)
    report = calculate_ats_report(payload.resume_text, payload.job_description)

    return {
        "candidate_info": contacts,
        "ats_report": report
    }


@app.post("/api/scan-pdf")
async def scan_pdf(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    """Parses an uploaded PDF resume and analyzes it against the job description."""
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a PDF document.")

    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Uploaded PDF file is empty.")

    try:
        resume_text = extract_text_from_pdf_bytes(content)
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Failed to parse PDF document: {str(e)}")

    contacts = extract_contact_info(resume_text)
    report = calculate_ats_report(resume_text, job_description)

    return {
        "filename": file.filename,
        "extracted_text_preview": resume_text[:300] + ("..." if len(resume_text) > 300 else ""),
        "candidate_info": contacts,
        "ats_report": report
    }
