"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export function BookingActions({ 
  bookingId, 
  currentStatus 
}: { 
  bookingId: string
  currentStatus: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (status: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      })

      if (res.ok) {
        router.refresh()
      } else {
        console.error("Failed to update status")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (currentStatus !== "PENDING") {
    return (
      <span className={`font-medium ${currentStatus === "CONFIRMED" ? "text-green-600" : "text-red-600"}`}>
        {currentStatus}
      </span>
    )
  }

  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant="outline" 
        className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700 h-8"
        onClick={() => handleUpdate("CONFIRMED")}
        disabled={loading}
      >
        <Check className="w-4 h-4 mr-1" />
        Accept
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700 h-8"
        onClick={() => handleUpdate("CANCELLED")}
        disabled={loading}
      >
        <X className="w-4 h-4 mr-1" />
        Reject
      </Button>
    </div>
  )
}
