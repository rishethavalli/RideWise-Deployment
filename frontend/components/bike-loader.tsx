"use client"

export function BikeLoader() {
  return (
    <div className="relative h-8 w-full overflow-hidden">
      {/* Progress line */}
      <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-primary/20" />
      <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 blur-sm" />

      {/* Animated bike */}
      <div className="animate-bike-ride absolute top-1/2 -translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary drop-shadow-[0_0_12px_rgba(60,242,255,0.9)]"
        >
          <circle cx="18.5" cy="17.5" r="3.5" />
          <circle cx="5.5" cy="17.5" r="3.5" />
          <circle cx="15" cy="5" r="1" />
          <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
        </svg>
      </div>
    </div>
  )
}
