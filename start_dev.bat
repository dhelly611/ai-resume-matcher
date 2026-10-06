@echo off
echo ========================================================
echo Starting AI Resume & ATS Job Matcher Services
echo ========================================================

echo [1/2] Starting FastAPI Backend on http://localhost:8000 ...
start "ATS Backend (FastAPI)" cmd /k "cd /d %~dp0backend && python -m uvicorn app.main:app --reload --port 8000"

echo [2/2] Starting React + Vite Frontend on http://localhost:5173 ...
start "ATS Frontend (React)" cmd /k "cd /d %~dp0frontend && npm.cmd run dev"

echo.
echo Both servers are launching!
echo - Backend API Docs: http://localhost:8000/docs
echo - Frontend Web UI:  http://localhost:5173
echo ========================================================
pause
