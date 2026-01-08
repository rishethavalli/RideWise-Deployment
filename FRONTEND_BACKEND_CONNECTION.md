# Frontend-Backend Connection Status

## Overview
The RideWise application has been fully configured to connect the Next.js frontend with the FastAPI backend.

## Configuration Summary

### Backend (FastAPI - Python)
- **Location**: `ridewise-backend/`
- **Main File**: `main.py`
- **Default Port**: 8000 (development) / 7860 (Hugging Face Spaces)
- **Framework**: FastAPI with Uvicorn
- **CORS Configuration**: Enabled for all origins (`allow_origins=["*"]`)

**API Endpoints**:
- `GET /` - Health check endpoint
- `POST /predict/day` - Predict daily bike demand
- `POST /predict/hour` - Predict hourly bike demand

### Frontend (Next.js - TypeScript)
- **Location**: `ridewise-frontend/`
- **Main File**: `app/page.tsx` (redirects to login)
- **Default Port**: 3000
- **Framework**: Next.js 14+ with TypeScript

**API Configuration**:
- **API Client**: `lib/api.ts`
- **API URL**: Set via `NEXT_PUBLIC_API_URL` environment variable
- **Fallback**: `http://localhost:8000` (local development)
- **Production Support**: Uses environment variable for deployment

## How They Connect

### Frontend → Backend Communication
1. Frontend makes HTTP requests to backend API endpoints
2. Request format: POST to `http://localhost:8000/predict/{day|hour}`
3. Payload includes prediction parameters (season, temperature, humidity, etc.)
4. Response format: `{"count": number, "source": "model|fallback"}`

### Example Flow (Predict Page)
1. User fills in prediction parameters on the predict page
2. Frontend sends POST request to `/predict/day` or `/predict/hour`
3. Backend processes request using trained ML models
4. Backend returns predicted bike demand count
5. Frontend animates and displays the result

### Error Handling
- If backend is unavailable, frontend falls back to local heuristic predictions
- Debug logging shows which endpoint is being called
- Both frontend and backend have error handling with graceful degradation

## Required Environment Variables

### Development
No environment variables needed - uses localhost by default

### Production/Deployment
Set `NEXT_PUBLIC_API_URL` in frontend `.env` or deployment configuration:
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## Starting the Application

### Option 1: Using PowerShell Script
```powershell
.\start-servers.ps1
```

### Option 2: Manual Start

**Backend Terminal**:
```bash
cd ridewise-backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend Terminal**:
```bash
cd ridewise-frontend
npm install  # or pnpm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Verification

### Check Backend Health
```bash
curl http://localhost:8000/
# Expected response: {"status":"RideWise backend running"}
```

### Test Prediction Endpoint
```bash
curl -X POST http://localhost:8000/predict/day \
  -H "Content-Type: application/json" \
  -d '{
    "season": "spring",
    "month": 3,
    "day_of_week": 2,
    "hour": 12,
    "temp": 20,
    "hum": 60,
    "wind": 10,
    "weather": "clear",
    "holiday": 0,
    "workingday": 1
  }'
```

## Connection Features

✅ CORS enabled for frontend access
✅ Fallback predictions if backend is unavailable
✅ Type-safe API client in TypeScript
✅ Support for environment variable configuration
✅ Error handling and logging
✅ Health check endpoint
✅ Two prediction modes (daily and hourly)

## Troubleshooting

### Frontend can't reach backend
1. Verify backend is running on port 8000
2. Check if `NEXT_PUBLIC_API_URL` is correctly set
3. Check browser console for CORS errors
4. Verify firewall isn't blocking connections

### Backend not starting
1. Install requirements: `pip install -r requirements.txt`
2. Ensure Python 3.8+ is installed
3. Check if port 8000 is available

### Models not loading
- Backend will automatically fall back to heuristic predictions
- Check `ridewise-backend/` directory for `.pkl` model files
- Review error messages in backend console

## Integration Points

### Files Modified for Connection
- `ridewise-backend/main.py` - CORS middleware, API endpoints
- `ridewise-frontend/lib/api.ts` - API client functions
- `ridewise-frontend/app/predict/page.tsx` - Backend API calls
- `ridewise-backend/app.py` - Entry point that imports FastAPI app

## Current Status

✅ **Backend**: Running on `http://localhost:7860`
✅ **Frontend**: Running on `http://localhost:3000`
✅ **Connection**: Fully configured and ready

### Access the Application
- **Web App**: http://localhost:3000
- **Backend Health**: http://localhost:7860/
- **Backend Docs**: http://localhost:7860/docs (interactive API documentation)
