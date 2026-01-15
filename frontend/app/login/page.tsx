"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
    router.push("/welcome")
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      {/* Background image with overlay */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center blur-subtle brightness-110 contrast-110"
          style={{ backgroundImage: "url(/images/background.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/75" />
      </div>

      <Card className="w-full max-w-md border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl transition-all hover:shadow-[0_0_30px_rgba(60,242,255,0.4)]">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-primary drop-shadow-[0_0_20px_rgba(60,242,255,0.8)]">
            RideWise
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <div className="mb-6 flex gap-2 rounded-lg bg-black/30 p-1">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "login"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "signup"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-2 text-foreground backdrop-blur-sm transition-all placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-2 text-foreground backdrop-blur-sm transition-all placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="••••••••"
                required
              />
            </div>

            {activeTab === "signup" && (
              <div>
                <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-2 text-foreground backdrop-blur-sm transition-all placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground shadow-lg shadow-primary/50 transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(60,242,255,0.6)]"
            >
              Enter RideWise
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
