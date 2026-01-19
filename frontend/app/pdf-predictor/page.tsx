"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, Loader2 } from "lucide-react"

export default function PDFPredictorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [extractedText, setExtractedText] = useState("")
  const [isExtracting, setIsExtracting] = useState(false)
  const [isPredicting, setIsPredicting] = useState(false)
  const [hourlyPrediction, setHourlyPrediction] = useState<number | null>(null)
  const [dailyPrediction, setDailyPrediction] = useState<number | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile)
      setExtractedText("")
      setHourlyPrediction(null)
      setDailyPrediction(null)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile)
      setExtractedText("")
      setHourlyPrediction(null)
      setDailyPrediction(null)
    }
  }

  const removeFile = () => {
    setFile(null)
    setExtractedText("")
    setHourlyPrediction(null)
    setDailyPrediction(null)
  }

  const extractText = async () => {
    if (!file) return

    setIsExtracting(true)
    // Simulate text extraction (in production, this would use a PDF parsing library)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulated extracted text
    setExtractedText(
      `Document Analysis Report\n\nThis PDF contains ride-sharing data from the urban mobility network. ` +
        `Key observations include seasonal variations in bike usage patterns, with peak demand during morning ` +
        `and evening commute hours. Weather conditions show significant correlation with rider behavior. ` +
        `Temperature ranges from 15-28°C were associated with highest usage. Weekend patterns differ ` +
        `substantially from weekday trends, showing 35% higher recreational usage.\n\n` +
        `Additional data points extracted: humidity levels, wind speed variations, and holiday impact ` +
        `factors have been processed for prediction modeling.`,
    )
    setIsExtracting(false)
  }

  // Hidden parameters processed internally (not shown to user)
  const getHiddenParameters = () => ({
    season: Math.floor(Math.random() * 4) + 1, // 1-4
    month: new Date().getMonth() + 1,
    dayOfWeek: new Date().getDay(),
    temperature: 18 + Math.random() * 15,
    humidity: 40 + Math.random() * 40,
    windSpeed: 5 + Math.random() * 20,
    weather: Math.floor(Math.random() * 4) + 1,
    holiday: Math.random() > 0.9 ? 1 : 0,
    workingDay: new Date().getDay() !== 0 && new Date().getDay() !== 6 ? 1 : 0,
    hour: new Date().getHours(),
  })

  const predictHourly = async () => {
    setIsPredicting(true)
    // Process hidden parameters internally
    const params = getHiddenParameters()

    // Simulate ML prediction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate realistic hourly prediction based on internal parameters
    const baseCount = 150
    const hourFactor = (params.hour >= 7 && params.hour <= 9) || (params.hour >= 17 && params.hour <= 19) ? 2.5 : 1
    const weatherFactor = params.weather === 1 ? 1.2 : params.weather === 2 ? 1 : 0.7
    const tempFactor = params.temperature > 15 && params.temperature < 30 ? 1.3 : 0.8

    const prediction = Math.round(baseCount * hourFactor * weatherFactor * tempFactor + Math.random() * 50)
    setHourlyPrediction(prediction)
    setIsPredicting(false)
  }

  const predictDaily = async () => {
    setIsPredicting(true)
    // Process hidden parameters internally
    const params = getHiddenParameters()

    // Simulate ML prediction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate realistic daily prediction based on internal parameters
    const baseCount = 2500
    const weekendFactor = params.workingDay === 0 ? 1.35 : 1
    const seasonFactor = params.season === 2 || params.season === 3 ? 1.4 : 0.9
    const weatherFactor = params.weather === 1 ? 1.2 : params.weather === 2 ? 1 : 0.6

    const prediction = Math.round(baseCount * weekendFactor * seasonFactor * weatherFactor + Math.random() * 500)
    setDailyPrediction(prediction)
    setIsPredicting(false)
  }

  return (
    <div className="relative min-h-screen">
      {/* Background */}
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
        <PageHeader title="PDF Predictor" />

        <main className="mx-auto max-w-4xl p-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,166,81,0.5)] md:text-4xl">
              PDF-Based <span className="text-[#00a651]">Ride Prediction</span>
            </h1>
            <p className="mt-2 text-gray-300">Upload a PDF document to extract data and predict ride demand</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* PDF Upload Section */}
            <Card className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Upload className="h-5 w-5 text-[#00a651]" />
                  Upload PDF
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!file ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all ${
                      isDragging
                        ? "border-[#00a651] bg-[#00a651]/10"
                        : "border-gray-300 bg-gray-50/50 hover:border-[#00a651]/50 hover:bg-[#00a651]/5"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <FileText className="mb-4 h-12 w-12 text-gray-400" />
                    <p className="text-center text-gray-600">
                      <span className="font-medium text-[#00a651]">Click to upload</span> or drag and drop
                    </p>
                    <p className="mt-1 text-sm text-gray-400">PDF files only</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white/50 p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-[#00a651]" />
                        <div>
                          <p className="font-medium text-gray-800">{file.name}</p>
                          <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button
                        onClick={removeFile}
                        className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <Button
                      onClick={extractText}
                      disabled={isExtracting}
                      className="w-full bg-[#00a651] text-white hover:bg-[#008c45]"
                    >
                      {isExtracting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Extracting...
                        </>
                      ) : (
                        "Extract Text"
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Extracted Text Section */}
            <Card className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-gray-800">Extracted Paragraph</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] overflow-y-auto rounded-lg border border-gray-200 bg-white/50 p-4">
                  {extractedText ? (
                    <p className="whitespace-pre-wrap text-sm text-gray-700">{extractedText}</p>
                  ) : (
                    <p className="text-center text-gray-400">
                      Upload a PDF and click "Extract Text" to see content here
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prediction Controls */}
          <Card className="mt-6 border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-center text-gray-800">Ride Demand Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-6">
                {/* Prediction Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    onClick={predictHourly}
                    disabled={!extractedText || isPredicting}
                    className="min-w-[200px] bg-[#0099cc] text-white hover:bg-[#0088bb]"
                  >
                    {isPredicting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Predicting...
                      </>
                    ) : (
                      "Predict Hourly Count"
                    )}
                  </Button>
                  <Button
                    onClick={predictDaily}
                    disabled={!extractedText || isPredicting}
                    className="min-w-[200px] bg-[#00a651] text-white hover:bg-[#008c45]"
                  >
                    {isPredicting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Predicting...
                      </>
                    ) : (
                      "Predict Daily Count"
                    )}
                  </Button>
                </div>

                {/* Prediction Results */}
                <div className="grid w-full gap-4 md:grid-cols-2">
                  {hourlyPrediction !== null && (
                    <div className="rounded-xl border border-[#0099cc]/30 bg-[#0099cc]/10 p-6 text-center">
                      <p className="text-sm font-medium text-gray-600">Predicted Hourly Ride Count</p>
                      <p className="mt-2 text-4xl font-bold text-[#0099cc]">{hourlyPrediction}</p>
                    </div>
                  )}
                  {dailyPrediction !== null && (
                    <div className="rounded-xl border border-[#00a651]/30 bg-[#00a651]/10 p-6 text-center">
                      <p className="text-sm font-medium text-gray-600">Predicted Daily Ride Count</p>
                      <p className="mt-2 text-4xl font-bold text-[#00a651]">{dailyPrediction}</p>
                    </div>
                  )}
                </div>

                {!extractedText && (
                  <p className="text-center text-sm text-gray-500">
                    Please upload a PDF and extract text before making predictions
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
