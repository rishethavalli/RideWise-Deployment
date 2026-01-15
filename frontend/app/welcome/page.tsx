"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  MessageSquare,
  Star,
  Info,
  LogOut,
  BarChart3,
  Zap,
  TrendingUp,
  Clock,
  Target,
  Users,
  Code,
  Database,
  Cpu,
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
    title: "Input Data",
    description: "Provide weather, time, historical data",
    icon: Database,
  },
  {
    title: "AI Processing",
    description: "Advanced ML models analyze patterns",
    icon: Cpu,
  },
  {
    title: "Demand Forecast",
    description: "Get accurate predictions",
    icon: TrendingUp,
  },
  {
    title: "Business Insights",
    description: "Actionable intelligence for decisions",
    icon: Target,
  },
]

const benefits = [
  {
    title: "Accurate Predictions",
    description: "State-of-the-art ML algorithms",
    icon: Zap,
  },
  {
    title: "Better Planning",
    description: "Optimize resource allocation",
    icon: Clock,
  },
  {
    title: "Reduced Losses",
    description: "Minimize operational inefficiencies",
    icon: TrendingUp,
  },
  {
    title: "Automation",
    description: "Streamlined workflows and reports",
    icon: Code,
  },
]

const insights = [
  "Peak demand occurs 2 hours after sunrise, increasing resource allocation needs.",
  "Weekend demand is 35% higher than weekdays in urban areas.",
  "Rainy weather reduces demand by 40-50%, enabling cost savings.",
  "Summer months show 60% increase in evening rides compared to winter.",
]

const userTypes = [
  { role: "Bike Operators", description: "Optimize fleet management" },
  { role: "City Planners", description: "Urban mobility planning" },
  { role: "Researchers", description: "Data-driven insights" },
  { role: "Startups", description: "Scalable solutions" },
]

