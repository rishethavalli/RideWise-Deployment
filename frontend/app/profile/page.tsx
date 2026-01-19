"use client"

import { PageHeader } from "@/components/page-header"
import { useUser } from "@/lib/user-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, Shield } from "lucide-react"

export default function ProfilePage() {
  const { user } = useUser()

  const profileFields = [
    { label: "Full Name", value: user?.name || "N/A", icon: User },
    { label: "Email Address", value: user?.email || "N/A", icon: Mail },
    { label: "Phone Number", value: user?.phone || "N/A", icon: Phone },
    { label: "Role", value: user?.role || "RideWise User", icon: Shield },
  ]

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
        <PageHeader title="Profile" />

        <main className="mx-auto max-w-2xl p-4 py-8">
          <Card className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl">
            <CardHeader className="text-center">
              {/* Avatar */}
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#00a651]/10 shadow-lg">
                <User className="h-12 w-12 text-[#00a651]" />
              </div>
              <CardTitle className="text-2xl text-gray-800">{user?.name || "User"}</CardTitle>
              <p className="text-gray-600">{user?.role || "RideWise User"}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileFields.map((field, idx) => {
                const Icon = field.icon
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 rounded-lg border border-gray-200/50 bg-white/50 p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00a651]/10">
                      <Icon className="h-5 w-5 text-[#00a651]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{field.label}</p>
                      <p className="font-medium text-gray-800">{field.value}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
