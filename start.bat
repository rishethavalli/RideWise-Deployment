@echo off
REM RideWise Quick Start Script for Windows
REM This script starts both backend and frontend servers

echo.
echo ====================================
echo   RideWise - Quick Start
echo ====================================
echo.

REM Check if running as admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Note: Not running as admin. You may need to allow port access.
    echo.
)

REM Start Backend
echo Starting Backend (FastAPI on port 8000)...
start cmd /k "cd ridewise-backend && python main.py"
timeout /t 3 /nobreak

REM Start Frontend
echo Starting Frontend (Next.js on port 3000)...
start cmd /k "cd ridewise-frontend && pnpm dev"
timeout /t 2 /nobreak

echo.
echo ====================================
echo   Servers Starting...
echo ====================================
echo.
echo Backend:  http://127.0.0.1:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause
