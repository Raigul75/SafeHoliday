import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ModerationActions } from "@/components/ModerationActions"

export default async function CuratorDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || session.user.role !== "CURATOR") {
    redirect("/")
  }

  const events = await prisma.event.findMany({
    include: { host: true, bookings: true },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Curator Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage events and community members</p>
        </div>
        <a href="/dashboard/new-event" className="bg-(--color-primary) text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-opacity">
          + Create Platform Event
        </a>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map(event => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{event.title}</div>
                  <div className="text-sm text-gray-500">{event.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{event.host?.name || "Safe Holiday (Platform)"}</div>
                  <div className="text-sm text-gray-500">{event.host?.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={event.status === "APPROVED" ? "default" : event.status === "PENDING" ? "outline" : "destructive"}>
                    {event.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {event.bookings.length} pax
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <ModerationActions eventId={event.id} currentStatus={event.status} />
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  No events found in the system.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
