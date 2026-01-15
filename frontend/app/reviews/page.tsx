"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Star } from "lucide-react"

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
    <div className="relative min-h-screen p-4">
      {/* Background image with overlay */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{ backgroundImage: "url(/images/background.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      </div>

      <div className="mx-auto max-w-4xl py-8">
        <Link href="/welcome">
          <Button variant="ghost" className="mb-6 text-foreground hover:bg-white/10">
            <ArrowLeft className="mr-2 size-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="mb-8 text-center text-4xl font-bold text-primary drop-shadow-[0_0_20px_rgba(60,242,255,0.8)]">
          Reviews
        </h1>

        {/* Review Form */}
        <Card className="mb-8 border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-foreground">Leave a Review</CardTitle>
            <CardDescription className="text-foreground/70">Share your experience with RideWise</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-2 text-foreground backdrop-blur-sm transition-all placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`size-8 ${
                          star <= rating
                            ? "fill-secondary text-secondary drop-shadow-[0_0_10px_rgba(255,150,60,0.8)]"
                            : "text-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="text" className="mb-2 block text-sm font-medium text-foreground">
                  Review
                </label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-2 text-foreground backdrop-blur-sm transition-all placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Tell us about your experience..."
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground shadow-lg shadow-primary/50 transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(60,242,255,0.6)]"
              >
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
              className="border-white/20 bg-white/10 shadow-xl backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-[0_0_20px_rgba(60,242,255,0.4)]"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">{review.name}</CardTitle>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < review.rating ? "fill-secondary text-secondary" : "text-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <CardDescription className="text-foreground/70">{review.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
