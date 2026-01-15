"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Send, Mic, X, Loader } from "lucide-react"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { getAIResponse, type ChatMessage } from "@/lib/gemini"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your RideWise AI assistant. Ask me anything about bike demand predictions, weather impact, seasonal trends, or how our ML models work!",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [cooldownUntil, setCooldownUntil] = useState(0)
  const inFlightRef = useRef(false)
  const { isListening, transcript, error, startListening, stopListening, resetTranscript } = useSpeechRecognition()

  const isInCooldown = useMemo(() => cooldownUntil > Date.now(), [cooldownUntil])

  useEffect(() => {
    if (!cooldownUntil) return
    const delayMs = cooldownUntil - Date.now()
    if (delayMs <= 0) {
      setCooldownUntil(0)
      return
    }
    const id = window.setTimeout(() => setCooldownUntil(0), delayMs)
    return () => window.clearTimeout(id)
  }, [cooldownUntil])

  const handleMicClick = () => {
    if (isListening) {
      stopListening()
      if (transcript) {
        setInput((prev) => (prev ? prev + " " + transcript : transcript))
        resetTranscript()
      }
    } else {
      resetTranscript()
      startListening()
    }
  }

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    // Never allow duplicate/background submissions.
    if (inFlightRef.current || isLoading) return

    // Enforce cooldown between consecutive requests.
    if (cooldownUntil > Date.now()) {
      const remainingMs = cooldownUntil - Date.now()
      const remainingSec = Math.ceil(remainingMs / 1000)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Please wait ${remainingSec}s before sending another message.`,
        },
      ])
      return
    }

    const userMessage: Message = { role: "user", content: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    inFlightRef.current = true
    setIsLoading(true)

    try {
      // Build conversation history for Gemini
      const conversationHistory: ChatMessage[] = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      // Get response from Gemini API
      const response = await getAIResponse(userMessage.content, conversationHistory)

      const aiResponse: Message = {
        role: "assistant",
        content: response,
      }
      setMessages((prev) => [...prev, aiResponse])
      console.log("✅ AI response received:", response)
    } catch (error) {
      console.error("❌ AI API Error:", error)
      const errorResponse: Message = {
        role: "assistant",
        content: `I encountered an error: ${
          error instanceof Error
            ? error.message
            : "Failed to get response from AI. Please try again."
        }`,
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
      inFlightRef.current = false
      // Minimum 2 second cooldown after each completed attempt (success or failure).
      setCooldownUntil(Date.now() + 2000)
    }
  }

  const sendDisabled = isLoading || isInCooldown || !input.trim()

  return (
    <div className="relative min-h-screen p-4">
      {/* Background image with overlay */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{ backgroundImage: "url(/images/background.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      </div>

      <div className="mx-auto max-w-6xl py-8">
        <Link href="/welcome">
          <Button variant="ghost" className="mb-6 text-foreground hover:bg-white/10">
            <ArrowLeft className="mr-2 size-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="mb-8 text-center text-4xl font-bold text-primary drop-shadow-[0_0_20px_rgba(60,242,255,0.8)]">
          AI Assistant
        </h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chat Panel */}
          <Card className="border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground">Chat with AI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 h-96 space-y-4 overflow-y-auto rounded-lg bg-black/30 p-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                          : "border border-white/20 bg-white/10 text-foreground backdrop-blur-sm"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-foreground backdrop-blur-sm">
                      <Loader className="size-4 animate-spin" />
                      Thinking...
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-3 flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <X className="size-4" />
                  {error}
                </div>
              )}

              {isListening && (
                <div className="mb-3 flex items-center gap-2 rounded-lg bg-primary/20 px-3 py-2 text-sm text-primary">
                  <div className="flex gap-1">
                    <div className="size-2 animate-pulse rounded-full bg-primary" />
                    <div className="size-2 animate-pulse rounded-full bg-primary delay-100" />
                    <div className="size-2 animate-pulse rounded-full bg-primary delay-200" />
                  </div>
                  Listening...
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={input || (isListening ? `${transcript}...` : "")}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return
                    if (sendDisabled) return
                    handleSend()
                  }}
                  placeholder="Ask me anything or use voice input..."
                  disabled={isLoading}
                  className="flex-1 rounded-lg border border-white/20 bg-black/30 px-4 py-2 text-foreground backdrop-blur-sm transition-all placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                />
                <Button
                  onClick={handleMicClick}
                  disabled={isLoading}
                  variant={isListening ? "default" : "outline"}
                  className={`${
                    isListening
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50 hover:bg-primary/90"
                      : "border-white/20 text-foreground hover:bg-white/10"
                  }`}
                  title={isListening ? "Stop listening" : "Start voice input"}
                >
                  <Mic className="size-4" />
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={sendDisabled}
                  className="bg-primary text-primary-foreground shadow-lg shadow-primary/50 transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(60,242,255,0.6)] disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Explanation Panel */}
          <Card className="border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-foreground">How Predictions Work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground/80">
              <div>
                <h3 className="mb-2 font-semibold text-primary">Machine Learning</h3>
                <p>Our AI model is trained on historical bike sharing data to identify patterns and trends.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-secondary">Weather Impact</h3>
                <p>Temperature, humidity, and weather conditions significantly affect bike demand.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-primary">Temporal Patterns</h3>
                <p>Seasonality, time of day, and weekday vs weekend patterns are key factors.</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-secondary">Special Events</h3>
                <p>Holidays and working days influence commuting patterns and leisure rides.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
