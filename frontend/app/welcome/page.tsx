"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  MessageSquare,
  Star,
  Info,
  BarChart3,
  TrendingUp,
  Target,
  FileText,
  Brain,
  Lightbulb,
  CalendarDays,
  CloudSun,
  Sunrise,
  Calendar,
  CloudRain,
  Sun,
  Building2,
  MapPin,
  Bike,
  Briefcase,
} from "lucide-react"

const features = [
  {
    title: "Predict Demand",
    description: "AI-powered bike demand forecasting",
    icon: Activity,
    href: "/predict",
  },
  {
    title: "Insights",
    description: "Analyze demand patterns and trends",
    icon: BarChart3,
    href: "/insights",
  },
  {
    title: "PDF Predictor",
    description: "Extract & predict from PDF data",
    icon: FileText,
    href: "/pdf-predictor",
  },
  {
    title: "Ask AI Assistant",
    description: "Get insights from our AI",
    icon: MessageSquare,
    href: "/assistant",
  },
  {
    title: "Reviews",
    description: "See what others are saying",
    icon: Star,
    href: "/reviews",
  },
  {
    title: "About",
    description: "Learn more about RideWise",
    icon: Info,
    href: "/about",
  },
]

const steps = [
  {
    title: "Provide Your Scenario",
    description: "Enter real conditions such as season, month, day of week, temperature, humidity, wind speed, weather, and whether it is a holiday or working day.",
    icon: CloudSun,
  },
  {
    title: "Context Analysis",
    description: "RideWise processes these inputs to understand how weather, time, and urban conditions influence bike usage.",
    icon: Brain,
  },
  {
    title: "Demand Estimation",
    description: "The system applies a trained regression model built from historical bike-sharing data to estimate expected bike rentals.",
    icon: TrendingUp,
  },
  {
    title: "Instant Results",
    description: "You receive a clear predicted bike demand count based on your inputs.",
    icon: Target,
  },
]

const differentiators = [
  {
    title: "Data-driven bike demand prediction",
    description: "Weather-based demand prediction powered by machine learning models.",
    icon: Brain,
  },
  {
    title: "Fast response based on real inputs",
    description: "Instant predictions leveraging historical bike-sharing data.",
    icon: Lightbulb,
  },
  {
    title: "Simple and understandable output",
    description: "Clear predicted demand counts without unnecessary visual complexity.",
    icon: CalendarDays,
  },
  {
    title: "Time-aware forecasting",
    description: "Season, month, and day-aware predictions with holiday and working-day sensitivity.",
    icon: FileText,
  },
]

const insights = [
  {
    text: "Weather-based demand prediction for instant bike rental forecasts.",
    icon: Sunrise,
  },
  {
    text: "Time-aware forecasting considering season, month, and day of week.",
    icon: Calendar,
  },
  {
    text: "Holiday and working-day sensitivity for accurate contextual predictions.",
    icon: CloudRain,
  },
  {
    text: "Reliable estimates using historical data and machine learning models.",
    icon: Sun,
  },
]

const userTypes = [
  {
    role: "Bike-sharing Operators",
    description: "Optimize fleet management and resource allocation with data-driven predictions.",
    icon: Bike,
  },
  {
    role: "Urban Transport Planners",
    description: "Design smarter cycling networks based on real demand patterns.",
    icon: Building2,
  },
  {
    role: "Smart City Mobility Teams",
    description: "Coordinate multi-modal transport and improve mobility outcomes.",
    icon: MapPin,
  },
  {
    role: "Sustainability & Transit Projects",
    description: "Measure and amplify the environmental impact of bike-sharing initiatives.",
    icon: Briefcase,
  },
]

const testimonials = [
  {
    quote: "RideWise increased our operational efficiency by 35% within the first month.",
    author: "Alex Chen, Bike Ops Manager",
  },
  {
    quote: "The predictions are incredibly accurate. It's transformed how we plan our logistics.",
    author: "Sarah Mitchell, City Planner",
  },
]

