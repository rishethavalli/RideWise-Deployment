"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Info, Sparkles, RotateCcw, Save, FolderOpen, Trash2 } from "lucide-react"
import { SeasonParticles } from "@/components/season-particles"
import { BikeIcon } from "@/components/bike-icon"
import { BikeLoader } from "@/components/bike-loader"
import { BackgroundBikes } from "@/components/background-bikes"

type PredictionMode = "daily" | "hourly"
type Season = "spring" | "summer" | "fall" | "winter"
type Weather = "clear" | "cloudy" | "rain" | "storm"

type SavedScenario = {
  id: string
  name: string
  timestamp: number
  mode: PredictionMode
  inputs: {
    season: Season
    month: number
    dayOfWeek: number
    hour: number
    temperature: number
    humidity: number
    windSpeed: number
    weather: Weather
    isHoliday: boolean
    isWorkingDay: boolean
  }
  prediction: number
}

export default function PredictPage() {
  const [mode, setMode] = useState<PredictionMode>("daily")
  const [season, setSeason] = useState<Season>("spring")
  const [month, setMonth] = useState(1)
  const [dayOfWeek, setDayOfWeek] = useState(0)
  const [hour, setHour] = useState(12)
  const [temperature, setTemperature] = useState(20)
  const [humidity, setHumidity] = useState(50)
  const [windSpeed, setWindSpeed] = useState(10)
  const [weather, setWeather] = useState<Weather>("clear")
  const [isHoliday, setIsHoliday] = useState(false)
  const [isWorkingDay, setIsWorkingDay] = useState(true)
  const [prediction, setPrediction] = useState<number | null>(null)

  const [animatedValue, setAnimatedValue] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [baselinePrediction, setBaselinePrediction] = useState<number | null>(null)
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([])
  const [showSaved, setShowSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [bikeAnimating, setBikeAnimating] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("ridewise-scenarios")
    if (saved) {
      setSavedScenarios(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (prediction === null) return

    const duration = 1500
    const steps = 60
    const increment = prediction / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= prediction) {
        setAnimatedValue(prediction)
        clearInterval(timer)
      } else {
        setAnimatedValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [prediction])

  const getInsightBadges = () => {
    const badges = []
    const predictedValue = prediction || 0

    if ((mode === "daily" && predictedValue > 5000) || (mode === "hourly" && predictedValue > 250)) {
      badges.push({ label: "Peak Demand", color: "bg-orange-500/20 text-orange-600 border-orange-500/50" })
    }

    if (weather === "rain" || weather === "storm") {
      badges.push({ label: "Weather Sensitive", color: "bg-blue-500/20 text-blue-600 border-blue-500/50" })
    }

    if (mode === "hourly" && ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19))) {
      badges.push({ label: "Commuter Hour", color: "bg-green-500/20 text-green-600 border-green-500/50" })
    }

    return badges
  }

  const getExplanationFactors = () => {
    const factors = []

    if (weather === "rain" || weather === "storm") {
      factors.push(`${weather === "rain" ? "Rain" : "Storm weather"} usually reduces riders significantly`)
    }

    if (mode === "hourly" && ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19))) {
      factors.push("Peak commute hours (8-10 AM, 5-7 PM) increase demand")
    }

    if (temperature > 30) {
      factors.push("High temperature (>30°C) reduces outdoor activity")
    }

    if (temperature < 5) {
      factors.push("Low temperature (<5°C) discourages cycling")
    }

    if (isHoliday) {
      factors.push("Holidays change commuting patterns")
    }

    if (!isWorkingDay) {
      factors.push("Non-working days typically have lower commuter demand")
    }

    if (season === "winter") {
      factors.push("Winter season generally sees reduced bike usage")
    }

    if (season === "summer" && weather === "clear") {
      factors.push("Summer with clear weather is ideal for cycling")
    }

    if (factors.length === 0) {
      factors.push("Conditions are moderate with no extreme factors")
    }

    return factors
  }

  const handlePredict = () => {
    setIsLoading(true)
    setBikeAnimating(true)

    setTimeout(() => {
      const basePrediction = mode === "daily" ? 4500 : 180
      const seasonMultiplier = { spring: 1.1, summer: 1.3, fall: 1.0, winter: 0.7 }
      const weatherMultiplier = { clear: 1.2, cloudy: 1.0, rain: 0.7, storm: 0.4 }

      const predicted = Math.round(
        basePrediction *
          seasonMultiplier[season] *
          weatherMultiplier[weather] *
          (temperature / 20) *
          (isWorkingDay ? 1.2 : 0.8) *
          (isHoliday ? 0.9 : 1.0),
      )

      if (baselinePrediction === null) {
        setBaselinePrediction(predicted)
      }

      setPrediction(predicted)
      setIsLoading(false)

      setTimeout(() => setBikeAnimating(false), 600)
    }, 1200)
  }

  const handleCompareScenario = () => {
    if (baselinePrediction !== null) {
      setShowComparison(true)
    }
  }

  const handleResetComparison = () => {
    setBaselinePrediction(null)
    setShowComparison(false)
    setPrediction(null)
  }

  const handleSaveScenario = () => {
    if (prediction === null) return

    const scenario: SavedScenario = {
      id: Date.now().toString(),
      name: `Scenario ${savedScenarios.length + 1}`,
      timestamp: Date.now(),
      mode,
      inputs: {
        season,
        month,
        dayOfWeek,
        hour,
        temperature,
        humidity,
        windSpeed,
        weather,
        isHoliday,
        isWorkingDay,
      },
      prediction,
    }

    const updated = [...savedScenarios, scenario]
    setSavedScenarios(updated)
    localStorage.setItem("ridewise-scenarios", JSON.stringify(updated))
  }

  const loadScenario = (scenario: SavedScenario) => {
    setMode(scenario.mode)
    setSeason(scenario.inputs.season)
    setMonth(scenario.inputs.month)
    setDayOfWeek(scenario.inputs.dayOfWeek)
    setHour(scenario.inputs.hour)
    setTemperature(scenario.inputs.temperature)
    setHumidity(scenario.inputs.humidity)
    setWindSpeed(scenario.inputs.windSpeed)
    setWeather(scenario.inputs.weather)
    setIsHoliday(scenario.inputs.isHoliday)
    setIsWorkingDay(scenario.inputs.isWorkingDay)
    setPrediction(scenario.prediction)
  }

  const deleteScenario = (id: string) => {
    const updated = savedScenarios.filter((s) => s.id !== id)
    setSavedScenarios(updated)
    localStorage.setItem("ridewise-scenarios", JSON.stringify(updated))
  }

  const badges = prediction !== null ? getInsightBadges() : []
  const explanationFactors = prediction !== null ? getExplanationFactors() : []
  const difference =
    showComparison && baselinePrediction !== null && prediction !== null ? prediction - baselinePrediction : 0

  const isHighDemand =
    prediction !== null && ((mode === "daily" && prediction > 5000) || (mode === "hourly" && prediction > 250))

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/background.png)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/65 to-slate-900/70" />
      </div>

      <BackgroundBikes />
      <SeasonParticles season={season} />

      <div className="relative z-10 min-h-screen">
        <PageHeader title="Predict Demand" />

        <div className="mx-auto max-w-4xl p-4 py-8">
          <h1 className="mb-8 text-center text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,166,81,0.5)]">
            Predict <span className="text-[#00a651]">Demand</span>
          </h1>

          <Card className="border-white/10 bg-white/95 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              {/* Tabs */}
              <div className="mb-4 flex gap-2 rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setMode("daily")}
                  className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                    mode === "daily" ? "bg-[#00a651] text-white shadow-lg" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setMode("hourly")}
                  className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                    mode === "hourly" ? "bg-[#00a651] text-white shadow-lg" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Hourly
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Season */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Season</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["spring", "summer", "fall", "winter"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeason(s)}
                      className={`rounded-lg border px-3 py-2 text-sm capitalize transition-all ${
                        season === s
                          ? "border-[#00a651] bg-[#00a651]/20 text-[#00a651] shadow-lg"
                          : "border-gray-300 bg-white/50 text-gray-600 hover:border-[#00a651]/50 hover:text-gray-800"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Month & Day */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Month</label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2 text-gray-800 backdrop-blur-sm transition-all focus:border-[#00a651] focus:outline-none focus:ring-2 focus:ring-[#00a651]/50"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {new Date(2024, i).toLocaleString("default", { month: "long" })}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Day of Week</label>
                  <select
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2 text-gray-800 backdrop-blur-sm transition-all focus:border-[#00a651] focus:outline-none focus:ring-2 focus:ring-[#00a651]/50"
                  >
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, i) => (
                      <option key={i} value={i}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Hour (for hourly mode) */}
              {mode === "hourly" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Hour (0–23)</label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={hour}
                    onChange={(e) => setHour(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2 text-gray-800 backdrop-blur-sm transition-all focus:border-[#00a651] focus:outline-none focus:ring-2 focus:ring-[#00a651]/50"
                  />
                </div>
              )}

              {/* Sliders */}
              <div>
                <label className="mb-2 flex justify-between text-sm font-medium text-gray-700">
                  <span>Temperature (°C)</span>
                  <span className="text-[#00a651]">{temperature}°C</span>
                </label>
                <input
                  type="range"
                  min="-10"
                  max="40"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#00a651]"
                />
              </div>

              <div>
                <label className="mb-2 flex justify-between text-sm font-medium text-gray-700">
                  <span>Humidity (%)</span>
                  <span className="text-[#00a651]">{humidity}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={humidity}
                  onChange={(e) => setHumidity(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#00a651]"
                />
              </div>

              <div>
                <label className="mb-2 flex justify-between text-sm font-medium text-gray-700">
                  <span>Wind Speed (km/h)</span>
                  <span className="text-[#00a651]">{windSpeed} km/h</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#00a651]"
                />
              </div>

              {/* Weather */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Weather</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["clear", "cloudy", "rain", "storm"] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeather(w)}
                      className={`rounded-lg border px-3 py-2 text-sm capitalize transition-all ${
                        weather === w
                          ? "border-[#00a651] bg-[#00a651]/20 text-[#00a651] shadow-lg"
                          : "border-gray-300 bg-white/50 text-gray-600 hover:border-[#00a651]/50 hover:text-gray-800"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white/50 px-4 py-3">
                  <span className="text-sm font-medium text-gray-700">Holiday</span>
                  <input
                    type="checkbox"
                    checked={isHoliday}
                    onChange={(e) => setIsHoliday(e.target.checked)}
                    className="size-5 cursor-pointer accent-[#00a651]"
                  />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white/50 px-4 py-3">
                  <span className="text-sm font-medium text-gray-700">Working Day</span>
                  <input
                    type="checkbox"
                    checked={isWorkingDay}
                    onChange={(e) => setIsWorkingDay(e.target.checked)}
                    className="size-5 cursor-pointer accent-[#00a651]"
                  />
                </label>
              </div>

              <Button
                onClick={handlePredict}
                disabled={isLoading}
                className="w-full bg-[#00a651] text-white shadow-lg hover:bg-[#008c45] disabled:opacity-50"
              >
                <BikeIcon isAnimating={bikeAnimating} />
                <span className="ml-2">Predict {mode === "daily" ? "Daily" : "Hourly"} Demand</span>
              </Button>

              {isLoading && (
                <div className="animate-in fade-in duration-300">
                  <BikeLoader />
                </div>
              )}

              {prediction !== null && !isLoading && (
                <div className="mt-6 space-y-4">
                  <div
                    className={`rounded-lg border border-[#00a651]/50 bg-[#00a651]/10 p-6 text-center shadow-lg backdrop-blur-sm animate-in fade-in duration-500`}
                  >
                    <p className="mb-2 text-sm font-medium text-gray-600">Predicted Demand</p>
                    <p className="text-5xl font-bold text-[#00a651] transition-all duration-300">
                      {animatedValue.toLocaleString()}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      {mode === "daily" ? "rides per day" : "rides per hour"}
                    </p>

                    {/* Insight badges */}
                    {badges.length > 0 && (
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {badges.map((badge, idx) => (
                          <span
                            key={idx}
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${badge.color}`}
                          >
                            <Sparkles className="size-3" />
                            {badge.label}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Comparison */}
                    {showComparison && baselinePrediction !== null && difference !== 0 && (
                      <div className="mt-4 text-sm">
                        <span className={difference > 0 ? "text-green-600" : "text-red-600"}>
                          {difference > 0 ? "+" : ""}
                          {difference.toLocaleString()} ({((difference / baselinePrediction) * 100).toFixed(1)}%)
                        </span>
                        <span className="text-gray-500"> vs baseline</span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      <Info className="mr-1 size-4" />
                      {showExplanation ? "Hide" : "Show"} Explanation
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCompareScenario}
                      className="border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent"
                    >
                      <RotateCcw className="mr-1 size-4" />
                      Compare
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSaveScenario}
                      className="border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent"
                    >
                      <Save className="mr-1 size-4" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSaved(!showSaved)}
                      className="border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      <FolderOpen className="mr-1 size-4" />
                      Load
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResetComparison}
                      className="border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent"
                    >
                      <Trash2 className="mr-1 size-4" />
                      Reset
                    </Button>
                  </div>

                  {/* Explanation panel */}
                  {showExplanation && (
                    <div className="rounded-lg border border-gray-200 bg-white/70 p-4 text-sm">
                      <h4 className="mb-2 font-semibold text-gray-800">Factors affecting this prediction:</h4>
                      <ul className="space-y-1 text-gray-600">
                        {explanationFactors.map((factor, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#00a651]" />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Saved scenarios */}
                  {showSaved && savedScenarios.length > 0 && (
                    <div className="rounded-lg border border-gray-200 bg-white/70 p-4">
                      <h4 className="mb-3 font-semibold text-gray-800">Saved Scenarios</h4>
                      <div className="space-y-2">
                        {savedScenarios.map((scenario) => (
                          <div
                            key={scenario.id}
                            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white/50 p-3"
                          >
                            <div>
                              <p className="font-medium text-gray-800">{scenario.name}</p>
                              <p className="text-xs text-gray-500">
                                {scenario.mode} - {scenario.prediction.toLocaleString()} rides
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => loadScenario(scenario)}
                                className="text-[#00a651] hover:bg-[#00a651]/10"
                              >
                                Load
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteScenario(scenario.id)}
                                className="text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
