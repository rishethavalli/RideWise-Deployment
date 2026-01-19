"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useUser } from "@/lib/user-context"
import { User, Settings, LogOut } from "lucide-react"

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { logout } = useAuth()
  const { user } = useUser()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Avatar Button - Updated colors for light background */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#00a651]/50 bg-[#00a651]/10 text-[#00a651] shadow-lg transition-all hover:border-[#00a651] hover:bg-[#00a651]/20"
        aria-label="Open profile menu"
      >
        <User className="h-5 w-5" />
      </button>

      {/* Dropdown Menu - Updated colors for light background */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 min-w-[280px] overflow-hidden rounded-xl border border-gray-200 bg-white/95 shadow-2xl backdrop-blur-xl">
          {/* User Card */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00a651]/10 text-[#00a651]">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user?.name || "User"}</p>
                <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
              </div>
            </div>
          </div>

          {/* Menu Options */}
          <div className="p-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            <button
              onClick={() => {
                setIsOpen(false)
                logout()
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
