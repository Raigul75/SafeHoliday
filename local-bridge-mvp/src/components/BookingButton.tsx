"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function BookingButton({ eventId }: { eventId: string }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleBook = async () => {
    if (!session) {
      router.push("/login")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId })
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => router.push("/dashboard"), 2000)
      } else {
        alert("Failed to book the event. Please try again.")
      }
    } catch (err) {
      alert("An error occurred.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-lg px-8" disabled>
        Successfully Booked! Redirecting...
      </Button>
    )
  }

  return (
    <Button 
      size="lg" 
      onClick={handleBook} 
      disabled={loading}
      className="w-full sm:w-auto text-lg px-8 shadow-xl shadow-black/20"
    >
      {loading ? "Booking..." : "Book This Experience"}
    </Button>
  )
}
