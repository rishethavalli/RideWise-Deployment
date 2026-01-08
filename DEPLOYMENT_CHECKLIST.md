# Deployment Checklist - Track Your Progress

Print this or use it digitally to track your deployment progress!

---

## PHASE 1: PREPARATION (5 minutes)

- [ ] Create GitHub account (if needed): https://github.com
- [ ] Create Render account (if needed): https://render.com  
- [ ] Create Vercel account (if needed): https://vercel.com
- [ ] Read `COPY_PASTE_COMMANDS.md`
- [ ] Have your GitHub username ready

---

## PHASE 2: CREATE GITHUB REPOSITORIES (5 minutes)

- [ ] Go to https://github.com/new
- [ ] Create first repo:
  - [ ] Name: `ridewise-backend`
  - [ ] Click "Create repository"
- [ ] Create second repo:
  - [ ] Name: `ridewise-frontend`
  - [ ] Click "Create repository"

**Note**: Do NOT initialize with README

---

## PHASE 3: PUSH BACKEND CODE (5 minutes)

Following `COPY_PASTE_COMMANDS.md` → STEP 2:

- [ ] Open PowerShell
- [ ] Navigate to: `C:\Users\HP\Desktop\ridewise\ridewise-backend`
- [ ] Run: `git init`
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial commit: RideWise backend with ML models"`
- [ ] Run: `git remote add origin https://github.com/YOUR_USERNAME/ridewise-backend.git`
- [ ] Run: `git branch -M main`
- [ ] Run: `git push -u origin main`
- [ ] ✅ See "Branch 'main' set up to track remote branch" message

---

## PHASE 4: PUSH FRONTEND CODE (5 minutes)

Following `COPY_PASTE_COMMANDS.md` → STEP 3:

- [ ] Open PowerShell (new window/tab)
- [ ] Navigate to: `C:\Users\HP\Desktop\ridewise\ridewise-frontend`
- [ ] Run: `git init`
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial commit: RideWise frontend with Next.js"`
- [ ] Run: `git remote add origin https://github.com/YOUR_USERNAME/ridewise-frontend.git`
- [ ] Run: `git branch -M main`
- [ ] Run: `git push -u origin main`
- [ ] ✅ See "Branch 'main' set up to track remote branch" message

**Verify at GitHub**: Visit https://github.com/YOUR_USERNAME - you should see both repos!

---

## PHASE 5: DEPLOY BACKEND ON RENDER (10 minutes)

Following `COPY_PASTE_COMMANDS.md` → STEP 4:

- [ ] Go to https://render.com
- [ ] Sign Up → GitHub
- [ ] Authorize GitHub access
- [ ] Click **New +** → **Web Service**
- [ ] Select **ridewise-backend** repo
- [ ] Configure:
  - [ ] Name: `ridewise-backend`
  - [ ] Environment: `Python 3`
  - [ ] Build Command: `pip install -r requirements.txt`
  - [ ] Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
  - [ ] Plan: `Free`
- [ ] Click **Create Web Service**
- [ ] Wait for build... (~2-3 minutes)
- [ ] ✅ See green checkmark ✓
- [ ] **COPY THIS URL**: `https://ridewise-backend-xxxxx.onrender.com`
  - [ ] Paste it here temporarily: ___________________________
  - [ ] You'll need it for the next step!

**Verify**: Try visiting your backend URL in browser - should see: `{"status":"RideWise backend running"}`

---

## PHASE 6: DEPLOY FRONTEND ON VERCEL (10 minutes)

Following `COPY_PASTE_COMMANDS.md` → STEP 5:

- [ ] Go to https://vercel.com
- [ ] Sign Up → GitHub
- [ ] Authorize GitHub access
- [ ] Click **Add New** → **Project**
- [ ] Find and click **ridewise-frontend**
- [ ] Click **Import**
- [ ] **CRITICAL**: Add Environment Variable:
  - [ ] Name: `NEXT_PUBLIC_API_URL`
  - [ ] Value: `https://ridewise-backend-xxxxx.onrender.com` (from PHASE 5!)
  - [ ] Click **Add**
- [ ] Click **Deploy**
- [ ] Wait for build... (~3-5 minutes)
- [ ] ✅ See "Deployment Complete" ✓
- [ ] **COPY THIS URL**: `https://ridewise-frontend-xxxxx.vercel.app`
  - [ ] Paste it here: ___________________________
  - [ ] This is your final app URL!

---

## PHASE 7: TEST YOUR APP (5 minutes)

- [ ] Open browser
- [ ] Go to: `https://your-vercel-domain.vercel.app` (from PHASE 6)
- [ ] Wait for page to load (first load may be slow)
- [ ] You should see the RideWise home page
- [ ] Click **Predict** in navigation
- [ ] Fill in test values:
  - [ ] Season: Spring
  - [ ] Month: 3
  - [ ] Day of Week: 1
  - [ ] Hour: 12
  - [ ] Temperature: 20
  - [ ] Humidity: 50
  - [ ] Wind Speed: 10
  - [ ] Weather: Clear
  - [ ] Holiday: No
  - [ ] Working Day: Yes
- [ ] Click **Predict** button
- [ ] ✅ You should see a number result!

**Success!** Your app is deployed! 🎉

---

## FINAL VERIFICATION

- [ ] Frontend loads without errors
- [ ] Can navigate between pages
- [ ] Predict page works
- [ ] Predictions return numbers (not errors)
- [ ] No error messages in browser console (F12)

---

## WHAT YOU NOW HAVE

✅ **Public Frontend URL**: https://your-vercel-domain.vercel.app
✅ **Public Backend URL**: https://ridewise-backend-xxxxx.onrender.com
✅ **Auto-Deployment**: Changes auto-deploy when you push to GitHub
✅ **Always Running**: No need to keep VS Code open
✅ **Shareable**: Give anyone the frontend URL!

---

## NEXT STEPS (OPTIONAL BUT RECOMMENDED)

### To Update Your App:
1. Make changes to code locally
2. Run: `git add .`
3. Run: `git commit -m "Your message"`
4. Run: `git push`
5. Render & Vercel auto-deploy within 2-5 minutes

### To Monitor:
- Render: https://dashboard.render.com (check backend logs)
- Vercel: https://vercel.com/dashboard (check frontend deployments)

### To Share:
- Send anyone your Vercel URL
- They can use your app without installing anything!

---

## TROUBLESHOOTING QUICK LINKS

If something doesn't work, check:
1. **Build failed?** → Check service logs in Render/Vercel dashboard
2. **Backend error?** → Verify `NEXT_PUBLIC_API_URL` in Vercel env vars
3. **Models not loading?** → Check `.pkl` files in GitHub repo
4. **CORS errors?** → Already enabled, shouldn't happen
5. **Slow?** → Normal for free tier (first request = ~15 seconds)

---

## COMPLETION CERTIFICATE 🏆

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║         🎉 RIDEWISE APP DEPLOYED SUCCESSFULLY 🎉      ║
║                                                       ║
║  Deployed on: _____/_____/_______                     ║
║  Frontend URL: _________________________               ║
║  Backend URL: __________________________               ║
║                                                       ║
║  You did it! Your app is live! 🚀                     ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

---

**Time spent: _____ minutes**
**Success: ☐ Yes ☐ In Progress ☐ Need Help**

**Good luck! You've got this! 💪**
