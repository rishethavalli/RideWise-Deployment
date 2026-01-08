# Frontend-Backend Integration Verification

## ✅ Integration Status

### Files Created/Modified:
1. ✅ `lib/api.ts` - API functions for backend calls
2. ✅ `lib/hooks.ts` - React hooks for API integration  
3. ✅ `.env.local` - Backend URL configuration
4. ✅ `app/predict/page.tsx` - Updated with API integration

### Integration Features:
- ✅ Sends daily/hourly predictions to backend
- ✅ Fallback to local prediction if backend is down
- ✅ Error handling and logging
- ✅ Original UI design preserved
- ✅ Loading states and animations working

---

## 🔍 How to Test

### Option 1: Use Browser Console (Recommended)
1. Open http://localhost:3000/predict
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Paste this code and press Enter:

```javascript
async function test() {
  console.log("Testing backend...");
  try {
    const res = await fetch("http://127.0.0.1:8000/");
    if (res.ok) {
      console.log("✅ Backend is running!");
    } else {
      console.log("❌ Backend error:", res.status);
    }
  } catch (err) {
    console.log("❌ Backend not reachable:", err.message);
  }
}
test();
```

### Option 2: Test via Frontend UI
1. Go to **http://localhost:3000/predict**
2. Set some parameters (season, temperature, etc.)
3. Click **Predict** button
4. Check:
   - If you see a number in the prediction box → **Integration working!**
   - Check browser console (F12 → Console) for any errors

---

## 🚀 Expected Behavior

### When Backend is Running:
- Click Predict → Gets real predictions from backend model
- Should be relatively quick (2-3 seconds)
- Prediction uses actual ML model

### When Backend is NOT Running:
- Click Predict → Falls back to local calculation
- Uses the algorithm in `useFallbackPrediction()`
- Still shows results but they're estimated values

---

## ⚙️ Configuration

### Backend URL:
**File:** `.env.local`
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### API Endpoints:
- `POST /predict/day` → Daily demand prediction
- `POST /predict/hour` → Hourly demand prediction
- `GET /` → Health check

### Request Format:
```json
{
  "season": "spring",
  "month": 3,
  "day_of_week": 1,
  "hour": 12,
  "temp": 20,
  "hum": 50,
  "wind": 10,
  "weather": "clear",
  "holiday": 0,
  "workingday": 1
}
```

---

## 🐛 Troubleshooting

### Issue: "Site can't be reached"
**Solution:**
- Frontend server running? Check if you see "Ready in X.Xs" in terminal
- Port 3000 available? Kill other apps using it
- Try: `npm run dev` in `ridewise-frontend/`

### Issue: Predictions say "Prediction failed" or show slow values
**Possible causes:**
1. Backend not running → Start it with: `python main.py` in `ridewise-backend/`
2. Model files missing → Check if `.pkl` files exist in backend folder
3. Port conflict → Ensure backend is on port 8000

### Issue: Browser console shows CORS error
**Check:**
1. Backend has CORS enabled (already configured in main.py)
2. Frontend URL is allowed (should be http://localhost:3000)

---

## 📋 Checklist for Full Setup

- [ ] Frontend running: `npm run dev` (port 3000)
- [ ] Backend running: `python main.py` (port 8000)
- [ ] `.env.local` has correct URL
- [ ] All `.pkl` files in backend folder
- [ ] Open http://localhost:3000/predict
- [ ] Try clicking Predict button
- [ ] Check F12 console for errors

---

## 🎯 Quick Start Commands

**Terminal 1 - Backend:**
```bash
cd ridewise-backend
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd ridewise-frontend
npm run dev
```

Then open: http://localhost:3000/predict
