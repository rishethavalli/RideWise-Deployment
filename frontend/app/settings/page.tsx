"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Lock, Palette, Globe } from "lucide-react"

export default function SettingsPage() {
  const settingsGroups = [
    {
      title: "Notifications",
      icon: Bell,
      description: "Manage your notification preferences",
    },
    {
      title: "Privacy & Security",
      icon: Lock,
      description: "Control your account security settings",
    },
    {
      title: "Appearance",
      icon: Palette,
      description: "Customize the look and feel",
    },
    {
      title: "Language & Region",
      icon: Globe,
      description: "Set your preferred language and timezone",
    },
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
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/50 to-white/60" />
      </div>

      <div className="relative z-10 min-h-screen">
        <PageHeader title="Settings" />

        <main className="mx-auto max-w-2xl p-4 py-8">
          <Card className="border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {settingsGroups.map((group, idx) => {
                const Icon = group.icon
                return (
                  <button
                    key={idx}
                    className="flex w-full items-center gap-4 rounded-lg border border-gray-200/50 bg-white/50 p-4 text-left transition-all hover:border-[#00a651]/50 hover:bg-white/80"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00a651]/10">
                      <Icon className="h-5 w-5 text-[#00a651]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{group.title}</p>
                      <p className="text-sm text-gray-500">{group.description}</p>
                    </div>
                  </button>
                )
              })}
              <p className="pt-4 text-center text-sm text-gray-500">Settings functionality coming soon</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
