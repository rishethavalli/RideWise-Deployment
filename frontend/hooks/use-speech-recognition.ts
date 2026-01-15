"use client"

import { useCallback, useState } from "react"
import type { SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from "web-speech-api"

type UseSpeechRecognitionReturn = {
  isListening: boolean
  transcript: string
  error: string | null
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState<string | null>(null)

  const SpeechRecognition =
    typeof window !== "undefined" ? window.SpeechRecognition || (window as any).webkitSpeechRecognition : null

  const startListening = useCallback(() => {
    if (!SpeechRecognition) {
      setError("Speech Recognition is not supported in this browser")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
      setTranscript("")
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcript)
        } else {
          interimTranscript += transcript
        }
      }
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "no-speech") {
        setError("No speech detected. Please try again.")
      } else if (event.error === "network") {
        setError("Network error. Please check your connection.")
      } else if (event.error === "not-allowed") {
        setError("Microphone permission denied.")
      } else {
        setError(`Error: ${event.error}`)
      }
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }, [SpeechRecognition])

  const stopListening = useCallback(() => {
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.abort()
    setIsListening(false)
  }, [SpeechRecognition])

  const resetTranscript = useCallback(() => {
    setTranscript("")
    setError(null)
  }, [])

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  }
}
