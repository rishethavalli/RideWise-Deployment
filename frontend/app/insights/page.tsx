"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Calendar, Cloud } from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Mock data for average demand by hour
const hourlyData = [
  { hour: "0", demand: 85 },
  { hour: "1", demand: 45 },
  { hour: "2", demand: 30 },
  { hour: "3", demand: 25 },
  { hour: "4", demand: 35 },
  { hour: "5", demand: 120 },
  { hour: "6", demand: 280 },
  { hour: "7", demand: 420 },
  { hour: "8", demand: 520 },
  { hour: "9", demand: 380 },
  { hour: "10", demand: 290 },
  { hour: "11", demand: 260 },
  { hour: "12", demand: 310 },
  { hour: "13", demand: 280 },
  { hour: "14", demand: 240 },
  { hour: "15", demand: 270 },
  { hour: "16", demand: 350 },
  { hour: "17", demand: 480 },
  { hour: "18", demand: 510 },
  { hour: "19", demand: 420 },
  { hour: "20", demand: 310 },
  { hour: "21", demand: 220 },
  { hour: "22", demand: 160 },
  { hour: "23", demand: 120 },
]

// Mock data for average demand by day of week
const weeklyData = [
  { day: "Mon", demand: 4200 },
  { day: "Tue", demand: 4350 },
  { day: "Wed", demand: 4500 },
  { day: "Thu", demand: 4480 },
  { day: "Fri", demand: 4650 },
  { day: "Sat", demand: 5800 },
  { day: "Sun", demand: 5200 },
]

// Mock data for weather impact
const weatherData = [
  { weather: "Clear", avgDemand: 5200 },
  { weather: "Partly Cloudy", avgDemand: 4800 },
  { weather: "Cloudy", avgDemand: 4200 },
  { weather: "Light Rain", avgDemand: 2800 },
  { weather: "Heavy Rain", avgDemand: 1200 },
  { weather: "Snow", avgDemand: 800 },
]

export default function InsightsPage() {
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
        <PageHeader title="Demand Insights" />

        <div className="mx-auto max-w-6xl p-4 py-8">
          <h1 className="mb-8 text-center text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,166,81,0.5)]">
            Demand <span className="text-[#00a651]">Insights</span>
          </h1>

          {/* Summary Cards - Updated card styling */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <TrendingUp className="size-4" />
                  Peak Hour
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#00a651]">18:00</div>
                <p className="text-xs text-gray-500">520 avg rides</p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Calendar className="size-4" />
                  Busiest Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#00a651]">Saturday</div>
                <p className="text-xs text-gray-500">5,800 avg rides</p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Cloud className="size-4" />
                  Best Weather
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#00a651]">Clear</div>
                <p className="text-xs text-gray-500">5,200 avg rides</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts - Updated card styling */}
          <div className="space-y-6">
            {/* Average Demand by Hour */}
            <Card className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-gray-800">Average Demand by Hour</CardTitle>
                <CardDescription className="text-gray-600">
                  Typical bike rental patterns throughout the day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    demand: {
                      label: "Rides",
                      color: "#00a651",
                    },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis dataKey="hour" stroke="rgba(0,0,0,0.5)" tick={{ fill: "rgba(0,0,0,0.7)" }} />
                      <YAxis stroke="rgba(0,0,0,0.5)" tick={{ fill: "rgba(0,0,0,0.7)" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="demand"
                        stroke="#00a651"
                        strokeWidth={2}
                        dot={{ fill: "#00a651", r: 3 }}
                        activeDot={{ r: 5, fill: "#00a651" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Average Demand by Day of Week */}
            <Card className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-gray-800">Average Demand by Day of Week</CardTitle>
                <CardDescription className="text-gray-600">Weekly patterns in bike rental demand</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    demand: {
                      label: "Rides",
                      color: "#00a651",
                    },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis dataKey="day" stroke="rgba(0,0,0,0.5)" tick={{ fill: "rgba(0,0,0,0.7)" }} />
                      <YAxis stroke="rgba(0,0,0,0.5)" tick={{ fill: "rgba(0,0,0,0.7)" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="demand" fill="#00a651" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Weather Impact on Demand */}
            <Card className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-gray-800">Impact of Weather on Demand</CardTitle>
                <CardDescription className="text-gray-600">
                  How different weather conditions affect bike rentals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    avgDemand: {
                      label: "Avg Rides",
                      color: "#0099cc",
                    },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weatherData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis type="number" stroke="rgba(0,0,0,0.5)" tick={{ fill: "rgba(0,0,0,0.7)" }} />
                      <YAxis
                        dataKey="weather"
                        type="category"
                        stroke="rgba(0,0,0,0.5)"
                        tick={{ fill: "rgba(0,0,0,0.7)" }}
                        width={100}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="avgDemand" fill="#0099cc" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Key Insights Summary */}
            <Card className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-gray-800">Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#00a651]" />
                    <span>
                      <strong className="text-[#00a651]">Rush hour peaks:</strong> Demand spikes during morning (7-9am)
                      and evening (5-7pm) commute hours, with 6pm being the busiest time.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#00a651]" />
                    <span>
                      <strong className="text-[#00a651]">Weekend boost:</strong> Saturday sees the highest demand at
                      5,800 rides, followed by Sunday at 5,200 rides.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#00a651]" />
                    <span>
                      <strong className="text-[#00a651]">Weather matters:</strong> Clear weather drives the most demand,
                      while heavy rain and snow reduce ridership by over 75%.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#00a651]" />
                    <span>
                      <strong className="text-[#00a651]">Late night lull:</strong> Demand drops significantly between
                      1-5am, with the lowest point at 3am averaging only 25 rides.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
