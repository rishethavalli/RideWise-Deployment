"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Brain, Database, Zap } from "lucide-react"

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
        <PageHeader title="About RideWise" />

        <div className="mx-auto max-w-4xl p-4 py-8">
          <h1 className="mb-8 text-center text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,166,81,0.5)]">
            About <span className="text-[#00a651]">RideWise</span>
          </h1>

          {/* Main Card - Updated card styling */}
          <Card className="mb-8 border-white/10 bg-white/95 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Intelligent Urban Mobility</CardTitle>
              <CardDescription className="text-gray-600">
                Transforming bike sharing with AI-powered demand forecasting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                RideWise is an advanced AI platform designed to revolutionize bike sharing operations through accurate
                demand prediction. Our machine learning models analyze multiple factors to help cities and operators
                optimize their services.
              </p>
              <p>
                By leveraging historical data, weather patterns, seasonal trends, and real-time conditions, RideWise
                provides actionable insights that improve service availability, reduce operational costs, and enhance
                user satisfaction.
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
                  className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl transition-all hover:border-[#00a651]/30 hover:shadow-[0_0_20px_rgba(0,166,81,0.3)]"
                >
                  <CardHeader>
                    <div className="mb-3 inline-flex rounded-full bg-[#00a651]/10 p-3 shadow-lg">
                      <Icon className="size-6 text-[#00a651]" />
                    </div>
                    <CardTitle className="text-gray-800">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>

          {/* Benefits Card */}
          <Card className="border-white/10 bg-white/95 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-gray-800">Why Choose RideWise?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#00a651]/20 text-xs text-[#00a651]">
                    ✓
                  </span>
                  <span>
                    <strong className="text-[#00a651]">Reduce Empty Stations:</strong> Predict high-demand areas to
                    ensure bikes are always available
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#00a651]/20 text-xs text-[#00a651]">
                    ✓
                  </span>
                  <span>
                    <strong className="text-[#00a651]">Optimize Fleet Size:</strong> Right-size your fleet based on
                    predicted demand patterns
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#00a651]/20 text-xs text-[#00a651]">
                    ✓
                  </span>
                  <span>
                    <strong className="text-[#00a651]">Improve User Satisfaction:</strong> Ensure bikes are available
                    when and where users need them
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#00a651]/20 text-xs text-[#00a651]">
                    ✓
                  </span>
                  <span>
                    <strong className="text-[#00a651]">Lower Operational Costs:</strong> Reduce unnecessary bike
                    redistribution and maintenance
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
