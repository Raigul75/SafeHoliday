"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

import { useSession } from "next-auth/react"

export default function NewEventPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Meetup",
    date: "",
    price: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        // @ts-ignore
        if (session?.user?.role === "CURATOR") {
          router.push("/curator")
        } else {
          router.push("/dashboard")
        }
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.message || "Failed to create event")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Event</h1>
        
        {error && <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-(--color-primary) focus:border-(--color-primary)"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Hiking in Burabay"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-(--color-primary) focus:border-(--color-primary)"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the experience..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-(--color-primary) focus:border-(--color-primary)"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option>Meetup</option>
                <option>Active</option>
                <option>Weekend Trip</option>
                <option>Culture & Food</option>
                <option>Real Family Event</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-(--color-primary) focus:border-(--color-primary)"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                placeholder="e.g. Oct 25, 10:00 AM"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formData.category === "Real Family Event" ? "Cultural Contribution (e.g. 15,000 ₸)" : "Price"}
            </label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-(--color-primary) focus:border-(--color-primary)"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
              placeholder="e.g. 15,000 ₸ or Free"
            />
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <Button 
              variant="outline" 
              type="button" 
              // @ts-ignore
              onClick={() => router.push(session?.user?.role === "CURATOR" ? "/curator" : "/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Publishing..." : "Publish Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
