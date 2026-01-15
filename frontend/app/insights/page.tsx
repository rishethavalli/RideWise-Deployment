"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowLeft, TrendingUp, Calendar, Cloud } from "lucide-react"
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
    <div className="relative min-h-screen p-4">
      {/* Background image with overlay */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center blur-subtle brightness-110 contrast-110"
          style={{ backgroundImage: "url(/images/background.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/78 via-black/68 to-black/78" />
      </div>

      <div className="mx-auto max-w-6xl py-8">
        <Link href="/welcome">
          <Button variant="ghost" className="mb-6 text-foreground hover:bg-white/10">
            <ArrowLeft className="mr-2 size-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="mb-8 text-center text-4xl font-bold text-primary drop-shadow-[0_0_20px_rgba(60,242,255,0.8)]">
          Demand Insights
        </h1>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground/70">
                <TrendingUp className="size-4" />
                Peak Hour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">18:00</div>
              <p className="text-xs text-foreground/60">520 avg rides</p>
            </CardContent>
          </Card>

          <Card className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground/70">
                <Calendar className="size-4" />
                Busiest Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">Saturday</div>
              <p className="text-xs text-foreground/60">5,800 avg rides</p>
            </CardContent>
          </Card>

          <Card className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground/70">
                <Cloud className="size-4" />
                Best Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">Clear</div>
              <p className="text-xs text-foreground/60">5,200 avg rides</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {/* Average Demand by Hour */}
          <Card className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-foreground">Average Demand by Hour</CardTitle>
              <CardDescription className="text-foreground/70">
                Typical bike rental patterns throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  demand: {
                    label: "Rides",
                    color: "hsl(187, 96%, 62%)",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="hour" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="demand"
                      stroke="hsl(187, 96%, 62%)"
                      strokeWidth={2}
                      dot={{ fill: "hsl(187, 96%, 62%)", r: 3 }}
                      activeDot={{ r: 5, fill: "hsl(187, 96%, 62%)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Average Demand by Day of Week */}
          <Card className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-foreground">Average Demand by Day of Week</CardTitle>
              <CardDescription className="text-foreground/70">Weekly patterns in bike rental demand</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  demand: {
                    label: "Rides",
                    color: "hsl(187, 96%, 62%)",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="demand" fill="hsl(187, 96%, 62%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Weather Impact on Demand */}
          <Card className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-foreground">Impact of Weather on Demand</CardTitle>
              <CardDescription className="text-foreground/70">
                How different weather conditions affect bike rentals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  avgDemand: {
                    label: "Avg Rides",
                    color: "hsl(187, 96%, 62%)",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weatherData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis type="number" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                    <YAxis
                      dataKey="weather"
                      type="category"
                      stroke="rgba(255,255,255,0.5)"
                      tick={{ fill: "rgba(255,255,255,0.7)" }}
                      width={100}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="avgDemand" fill="hsl(187, 96%, 62%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Key Insights Summary */}
          <Card className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-foreground">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-primary">Rush hour peaks:</strong> Demand spikes during morning (7-9am) and
                    evening (5-7pm) commute hours, with 6pm being the busiest time.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-primary">Weekend boost:</strong> Saturday sees the highest demand at 5,800
                    rides, followed by Sunday at 5,200 rides.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-primary">Weather matters:</strong> Clear weather drives the most demand,
                    while heavy rain and snow reduce ridership by over 75%.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-primary">Late night lull:</strong> Demand drops significantly between 1-5am,
                    with the lowest point at 3am averaging only 25 rides.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
