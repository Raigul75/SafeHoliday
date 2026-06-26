"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function ModerationActions({ eventId, currentStatus }: { eventId: string, currentStatus: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleAction = async (status: "APPROVED" | "REJECTED") => {
    if (!confirm(`Are you sure you want to mark this event as ${status}?`)) return
    
    setLoading(true)
    try {
      const res = await fetch(`/api/events/${eventId}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert("Failed to update status")
      }
    } catch (err) {
      alert("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (currentStatus !== "PENDING") return null

  return (
    <div className="flex items-center gap-2">
      <Button 
        size="sm" 
        onClick={() => handleAction("APPROVED")} 
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        Approve
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => handleAction("REJECTED")} 
        disabled={loading}
        className="text-red-600 hover:bg-red-50"
      >
        Reject
      </Button>
    </div>
  )
}
