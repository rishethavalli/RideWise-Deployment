# Frontend-Backend Connection Setup

## Overview
The RideWise application consists of:
- **Frontend**: Next.js (TypeScript) running on port 3000
- **Backend**: FastAPI (Python) running on port 8000

## Backend API Endpoints

### 1. Health Check
- **Endpoint**: `GET /`
- **Purpose**: Check if backend is running
- **Response**: `{"status": "RideWise backend running"}`

### 2. Daily Prediction
- **Endpoint**: `POST /predict/day`
- **Purpose**: Predict bike demand for a full day
- **Request Body**:
```json
{
  "season": "spring|summer|fall|winter",
  "month": 1-12,
  "day_of_week": 0-6,
  "hour": 0-23,
  "temp": number (temperature in Celsius),
  "hum": 0-100 (humidity percentage),
  "wind": number (wind speed),
  "weather": "clear|cloudy|rain|storm",
  "holiday": 0|1,
  "workingday": 0|1
}
```
- **Response**: `{"count": number, "source": "model|fallback"}`

### 3. Hourly Prediction
- **Endpoint**: `POST /predict/hour`
- **Purpose**: Predict bike demand for a specific hour
- **Request Body**: Same as daily prediction
- **Response**: `{"count": number, "source": "model|fallback"}`

## Frontend Configuration

### Environment Variables
The frontend uses the following environment variable to connect to the backend:

**`.env.local`** (create in `ridewise-frontend1/` directory):
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production deployment:
```
NEXT_PUBLIC_API_URL=https://your-deployed-backend-url.com
```

### API Client (`lib/api.ts`)
The frontend includes a TypeScript API client that:
- Reads the API URL from `NEXT_PUBLIC_API_URL`
- Falls back to `http://127.0.0.1:8000` for local development
- Provides typed functions for predictions:
  - `predictDay(data: PredictInput)` - Daily predictions
  - `predictHour(data: PredictInput)` - Hourly predictions
  - `healthCheck()` - Backend health status

## Running Both Services

### Option 1: Manual Terminal Windows

**Terminal 1 - Backend**:
```bash
cd C:\Users\HP\Desktop\ridewise\ridewise-backend
python -m pip install -r requirements.txt
python main.py
```

**Terminal 2 - Frontend**:
```bash
cd C:\Users\HP\Desktop\ridewise\ridewise-frontend1
npm install  # or pnpm install
npm run dev
```

### Option 2: Using Start Scripts

**PowerShell**:
```bash
.\start-servers.ps1
```

**Command Prompt** (Windows):
```bash
start.bat
```

## CORS Configuration

The backend includes CORS middleware that allows requests from any origin:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

This is configured for development. For production, update to only allow your frontend domain.

## Testing the Connection

### From Frontend
1. Visit `http://localhost:3000/predict`
2. Enter bike demand parameters
3. Click "Predict" to send a request to the backend
4. The frontend will display the predicted count

### From Command Line (Test Backend Directly)

**Test Health Check**:
```bash
curl http://localhost:8000/
```

**Test Daily Prediction**:
```bash
curl -X POST http://localhost:8000/predict/day ^
  -H "Content-Type: application/json" ^
  -d "{"season":"spring","month":3,"day_of_week":1,"hour":12,"temp":20,"hum":50,"wind":10,"weather":"clear","holiday":0,"workingday":1}"
```

**Test Hourly Prediction**:
```bash
curl -X POST http://localhost:8000/predict/hour ^
  -H "Content-Type: application/json" ^
  -d "{"season":"spring","month":3,"day_of_week":1,"hour":12,"temp":20,"hum":50,"wind":10,"weather":"clear","holiday":0,"workingday":1}"
```

## Troubleshooting

### "Cannot reach backend" error in frontend
- Check that backend is running on port 8000
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for CORS errors
- Ensure firewall isn't blocking port 8000

### Backend not starting
- Install dependencies: `pip install -r requirements.txt`
- Check Python version (3.8+)
- Verify port 8000 is not in use

### Models failing to load
- Ensure pickle files exist in backend directory:
  - `day_model.pkl`
  - `hour_model.pkl`
  - `day_features.pkl`
  - `hour_features.pkl`
- If missing, backend uses heuristic fallback predictions

## API Response Format

All endpoints return JSON responses:
```json
{
  "count": 1234,
  "source": "model"  // or "fallback" if models unavailable
}
```

The `source` field indicates whether the prediction came from the trained model or from fallback heuristics.

## Next Steps

1. Create `.env.local` in `ridewise-frontend1/` with backend URL
2. Start the backend service
3. Start the frontend development server
4. Test predictions on the `/predict` page
5. Monitor console for any connection errors
