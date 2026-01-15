# Copy-Paste Deployment Commands

## ⚠️ IMPORTANT: Replace YOUR_USERNAME in all commands below!

---

## STEP 1: Create GitHub Repositories

Go to https://github.com/new and create TWO repositories:
1. Name: `ridewise-backend`
2. Name: `ridewise-frontend1`

**DO NOT** initialize with README - just create empty repos.

---

## STEP 2: Push Backend (Copy-Paste These Commands)

```powershell
# Navigate to backend
cd C:\Users\HP\Desktop\ridewise\ridewise-backend

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: RideWise backend with ML models"

# Add GitHub remote (CHANGE YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/ridewise-backend.git

# Set main branch and push
git branch -M main
git push -u origin main
```

**Expected Output:**
```
Enumerating objects: ...
Counting objects: ...
Writing objects: ...
...
* [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## STEP 3: Push Frontend (Copy-Paste These Commands)

```powershell
# Navigate to frontend
cd C:\Users\HP\Desktop\ridewise\ridewise-frontend1

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: RideWise frontend with Next.js"

# Add GitHub remote (CHANGE YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/ridewise-frontend1.git

# Set main branch and push
git branch -M main
git push -u origin main
```

**Expected Output:** Same as Step 2

---

## STEP 4: Deploy Backend on Render

1. Go to: https://render.com
2. Click **Sign Up** → Connect with **GitHub**
3. Authorize GitHub access
4. Click **New +** in top right → **Web Service**
5. Select your **ridewise-backend** repository
6. Configure:
   - **Name**: `ridewise-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: `Free`

7. Click **Create Web Service**
8. Wait for build (2-3 minutes)
9. When done, you'll see a green checkmark ✓
10. **COPY the URL** at the top (looks like: `https://ridewise-backend-xxxxx.onrender.com`)

---

## STEP 5: Deploy Frontend on Vercel

1. Go to: https://vercel.com
2. Click **Sign Up** → Connect with **GitHub**
3. Authorize GitHub access
4. Click **Add New** → **Project**
5. Find and select **ridewise-frontend1**
6. Click **Import**
7. **IMPORTANT - Add Environment Variable:**
   - Under "Environment Variables" section
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://ridewise-backend-xxxxx.onrender.com` (from STEP 4!)
   - Click **Add**

8. Click **Deploy**
9. Wait for build (3-5 minutes)
10. When done, you'll see "Deployment Complete" ✓
11. **COPY the URL** provided (looks like: `https://ridewise-frontend1-xxxxx.vercel.app`)

---

## STEP 6: Test Your Application

1. Open your browser
2. Go to: `https://your-vercel-domain.vercel.app` (from STEP 5)
3. Click on **Predict** in the navigation
4. Fill in some values:
   - Season: Spring
   - Month: 3
   - Temperature: 20
   - Humidity: 50
   - Wind: 10
5. Click predict button
6. **You should see a number!** ✅

---

## Troubleshooting

### "fatal: not a git repository"
**Solution**: You're in the wrong directory. Make sure you're in:
- `C:\Users\HP\Desktop\ridewise\ridewise-backend` OR
- `C:\Users\HP\Desktop\ridewise\ridewise-frontend1`

### "remote origin already exists"
**Solution**: Remove it first
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/your-repo.git
```

### "Permission denied (publickey)"
**Solution**: You need to set up GitHub SSH key OR use HTTPS. Use:
```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/your-repo.git
```

### "Backend keeps failing on Render"
**Solution**: Check the logs
1. Go to Render dashboard
2. Select your service
3. Click **Logs** tab
4. Look for errors
5. Common issue: Missing dependencies in `requirements.txt`

### "Frontend can't reach backend"
**Solution**: Check environment variable
1. Go to Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Make sure `NEXT_PUBLIC_API_URL` is set to your Render URL
5. **Redeploy**: Click **Redeploy** button

### "Models not loading"
**Solution**: Pickle files should be in GitHub
1. Check your backend GitHub repo
2. Verify these files exist:
   - day_model.pkl
   - hour_model.pkl
   - day_features.pkl
   - hour_features.pkl
3. If missing, commit and push them

---

## Final Verification

After everything is deployed, verify:

- [ ] Frontend loads at your Vercel URL
- [ ] Backend is running (check Render dashboard - should show green "Live")
- [ ] Predict page works and returns predictions
- [ ] Models are being used (not fallback predictions)

---

## What NOT to Do

❌ Don't close VS Code while testing (not needed anymore - it's on cloud!)
❌ Don't hardcode API URLs in code (done via env vars)
❌ Don't commit `.env.local` (already in .gitignore)
❌ Don't change ML model logic (it's untouched)

---

## What Happens Next

- **You push code** → GitHub
- **Render sees push** → Automatically rebuilds backend
- **Vercel sees push** → Automatically rebuilds frontend
- **Changes are live** within 2-5 minutes

No manual redeployment needed! Just `git push`!

---

## Summary

| What | Where | URL |
|------|-------|-----|
| Frontend | Vercel | `https://ridewise-frontend1-xxxxx.vercel.app` |
| Backend API | Render | `https://ridewise-backend-xxxxx.onrender.com` |
| Your Code | GitHub | `https://github.com/YOUR_USERNAME/ridewise-*` |

**Total Time: ~40 minutes**

Good luck! 🚀
