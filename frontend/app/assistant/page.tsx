"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Mic, X } from "lucide-react"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your RideWise AI assistant. Ask me anything about bike demand predictions!",
    },
  ])
  const [input, setInput] = useState("")
  const { isListening, transcript, error, startListening, stopListening, resetTranscript } = useSpeechRecognition()

  const handleMicClick = () => {
    if (isListening) {
      // Stop listening and let transcript persist
      stopListening()
    } else {
      // Reset previous transcript and start new recording
      resetTranscript()
      startListening()
    }
  }

  // Handle voice transcript being added to input when recording stops
  const handleSendWithVoice = async () => {
    // If we have transcript but empty input, add transcript to input first
    if (!input.trim() && transcript.trim()) {
      setInput(transcript.trim())
      // Reset transcript for next recording
      resetTranscript()
      // Don't send yet, let user review
      return
    }
    
    // Otherwise send normally
    handleSend()
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        const aiResponse: Message = {
          role: "assistant",
          content: `❌ Gemini API Error: ${err?.error || res.statusText}`,
        }
        setMessages((prev) => [...prev, aiResponse])
      } else {
        const data = await res.json()
        const aiResponse: Message = {
          role: "assistant",
          content: data?.output || "(No response)",
        }
        setMessages((prev) => [...prev, aiResponse])
        // Log success for debugging, consistent with docs
        console.log("✅ Gemini AI Response received:", data?.output)
      }
    } catch (e: any) {
      const aiResponse: Message = {
        role: "assistant",
        content: `❌ Gemini API Error: ${e?.message || "Network error"}`,
      }
      setMessages((prev) => [...prev, aiResponse])
    }

    setInput("")
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/background.png)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/65 to-slate-900/70" />
      </div>

      <div className="relative z-10 min-h-screen">
        <PageHeader title="AI Assistant" />

        <div className="mx-auto max-w-6xl p-4 py-8">
          <h1 className="mb-8 text-center text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,166,81,0.5)]">
            AI <span className="text-[#00a651]">Assistant</span>
          </h1>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Chat Panel - Updated card styling */}
            <Card className="border-white/10 bg-white/95 shadow-2xl backdrop-blur-xl lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-gray-800">Chat with AI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 h-96 space-y-4 overflow-y-auto rounded-lg bg-gray-100 p-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === "user"
                            ? "bg-[#00a651] text-white shadow-lg"
                            : "border border-gray-200 bg-white text-gray-800"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-3 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600">
                  {transcript ? (
                    <>
                      <span className="font-semibold">Transcript:</span> {transcript}
                      {isListening && <span className="animate-pulse">...</span>}
                    </>
                  ) : (
                    <span className="text-gray-400">Transcript will appear here</span>
                  )}
                </div>

                {error && (
                  <div className="mb-3 flex items-center gap-2 rounded-lg border border-red-300 bg-red-100 px-3 py-2 text-sm text-red-600">
                    <X className="size-4" />
                    {error}
                  </div>
                )}

                {isListening && (
                  <div className="mb-3 flex items-center gap-2 rounded-lg bg-[#00a651]/20 px-3 py-2 text-sm text-[#00a651]">
                    <div className="flex gap-1">
                      <div className="size-2 animate-pulse rounded-full bg-[#00a651]" />
                      <div className="size-2 animate-pulse rounded-full bg-[#00a651] delay-100" />
                      <div className="size-2 animate-pulse rounded-full bg-[#00a651] delay-200" />
                    </div>
                    Listening...
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask me anything or use voice input..."
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 transition-all placeholder:text-gray-400 focus:border-[#00a651] focus:outline-none focus:ring-2 focus:ring-[#00a651]/50"
                  />
                  <Button
                    onClick={handleMicClick}
                    variant={isListening ? "default" : "outline"}
                    className={`${
                      isListening
                        ? "bg-[#00a651] text-white shadow-lg hover:bg-[#008c45]"
                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                    title={isListening ? "Stop listening" : "Start voice input"}
                  >
                    <Mic className="size-4" />
                  </Button>
                  <Button
                    onClick={!input.trim() && transcript.trim() ? handleSendWithVoice : handleSend}
                    className="bg-[#00a651] text-white shadow-lg hover:bg-[#008c45]"
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Explanation Panel */}
            <Card className="border-white/10 bg-white/95 shadow-2xl backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-gray-800">How Predictions Work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-600">
                <div>
                  <h3 className="mb-2 font-semibold text-[#00a651]">Machine Learning</h3>
                  <p>Our AI model is trained on historical bike sharing data to identify patterns and trends.</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-[#0099cc]">Weather Impact</h3>
                  <p>Temperature, humidity, and weather conditions significantly affect bike demand.</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-[#00a651]">Temporal Patterns</h3>
                  <p>Seasonality, time of day, and weekday vs weekend patterns are key factors.</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-[#0099cc]">Special Events</h3>
                  <p>Holidays and working days influence commuting patterns and leisure rides.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
