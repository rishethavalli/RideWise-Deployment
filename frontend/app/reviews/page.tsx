"use client"

import type React from "react"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

type Review = {
  id: number
  name: string
  rating: number
  text: string
  date: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "RideWise has transformed how we manage our bike fleet. The predictions are incredibly accurate!",
      date: "2026-01-05",
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      text: "Great tool for urban planning. Helps us optimize bike station placement.",
      date: "2026-01-04",
    },
  ])
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return

    const newReview: Review = {
      id: Date.now(),
      name,
      rating,
      text,
      date: new Date().toISOString().split("T")[0],
    }

    setReviews((prev) => [newReview, ...prev])
    setName("")
    setRating(5)
    setText("")
  }

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
        <PageHeader title="Reviews" />

        <div className="mx-auto max-w-4xl p-4 py-8">
          <h1 className="mb-8 text-center text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,166,81,0.5)]">
            <span className="text-[#00a651]">Reviews</span>
          </h1>

          {/* Review Form - Updated card styling */}
          <Card className="mb-8 border-white/10 bg-white/95 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-gray-800">Leave a Review</CardTitle>
              <CardDescription className="text-gray-600">Share your experience with RideWise</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2 text-gray-800 backdrop-blur-sm transition-all placeholder:text-gray-400 focus:border-[#00a651] focus:outline-none focus:ring-2 focus:ring-[#00a651]/50"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`size-8 ${star <= rating ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="text" className="mb-2 block text-sm font-medium text-gray-700">
                    Review
                  </label>
                  <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2 text-gray-800 backdrop-blur-sm transition-all placeholder:text-gray-400 focus:border-[#00a651] focus:outline-none focus:ring-2 focus:ring-[#00a651]/50"
                    placeholder="Tell us about your experience..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-[#00a651] text-white shadow-lg hover:bg-[#008c45]">
                  Submit Review
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="border-white/10 bg-white/95 shadow-xl backdrop-blur-xl transition-all hover:border-[#00a651]/30 hover:shadow-[0_0_20px_rgba(0,166,81,0.3)]"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-800">{review.name}</CardTitle>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${i < review.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-gray-500">{review.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
