import { NextResponse } from "next/server"

const MODEL = "gemini-2.5-flash" // Correct model confirmed by /v1beta/models endpoint

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 })
    }

    const { prompt } = await req.json()
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid or empty prompt" }, { status: 400 })
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    }

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!resp.ok) {
      const errText = await resp.text()
      return NextResponse.json(
        { error: `Gemini API error: ${resp.status} ${errText}` },
        { status: 502 }
      )
    }

    const data = await resp.json()
    // Safely extract text from candidates
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text)?.filter(Boolean)?.join("\n") ||
      data?.candidates?.[0]?.output ||
      "No response from Gemini."

    return NextResponse.json({ output: text })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Unexpected error" }, { status: 500 })
  }
}
