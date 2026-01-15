# RideWise - Frontend & Backend Integration Guide

## Overview
This guide explains how to connect the RideWise frontend (Next.js) with the backend (FastAPI).

## Architecture

### Backend (Python/FastAPI)
- **Location**: `ridewise-backend/`
- **Port**: 8000
- **Endpoints**:
  - `POST /predict/day` - Predict daily bike demand
  - `POST /predict/hour` - Predict hourly bike demand
  - `GET /` - Health check

### Frontend (Next.js)
- **Location**: `ridewise-frontend1/`
- **Port**: 3000
- **API Integration**: `/lib/api.ts` and `/lib/hooks.ts`

## Setup Instructions

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd ridewise-backend
pip install fastapi uvicorn pydantic
```

Ensure you have the required model files in the backend directory:
- `day_model_cnt.pkl`
- `hour_model_cnt.pkl`
- `day_features_cnt.pkl`
- `hour_features_cnt.pkl`

Start the backend server:

```bash
python main.py
# or with uvicorn directly:
uvicorn main:app --reload --port 8000
```

The backend will be available at `http://127.0.0.1:8000`

### 2. Frontend Setup

Install dependencies:

```bash
cd ridewise-frontend
pnpm install
# or npm install
```

The `.env.local` file is already configured with:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Start the development server:

```bash
pnpm dev
# or npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Integration

### Using the API

The frontend uses two main files for backend communication:

#### `/lib/api.ts` - Core API functions
Provides low-level API functions:
- `predictDay(data)` - Call daily prediction endpoint
- `predictHour(data)` - Call hourly prediction endpoint
- `healthCheck()` - Check if backend is running

#### `/lib/hooks.ts` - React hooks
Provides React hooks for easy integration:
- `usePrediction()` - Hook for making predictions with loading/error states
- `useBackendHealth()` - Hook for checking backend health

### Example Usage in Components

```tsx
import { usePrediction } from "@/lib/hooks"

export default function MyComponent() {
  const { predict, loading, error } = usePrediction()

  const handleClick = async () => {
    const result = await predict("daily", {
      season: "spring",
      month: 3,
      day_of_week: 1,
      hour: 12,
      temp: 20,
      hum: 50,
      wind: 10,
      weather: "clear",
      holiday: 0,
      workingday: 1,
    })
    
    if (result) {
      console.log("Predicted count:", result.count)
    }
  }

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Predicting..." : "Predict"}
    </button>
  )
}
```

## Configuration

### Changing the Backend URL

If your backend is running on a different host/port, update `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://your-backend-url:8000
```

### CORS

The backend is configured to allow requests from `http://localhost:3000`. If you're deploying to a different domain, update the CORS settings in `ridewise-backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "your-frontend-url"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Troubleshooting

### "Prediction failed — is backend running?"
1. Ensure the backend is running on `http://127.0.0.1:8000`
2. Check that all model files exist in the backend directory
3. Verify no port conflicts (use `netstat -tuln` on Linux/Mac or `netstat -ano` on Windows)

### CORS errors
1. Check that the backend has CORS enabled for `http://localhost:3000`
2. Verify the frontend is accessing the correct backend URL

### Connection refused
1. Ensure both frontend and backend servers are running
2. Check firewall settings
3. Verify the URLs in `.env.local` match the running backend

## Running Together

To run both servers simultaneously:

**Terminal 1 - Backend:**
```bash
cd ridewise-backend
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd ridewise-frontend
pnpm dev
```

Then open `http://localhost:3000` in your browser.