export default function WelcomePage() {
  const { logout } = useAuth()

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
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
            <h1 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,166,81,0.5)]">RideWise</h1>
            <ProfileDropdown />
          </div>
        </header>

        <div className="p-4">
          <div className="mx-auto max-w-6xl">
            {/* Hero Section - Improved hero copy */}
            <div className="py-12">
              <div className="mb-12 text-center">
                <h1 className="mb-4 text-5xl font-bold text-white drop-shadow-[0_0_20px_rgba(0,166,81,0.6)] md:text-6xl">
                  Welcome to <span className="text-[#00a651]">RideWise</span>
                </h1>
                <p className="mx-auto max-w-2xl text-balance text-xl text-gray-200 md:text-2xl">
                  Predict bike demand before it happens. Make smarter decisions with AI-powered mobility intelligence.
                </p>
              </div>

              {/* Features Section */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {features.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <Link key={feature.href} href={feature.href}>
                      <Card className="group h-full border-white/10 bg-white/95 shadow-xl backdrop-blur-xl transition-all hover:scale-105 hover:border-[#00a651]/50 hover:shadow-[0_0_30px_rgba(0,166,81,0.3)]">
                        <CardHeader className="items-center text-center">
                          <div className="mb-3 rounded-full bg-[#00a651]/10 p-4 shadow-lg transition-all group-hover:bg-[#00a651]/20 group-hover:shadow-[0_0_20px_rgba(0,166,81,0.4)]">
                            <Icon className="size-8 text-[#00a651]" />
                          </div>
                          <CardTitle className="text-gray-800">{feature.title}</CardTitle>
                          <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* How RideWise Works Section */}
            <section className="py-16">
              <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold text-white md:text-5xl">How RideWise Works</h2>
                <p className="mt-2 text-gray-300">Four simple steps from input to prediction</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, idx) => {
                  const Icon = step.icon
                  return (
                    <Card
                      key={idx}
                      className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl transition-all hover:scale-105 hover:border-[#00a651]/50 hover:shadow-[0_0_30px_rgba(0,166,81,0.3)]"
                    >
                      <CardHeader className="items-center text-center">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#00a651] text-xl font-bold text-white shadow-lg">
                          {idx + 1}
                        </div>
                        <CardTitle className="text-lg text-gray-800">{step.title}</CardTitle>
                        <CardDescription className="text-gray-600">{step.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  )
                })}
              </div>
            </section>

            <section className="py-16">
              <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold text-white md:text-5xl">What RideWise Delivers</h2>
                <p className="mt-2 text-gray-300">Key capabilities and capabilities that matter</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {differentiators.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <Card
                      key={idx}
                      className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl transition-all hover:scale-105 hover:border-[#0099cc]/50 hover:shadow-[0_0_30px_rgba(0,153,204,0.3)]"
                    >
                      <CardHeader className="items-center text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0099cc]/10 shadow-lg">
                          <Icon className="size-6 text-[#0099cc]" />
                        </div>
                        <CardTitle className="text-lg text-gray-800">{item.title}</CardTitle>
                        <CardDescription className="text-gray-600">{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  )
                })}
              </div>
            </section>

            <section className="py-16">
              <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold text-white md:text-5xl">Key Capabilities</h2>
                <p className="mt-2 text-gray-300">Predictive power built for real-world mobility</p>
              </div>
              <Card className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
                <CardHeader>
                  <div className="grid gap-4 md:grid-cols-2">
                    {insights.map((insight, idx) => {
                      const Icon = insight.icon
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-4 rounded-xl bg-gradient-to-r from-[#00a651]/5 to-[#0099cc]/5 p-4 transition-all hover:from-[#00a651]/10 hover:to-[#0099cc]/10"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00a651]/10">
                            <Icon className="size-5 text-[#00a651]" />
                          </div>
                          <p className="text-gray-700">{insight.text}</p>
                        </div>
                      )
                    })}
                  </div>
                </CardHeader>
              </Card>
            </section>

            <section className="py-16">
              <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold text-white md:text-5xl">Where RideWise Helps</h2>
                <p className="mt-2 text-gray-300">Empowering teams that shape urban mobility</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {userTypes.map((user, idx) => {
                  const Icon = user.icon
                  return (
                    <Card
                      key={idx}
                      className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl transition-all hover:scale-105 hover:border-[#00a651]/50 hover:shadow-[0_0_30px_rgba(0,166,81,0.3)]"
                    >
                      <CardHeader className="items-center text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#00a651]/10 shadow-lg">
                          <Icon className="size-6 text-[#00a651]" />
                        </div>
                        <CardTitle className="text-lg text-gray-800">{user.role}</CardTitle>
                        <CardDescription className="text-gray-600">{user.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  )
                })}
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16">
              <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold text-white md:text-5xl">What Users Say</h2>
                <p className="mt-2 text-gray-300">Real feedback from our community</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {testimonials.map((testimonial, idx) => (
                  <Card key={idx} className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
                    <CardHeader>
                      <p className="mb-4 text-lg italic text-gray-700">"{testimonial.quote}"</p>
                      <p className="text-sm font-medium text-[#00a651]">— {testimonial.author}</p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12">
              <div className="grid gap-8 md:grid-cols-4">
                <div>
                  <h3 className="mb-4 text-lg font-bold text-[#00a651]">RideWise</h3>
                  <p className="text-gray-300">AI-Powered Bike Demand Intelligence</p>
                </div>
                <div>
                  <h4 className="mb-4 font-semibold text-white">Product</h4>
                  <div className="space-y-2">
                    <Link href="/predict" className="block text-gray-300 hover:text-white">
                      Predict Demand
                    </Link>
                    <Link href="/insights" className="block text-gray-300 hover:text-white">
                      Insights
                    </Link>
                    <Link href="/assistant" className="block text-gray-300 hover:text-white">
                      AI Assistant
                    </Link>
                  </div>
                </div>
                <div>
                  <h4 className="mb-4 font-semibold text-white">Company</h4>
                  <div className="space-y-2">
                    <Link href="/about" className="block text-gray-300 hover:text-white">
                      About
                    </Link>
                    <Link href="/reviews" className="block text-gray-300 hover:text-white">
                      Reviews
                    </Link>
                    <a href="#" className="block text-gray-300 hover:text-white">
                      Contact
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="mb-4 font-semibold text-white">Legal</h4>
                  <div className="space-y-2">
                    <a href="#" className="block text-gray-300 hover:text-white">
                      Privacy
                    </a>
                    <a href="#" className="block text-gray-300 hover:text-white">
                      Terms
                    </a>
                    <a href="#" className="block text-gray-300 hover:text-white">
                      Cookies
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-white/10 pt-8 text-center">
                <p className="text-gray-400">© 2025 RideWise. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
