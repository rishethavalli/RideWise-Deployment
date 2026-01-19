"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { validatePassword } from "@/lib/password-validation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login, signup } = useAuth()
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [name, setName] = useState("") // Added name field for signup
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Real-time password validation
  const passwordValidation = useMemo(() => validatePassword(password), [password])

  // Check if passwords match for signup
  const passwordsMatch = password === confirmPassword

  const canSubmit = useMemo(() => {
    if (!email || !password) return false
    if (activeTab === "signup") {
      if (!name) return false
      if (!passwordValidation.isValid) return false
      if (!passwordsMatch) return false
    }
    return true
  }, [email, password, name, passwordValidation.isValid, activeTab, passwordsMatch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (activeTab === "signup") {
      if (!passwordValidation.isValid) {
        setLoginError("Password does not meet requirements.")
        return
      }
      if (!passwordsMatch) {
        setLoginError("Passwords do not match.")
        return
      }

      const result = signup(name, email, password)
      if (result.success) {
        router.push("/welcome")
      } else {
        setLoginError(result.error)
      }
    } else {
      const result = login(email, password)
      if (result.success) {
        router.push("/welcome")
      } else {
        setLoginError(result.error)
      }
    }
  }

  const ValidationItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-sm ${met ? "text-green-400" : "text-red-400"}`}>
      {met ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      <span>{text}</span>
    </div>
  )

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/background.png)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/65 to-slate-900/70" />
      </div>

      <Card className="w-full max-w-md border-white/20 bg-white/95 shadow-2xl backdrop-blur-xl transition-all hover:shadow-[0_0_40px_rgba(0,166,81,0.3)]">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-[#00a651] drop-shadow-[0_0_10px_rgba(0,166,81,0.5)]">
            RideWise
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <div className="mb-6 flex gap-2 rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => {
                setActiveTab("login")
                setLoginError("")
              }}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "login" ? "bg-[#00a651] text-white shadow-lg" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setActiveTab("signup")
                setLoginError("")
              }}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "signup" ? "bg-[#00a651] text-white shadow-lg" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "signup" && (
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2 text-gray-800 backdrop-blur-sm transition-all placeholder:text-gray-400 focus:border-[#00a651] focus:outline-none focus:ring-2 focus:ring-[#00a651]/50"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setLoginError("")
                }}
                className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2 text-gray-800 backdrop-blur-sm transition-all placeholder:text-gray-400 focus:border-[#00a651] focus:outline-none focus:ring-2 focus:ring-[#00a651]/50"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setLoginError("")
                }}
                className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2 text-gray-800 backdrop-blur-sm transition-all placeholder:text-gray-400 focus:border-[#00a651] focus:outline-none focus:ring-2 focus:ring-[#00a651]/50"
                placeholder="••••••••"
                required
              />
            </div>

            {activeTab === "signup" && password.length > 0 && (
              <div className="rounded-lg border border-gray-200 bg-white/90 p-3 space-y-1">
                <p className="text-xs font-medium text-gray-600 mb-2">Password Requirements:</p>
                <ValidationItem met={passwordValidation.hasMinLength} text="At least 8 characters" />
                <ValidationItem met={passwordValidation.hasUppercase} text="One uppercase letter (A-Z)" />
                <ValidationItem met={passwordValidation.hasLowercase} text="One lowercase letter (a-z)" />
                <ValidationItem met={passwordValidation.hasNumber} text="One number (0-9)" />
                <ValidationItem met={passwordValidation.hasSpecialChar} text="One special character (!@#$%)" />
              </div>
            )}

            {activeTab === "signup" && (
              <div>
                <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2 text-gray-800 backdrop-blur-sm transition-all placeholder:text-gray-400 focus:border-[#00a651] focus:outline-none focus:ring-2 focus:ring-[#00a651]/50"
                  placeholder="••••••••"
                  required
                />
                {confirmPassword && !passwordsMatch && (
                  <p className="mt-1 text-sm text-red-500">Passwords do not match.</p>
                )}
              </div>
            )}

            {/* Error message */}
            {loginError && (
              <div className="rounded-lg bg-red-100 border border-red-300 p-3 text-sm text-red-600">{loginError}</div>
            )}

            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full bg-[#00a651] text-white shadow-lg transition-all hover:bg-[#008c45] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
            >
              {activeTab === "login" ? "Login to RideWise" : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
