"use client"

import Link from "next/link"
import { ProfileDropdown } from "./profile-dropdown"
import { ArrowLeft } from "lucide-react"

interface PageHeaderProps {
  title?: string
  showBack?: boolean
  backHref?: string
}

export function PageHeader({ title = "RideWise", showBack = true, backHref = "/welcome" }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {showBack && (
            <Link href={backHref} className="flex items-center gap-2 text-gray-300 transition-colors hover:text-white">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          )}
          <h1 className="text-xl font-bold text-white drop-shadow-[0_0_5px_rgba(0,166,81,0.3)]">{title}</h1>
        </div>
        <ProfileDropdown />
      </div>
    </header>
  )
}
