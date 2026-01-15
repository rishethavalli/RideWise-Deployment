# Quick Deployment Checklist

## ✓ Already Done (Configuration Created)
- [x] `requirements.txt` - Backend dependencies
- [x] `render.yaml` - Render configuration
- [x] `vercel.json` - Vercel configuration
- [x] `.gitignore` files created
- [x] Frontend API URL uses environment variables
- [x] CORS enabled in backend

## 📋 Your Action Items (In Order)

### Step 1: Create GitHub Repositories (5 minutes)
- [ ] Go to https://github.com/new
- [ ] Create: **ridewise-backend**
- [ ] Create: **ridewise-frontend1**
- [ ] Note: Do NOT initialize with README (you'll push existing code)

### Step 2: Push Backend to GitHub (5 minutes)
```bash
cd C:\Users\HP\Desktop\ridewise\ridewise-backend
git init
git add .
git commit -m "Initial commit: RideWise backend"
git remote add origin https://github.com/YOUR_USERNAME/ridewise-backend.git
git branch -M main
git push -u origin main
```

### Step 3: Push Frontend to GitHub (5 minutes)
```bash
cd C:\Users\HP\Desktop\ridewise\ridewise-frontend
git init
git add .
git commit -m "Initial commit: RideWise frontend"
git remote add origin https://github.com/YOUR_USERNAME/ridewise-frontend1.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy Backend on Render (10 minutes)
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select ridewise-backend repo
5. Configure:
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Deploy
7. **COPY the resulting URL** (looks like: https://ridewise-backend-xxxxx.onrender.com)

### Step 5: Deploy Frontend on Vercel (10 minutes)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New +" → "Project"
4. Select ridewise-frontend1 repo
5. Add Environment Variable:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://ridewise-backend-xxxxx.onrender.com` (from Step 4)
6. Deploy
7. **GET your frontend URL** (looks like: https://ridewise-frontend1-xxxxx.vercel.app)

### Step 6: Test (5 minutes)
- [ ] Open: https://your-vercel-domain.vercel.app
- [ ] Go to Predict page
- [ ] Make a test prediction
- [ ] Check if it works! 🎉

---

## Total Time: ~40 minutes

## Notes
- Render free tier: ~15 minutes cold start time between requests
- Vercel free tier: automatic deployments on push
- Models automatically load from pickle files
- No code changes needed - configs are ready!

## Support
If something breaks:
1. Check logs in Render/Vercel dashboards
2. Verify API URL is correct in Vercel env vars
3. Test locally first: `npm run dev` and `uvicorn main:app`
