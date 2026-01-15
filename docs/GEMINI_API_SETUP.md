# Gemini API Setup Guide

## Overview
The RideWise AI Assistant now uses **Google Gemini API** to provide intelligent responses about bike demand predictions, weather impacts, seasonal trends, and ML model explanations.

## Setup Steps

### 1. Get Your Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click **"Create API Key"**
3. Select or create a Google Cloud project
4. Your API key will be generated and displayed
5. Copy the API key

### 2. Add API Key to Environment
1. Open `ridewise-frontend/.env.local`
2. Replace `your_gemini_api_key_here` with your actual API key:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
```
3. Save the file

### 3. Restart Frontend
The frontend will automatically reload and pick up the new environment variable.

## Testing the AI Assistant

1. Visit `http://localhost:3000/assistant`
2. Ask questions like:
   - "What factors affect bike demand?"
   - "How does weather impact bike sharing?"
   - "Explain the ML model predictions"
   - "What is seasonal variation in bike demand?"

3. Open browser console (F12) to see:
   - ✅ `✅ Gemini AI Response received: ...` when successful
   - ❌ `❌ Gemini API Error: ...` if there are issues

## Features

✅ **Real-time AI Chat** - Powered by Google Gemini Pro
✅ **Voice Input** - Speak and the AI will understand
✅ **Context Awareness** - AI remembers your conversation history
✅ **RideWise Knowledge** - System prompt tailored to bike demand prediction domain
✅ **Error Handling** - Graceful error messages if API issues occur

## API Details

- **Model**: gemini-pro
- **API Endpoint**: https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
- **System Instruction**: RideWise AI Assistant focused on bike demand prediction
- **Temperature**: 0.7 (balanced between creative and factual)
- **Max Tokens**: 1024 (response length limit)

## Important Notes

⚠️ **Security**:
- The API key is public (NEXT_PUBLIC_) because it's accessed from browser
- Use API key restrictions in Google Cloud Console
- Monitor usage on [Google AI Studio Dashboard](https://aistudio.google.com/app/apikey)

⚠️ **Quotas**:
- Free tier: 60 requests per minute
- Check [Google AI Pricing](https://ai.google.dev/pricing) for limits

## Files Modified

- `ridewise-frontend/lib/gemini.ts` - Gemini API client
- `ridewise-frontend/app/assistant/page.tsx` - AI Assistant UI with Gemini integration
- `ridewise-frontend/.env.local` - Environment configuration

## Troubleshooting

### "API key is not configured"
- Check that `NEXT_PUBLIC_GEMINI_API_KEY` is in `.env.local`
- Make sure the key is correct
- Restart the development server

### "Failed to get response from Gemini"
- Check your API key is valid
- Verify internet connection
- Check you haven't exceeded quota (60 requests/minute)
- Look for error message in browser console

### No response from AI
- Ensure API key is set correctly in `.env.local`
- Check browser console for error details
- Verify the AI Studio API is enabled in your Google Cloud project

## Next Steps

1. Test the assistant with various bike demand questions
2. Monitor API usage in Google AI Studio
3. Customize system prompt if needed (in `lib/gemini.ts`)
4. Add conversation memory/storage for persistent conversations
