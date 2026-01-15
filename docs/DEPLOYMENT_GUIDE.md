# RideWise Deployment Guide

## Overview
- **Frontend**: Hosted on Vercel (Next.js)
- **Backend**: Hosted on Render (FastAPI)
- **Database**: Models stored as pickle files

## Prerequisites
1. GitHub account (free)
2. Render account (free tier available)
3. Vercel account (free tier)

---

## **PART 1: GitHub Setup**

### 1.1 Create GitHub Repositories

Create two separate repositories:
- **ridewise-backend** (for FastAPI backend)
- **ridewise-frontend1** (for Next.js frontend)

Visit: https://github.com/new

### 1.2 Push Backend to GitHub

```bash
# Navigate to backend directory
cd C:\Users\HP\Desktop\ridewise\ridewise-backend

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: RideWise backend with FastAPI and ML models"

# Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/ridewise-backend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 1.3 Push Frontend to GitHub

```bash
# Navigate to frontend directory
cd C:\Users\HP\Desktop\ridewise\ridewise-frontend

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: RideWise frontend with Next.js and React"

# Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/ridewise-frontend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## **PART 2: Backend Deployment on Render**

### 2.1 Prepare Backend for Render

✓ Already done:
- `requirements.txt` created with all dependencies
- `render.yaml` configuration file created

### 2.2 Deploy to Render

1. Go to https://render.com
2. Sign up with GitHub account
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub account and select **ridewise-backend** repository
5. Configure:
   - **Name**: ridewise-backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free (sufficient for testing)

6. Click **"Create Web Service"**
7. Wait for build to complete (~2-3 minutes)

### 2.3 Get Backend URL

After deployment, Render will provide a URL like:
```
https://ridewise-backend-xxxxx.onrender.com
```

**Copy this URL** - you'll need it for frontend configuration.

---

## **PART 3: Frontend Deployment on Vercel**

### 3.1 Prepare Frontend for Vercel

✓ Already done:
- `vercel.json` configuration created
- API URL set to use environment variables

### 3.2 Deploy to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub account
3. Click **"Add New +"** → **"Project"**
4. Import **ridewise-frontend1** repository
5. Configure:
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: ./ (or ./ridewise-frontend1 if in monorepo)
   - **Build Command**: `npm run build`

6. **Environment Variables** (Important!):
   - Add: `NEXT_PUBLIC_API_URL` = `https://ridewise-backend-xxxxx.onrender.com`
   
   (Replace with the actual Render backend URL from Step 2.3)

7. Click **"Deploy"**
8. Wait for build to complete (~3-5 minutes)

### 3.3 Get Frontend URL

After deployment, Vercel will provide a URL like:
```
https://ridewise-frontend1-xxxxx.vercel.app
```

---

## **Testing Deployed Application**

1. Open frontend: `https://your-vercel-app.vercel.app`
2. Navigate to **Predict** page
3. Make a prediction - this will call your backend API
4. Check browser console (F12) for any errors

---

## **Troubleshooting**

### Backend not responding
- Check Render dashboard for build errors
- Verify `requirements.txt` has all dependencies
- Check logs: Render dashboard → Service → Logs

### Frontend can't reach backend
- Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Ensure backend URL ends WITHOUT trailing slash
- Check CORS is enabled in FastAPI (already done in main.py)
- Open browser console (F12) → Network tab → check failed requests

### Models not loading
- Ensure `.pkl` files are in backend directory
- Check file sizes match expectations
- Review Render logs for pickle loading errors

### Port issues
- Render uses `$PORT` environment variable automatically
- Don't hardcode ports in production code

---

## **Updating Code After Deployment**

### Push updates:
```bash
git add .
git commit -m "Your message"
git push origin main
```

Both Render and Vercel will auto-detect pushes and redeploy automatically.

---

## **Important Notes**

⚠️ **Do NOT commit**:
- `.env` files with secrets
- Virtual environments
- Build outputs (`node_modules`, `.next`)

✓ **DO commit**:
- Source code
- Configuration files (`vercel.json`, `render.yaml`)
- `requirements.txt` and `package.json`
- Model `.pkl` files (they're needed for predictions!)

---

## **Summary of URLs**

After deployment, you'll have:
- **Frontend**: https://your-vercel-domain.vercel.app
- **Backend API**: https://ridewise-backend-xxxxx.onrender.com
- **API Health Check**: https://ridewise-backend-xxxxx.onrender.com/

All configured to work together! 🚀
