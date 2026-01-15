# Firebase Gemini Chatbot Setup Guide

## Overview
The RideWise chatbot now uses **Google Gemini via Firebase Cloud Functions** instead of Hugging Face.

**Benefits:**
- Secure API key storage (not exposed to frontend)
- Serverless deployment on Firebase
- Automatic scaling
- Direct access to Gemini 1.5 Flash model

---

## Step 1: Create Firebase Project

1. Go to https://firebase.google.com
2. Click **"Get Started"**
3. Create a new project:
   - **Project name**: `ridewise`
   - **Enable Google Analytics**: Optional
   - Click **Create Project**
4. Wait for project creation (2-3 minutes)

---

## Step 2: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. In **Your apps** section, click **Web** (if not visible, click **Add app**)
3. Register app as `ridewise-frontend`
4. Copy the Firebase config object:
   ```javascript
   {
     apiKey: "AIza...",
     authDomain: "ridewise-xyz.firebaseapp.com",
     projectId: "ridewise-xyz",
     storageBucket: "ridewise-xyz.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc..."
   }
   ```

---

## Step 3: Update Frontend Environment Variables

Edit `ridewise-frontend/.env.local`:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ridewise-xyz.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ridewise-xyz
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ridewise-xyz.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...
NEXT_PUBLIC_FIREBASE_REGION=us-central1
```

---

## Step 4: Get Gemini API Key

1. Go to https://aistudio.google.com/app/apikey
2. Click **"Create API Key"**
3. Select your Firebase project (or create a new one)
4. Copy the API key (starts with `AIza`)

---

## Step 5: Deploy Cloud Function

### Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Login to Firebase

```bash
firebase login
```

### Initialize Firebase in Project Root

```bash
cd C:\Users\HP\Desktop\ridewise
firebase init functions
```

When prompted:
- **Use existing project**: Yes → Select `ridewise-xyz`
- **Language**: JavaScript
- **ESLint**: Yes
- **Install dependencies**: Yes

### Deploy Function

```bash
firebase deploy --only functions
```

This will deploy the `chatbot` function to:
```
https://us-central1-ridewise-xyz.cloudfunctions.net/chatbot
```

### Set Environment Variable

```bash
firebase functions:config:set gemini.api_key="AIza..."
```

Or in Firebase Console:
1. Go to **Cloud Functions**
2. Click the `chatbot` function
3. Go to **Runtime Settings**
4. Set environment variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key
5. Click **Deploy**

---

## Step 6: Test Locally

### Start Firebase Emulator

```bash
firebase emulators:start --only functions
```

### Update Local .env.local for Emulator

```bash
# For local testing with emulator
NEXT_PUBLIC_FIREBASE_EMULATOR_HOST=localhost:5001
```

### Run Frontend

```bash
cd ridewise-frontend
npm run dev
```

Visit http://localhost:3000 and test the chatbot!

---

## Step 7: Deploy to Production

### Build & Deploy Frontend (Vercel)

```bash
cd ridewise-frontend
npm run build
vercel deploy --prod
```

Update Vercel environment variables with Firebase config.

### Redeploy Functions (if needed)

```bash
firebase deploy --only functions
```

---

## Troubleshooting

### "Firebase project not configured"
✅ **Solution**: Check `NEXT_PUBLIC_FIREBASE_PROJECT_ID` in `.env.local`

### "Gemini API error"
✅ **Solutions**:
1. Check GEMINI_API_KEY is set in Firebase Console
2. Ensure API key has Gemini access enabled
3. Check API quotas: https://console.cloud.google.com/apis

### "Function not found" (404)
✅ **Solution**: 
- Verify function deployed: `firebase functions:list`
- Check region matches `NEXT_PUBLIC_FIREBASE_REGION`

### Rate Limit Errors
✅ **Solution**: Upgrade from free tier on https://firebase.google.com/pricing

---

## File Structure

```
ridewise/
├── functions/
│   ├── index.js          ← Cloud Function code
│   └── package.json      ← Dependencies
├── ridewise-frontend/
│   ├── .env.local        ← Firebase config
│   └── app/
│       └── api/
│           └── hf/
│               └── route.ts  ← API proxy
└── .firebaserc           ← Firebase config
```

---

## Security Notes

✅ **API Key Security**:
- `GEMINI_API_KEY` is NEVER exposed to frontend
- Only set in Firebase Cloud Function environment
- Frontend calls Function via HTTPS with CORS

✅ **Best Practices**:
- Rotate API keys regularly
- Use Firebase IAM roles for function access
- Enable Cloud Function authentication in production
- Monitor usage: https://console.cloud.google.com/billing

---

## Next Steps

1. Get Gemini API key from https://aistudio.google.com/app/apikey
2. Update `.env.local` with Firebase config
3. Deploy Cloud Function: `firebase deploy --only functions`
4. Set GEMINI_API_KEY in Firebase Console
5. Restart frontend: `npm run dev`
6. Test chatbot at http://localhost:3000

**Questions?** Check Firebase docs: https://firebase.google.com/docs/functions
