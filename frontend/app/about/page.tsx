"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BarChart3, Brain, Database, Zap } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms analyze patterns to forecast bike demand with high accuracy.",
    },
    {
      icon: Database,
      title: "Rich Historical Data",
      description: "Trained on years of bike sharing data including weather, seasonality, and usage patterns.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Get instant predictions and insights to optimize your bike sharing operations.",
    },
    {
      icon: Zap,
      title: "Actionable Insights",
      description: "Make data-driven decisions about fleet management, station placement, and resource allocation.",
    },
  ]

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

      <div className="mx-auto max-w-4xl py-8">
        <Link href="/welcome">
          <Button variant="ghost" className="mb-6 text-foreground hover:bg-white/10">
            <ArrowLeft className="mr-2 size-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="mb-8 text-center text-4xl font-bold text-primary drop-shadow-[0_0_20px_rgba(60,242,255,0.8)]">
          About RideWise
        </h1>

        {/* Main Card */}
        <Card className="mb-8 border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Intelligent Urban Mobility</CardTitle>
            <CardDescription className="text-foreground/70">
              Transforming bike sharing with AI-powered demand forecasting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/80">
            <p>
              RideWise is an advanced AI platform designed to revolutionize bike sharing operations through accurate
              demand prediction. Our machine learning models analyze multiple factors to help cities and operators
              optimize their services.
            </p>
            <p>
              By leveraging historical data, weather patterns, seasonal trends, and real-time conditions, RideWise
              provides actionable insights that improve service availability, reduce operational costs, and enhance user
              satisfaction.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-[0_0_20px_rgba(60,242,255,0.4)]"
              >
                <CardHeader>
                  <div className="mb-3 inline-flex rounded-full bg-primary/20 p-3 shadow-lg shadow-primary/50">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                  <CardDescription className="text-foreground/70">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        {/* Benefits Card */}
        <Card className="border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-foreground">Why Choose RideWise?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs text-primary">
                  ✓
                </span>
                <span>
                  <strong className="text-primary">Reduce Empty Stations:</strong> Predict high-demand areas to ensure
                  bikes are always available
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs text-primary">
                  ✓
                </span>
                <span>
                  <strong className="text-primary">Optimize Fleet Size:</strong> Right-size your fleet based on
                  predicted demand patterns
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs text-primary">
                  ✓
                </span>
                <span>
                  <strong className="text-primary">Improve User Satisfaction:</strong> Ensure bikes are available when
                  and where users need them
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs text-primary">
                  ✓
                </span>
                <span>
                  <strong className="text-primary">Lower Operational Costs:</strong> Reduce unnecessary bike
                  redistribution and maintenance
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