const techStack = [
  { name: "Python", icon: "🐍" },
  { name: "Machine Learning", icon: "🤖" },
  { name: "FastAPI", icon: "⚡" },
  { name: "React", icon: "⚛️" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Cloud", icon: "☁️" },
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
      {/* Background image with overlay */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center blur-subtle brightness-110 contrast-110"
          style={{ backgroundImage: "url(/images/background.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/75" />
      </div>

      <div className="relative z-10 min-h-screen p-4">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="py-12">
            <div className="mb-12 text-center">
              <div className="relative">
                <Button
                  onClick={logout}
                  variant="ghost"
                  className="absolute right-0 top-0 text-foreground/70 hover:bg-white/10 hover:text-foreground"
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </Button>
                <h1 className="mb-4 text-6xl font-bold text-primary drop-shadow-[0_0_30px_rgba(60,242,255,0.9)] md:text-7xl">
                  RideWise
                </h1>
                <p className="text-balance text-xl text-foreground/80 md:text-2xl">
                  AI-Powered Bike Demand Intelligence
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Link key={feature.href} href={feature.href}>
                    <Card className="group h-full border-white/20 bg-white/10 shadow-xl backdrop-blur-xl transition-all hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(60,242,255,0.6)]">
                      <CardHeader className="items-center text-center">
                        <div className="mb-3 rounded-full bg-primary/20 p-4 shadow-lg shadow-primary/50 transition-all group-hover:bg-primary/30 group-hover:shadow-[0_0_20px_rgba(60,242,255,0.8)]">
                          <Icon className="size-8 text-primary" />
                        </div>
                        <CardTitle className="text-foreground">{feature.title}</CardTitle>
                        <CardDescription className="text-foreground/70">{feature.description}</CardDescription>
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
              <h2 className="text-4xl font-bold text-foreground md:text-5xl">How RideWise Works</h2>
              <p className="mt-2 text-foreground/70">Four simple steps to demand intelligence</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <Card
                    key={idx}
                    className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl transition-all hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(60,242,255,0.6)]"
                  >
                    <CardHeader className="items-center text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 shadow-lg shadow-primary/50">
                        <Icon className="size-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg text-foreground">{step.title}</CardTitle>
                      <CardDescription className="text-foreground/70">{step.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Why RideWise Section */}
          <section className="py-16">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-foreground md:text-5xl">Why RideWise</h2>
              <p className="mt-2 text-foreground/70">Benefits that drive real results</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon
                return (
                  <Card
                    key={idx}
                    className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl transition-all hover:scale-105 hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(200,120,60,0.4)]"
                  >
                    <CardHeader className="items-center text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20 shadow-lg shadow-secondary/50">
                        <Icon className="size-6 text-secondary" />
                      </div>
                      <CardTitle className="text-lg text-foreground">{benefit.title}</CardTitle>
                      <CardDescription className="text-foreground/70">{benefit.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Sample Insights Section */}
          <section className="py-16">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-foreground md:text-5xl">Sample Insights</h2>
              <p className="mt-2 text-foreground/70">Real patterns from demand data</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {insights.map((insight, idx) => (
                <Card key={idx} className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
                  <CardHeader>
                    <p className="text-foreground/90">{insight}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          {/* Who Uses RideWise Section */}
          <section className="py-16">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-foreground md:text-5xl">Who Uses RideWise</h2>
              <p className="mt-2 text-foreground/70">Solutions for different stakeholders</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {userTypes.map((user, idx) => (
                <Card
                  key={idx}
                  className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl transition-all hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(60,242,255,0.6)]"
                >
                  <CardHeader className="items-center text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 shadow-lg shadow-primary/50">
                      <Users className="size-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{user.role}</CardTitle>
                    <CardDescription className="text-foreground/70">{user.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          {/* Technology Stack Section */}
          <section className="py-16">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-foreground md:text-5xl">Technology Stack</h2>
              <p className="mt-2 text-foreground/70">Built with modern, powerful tools</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 shadow-xl backdrop-blur-xl transition-all hover:scale-110 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(60,242,255,0.4)]"
                >
                  <span className="text-xl">{tech.icon}</span>
                  <span className="text-sm font-medium text-foreground/90">{tech.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-foreground md:text-5xl">What Users Say</h2>
              <p className="mt-2 text-foreground/70">Real feedback from our community</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((testimonial, idx) => (
                <Card key={idx} className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
                  <CardHeader>
                    <p className="mb-4 text-lg italic text-foreground/90">"{testimonial.quote}"</p>
                    <p className="text-sm text-foreground/70">— {testimonial.author}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/20 py-12">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-4 text-lg font-bold text-primary">RideWise</h3>
                <p className="text-foreground/70">AI-Powered Bike Demand Intelligence</p>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-foreground">Product</h4>
                <div className="space-y-2">
                  <Link href="/predict" className="block text-foreground/70 hover:text-foreground">
                    Predict Demand
                  </Link>
                  <Link href="/insights" className="block text-foreground/70 hover:text-foreground">
                    Insights
                  </Link>
                  <Link href="/assistant" className="block text-foreground/70 hover:text-foreground">
                    AI Assistant
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-foreground">Company</h4>
                <div className="space-y-2">
                  <Link href="/about" className="block text-foreground/70 hover:text-foreground">
                    About
                  </Link>
                  <Link href="/reviews" className="block text-foreground/70 hover:text-foreground">
                    Reviews
                  </Link>
                  <a href="#" className="block text-foreground/70 hover:text-foreground">
                    Contact
                  </a>
                </div>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-foreground/70 hover:text-foreground">
                    Privacy
                  </a>
                  <a href="#" className="block text-foreground/70 hover:text-foreground">
                    Terms
                  </a>
                  <a href="#" className="block text-foreground/70 hover:text-foreground">
                    Cookies
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-white/20 pt-8 text-center">
              <p className="text-foreground/60">© 2025 RideWise. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
