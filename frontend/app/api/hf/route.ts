import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    console.log("✅ Route received message:", message);

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    console.log("🔑 API Key exists:", !!apiKey);

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Build conversation contents
    const contents = [];

    // Add history if provided
    if (Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      }
    }

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Call Gemini API
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    console.log("📤 Calling Gemini API...");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents }),
    });

    console.log("📥 Gemini API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Gemini error response:", errorText);
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }

      if (response.status === 403) {
        return NextResponse.json(
          { error: "API key invalid or quota exceeded." },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { error: `Gemini API error (${response.status}): ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("✅ Gemini response data:", JSON.stringify(data).substring(0, 300));

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("❌ No text found in Gemini response");
      return NextResponse.json(
        { error: "Invalid response format from Gemini" },
        { status: 500 }
      );
    }

    console.log("✅ Returning text response");
    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("❌ API route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }

  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
