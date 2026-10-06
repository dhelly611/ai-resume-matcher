# 🎯 AI-Powered Resume & ATS Job Matcher

> An intelligent, full-stack application that analyzes resumes against target job descriptions, computes Applicant Tracking System (ATS) compatibility scores, identifies skill gaps, and suggests high-impact bullet point optimizations.

---

## 🌟 Key Features

- 📄 **Resume Parsing**: Ingests resumes in PDF and plain text formats, isolating contact information, technical skills, and experience sections.
- 🎯 **ATS Compatibility Scoring**: Multi-factor scoring engine evaluating keyword match, action verb strength, and quantifiable achievements.
- 🔍 **Skills Gap Analysis**: Side-by-side comparison separating **Matched Skills** from **Missing Keywords**.
- ✍️ **Bullet Point Optimizer**: Highlights passive statements and provides rewritten, high-impact bullet points adhering to the Google STAR method (*Situation, Task, Action, Result*).
- 🚀 **Interactive Dashboard**: Clean, responsive frontend built with React, TypeScript, and Tailwind CSS.

---

## 🛠️ Tech Stack

- **Backend**: Python 3, FastAPI, Uvicorn, PyPDF2
- **Frontend**: React, TypeScript, Tailwind CSS, Lucide Icons
- **Data & Text Processing**: Regular Expressions, RapidFuzz / TF-IDF
- **Version Control**: Git & GitHub

---

## 📂 Project Architecture

```
ai-resume-matcher/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI application entrypoint
│   │   ├── parser.py        # PDF text & structure extraction
│   │   └── analyzer.py      # ATS scoring & skill gap analysis
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/                 # React & TypeScript source code
│   └── package.json         # Frontend dependencies
├── .gitignore               # Ignored build & cache files
└── README.md                # Project documentation
```

---

## 🚀 Quickstart Guide

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/ai-resume-matcher.git
cd ai-resume-matcher
```

### 2. Run the Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation will be live at `http://localhost:8000/docs`.

### 3. Run the Frontend (React + Vite)
```bash
cd ../frontend
npm install
npm run dev
```

---

## 💼 Resume Description (For Your CV)

**AI-Powered Resume & ATS Job Matcher** | *React, TypeScript, FastAPI, Python, Tailwind CSS*
- Developed an end-to-end ATS evaluation web app analyzing resumes against job requirements to calculate keyword match density and format health.
- Built an asynchronous Python/FastAPI backend parsing multi-page PDF documents and computing multi-factor ATS match scores.
- Implemented skill gap extraction and automated bullet point rewriting to strengthen candidate resumes.
- Designed an interactive React/TypeScript user interface featuring real-time score visualization and side-by-side skill comparisons.
