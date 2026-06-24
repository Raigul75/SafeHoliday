import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Tag } from "lucide-react"
import { BookingActions } from "@/components/BookingActions"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/login")
  }

  // @ts-ignore
  const role = session.user.role

  if (role === "EXPAT") {
    const bookings = await prisma.booking.findMany({
      where: { userId: session.user.id },
      include: { event: true },
      orderBy: { createdAt: "desc" }
    })

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
            <p className="text-gray-500 mb-4">You haven't booked any experiences yet.</p>
            <a href="/" className="text-(--color-primary) font-semibold hover:underline">Explore Events</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-6">
                <div className="flex-grow">
                  <Badge className="mb-2 bg-yellow-100 text-yellow-800 border-none">{booking.status}</Badge>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.event.title}</h3>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-(--color-primary)" />
                      <span>{booking.event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Tag className="w-4 h-4 text-(--color-primary)" />
                      <span>{booking.event.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (role === "HOST") {
    const events = await prisma.event.findMany({
      where: { hostId: session.user.id },
      include: { bookings: { include: { user: true } } },
      orderBy: { createdAt: "desc" }
    })

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Host Dashboard</h1>
          <a href="/dashboard/new-event" className="bg-(--color-primary) text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-opacity">
            + Create Event
          </a>
        </div>
        
        {events.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
            <p className="text-gray-500">You haven't created any events yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{event.date} • {event.price}</p>
                  </div>
                  <Badge className="bg-(--color-secondary) text-white border-none">{event.bookings.length} Bookings</Badge>
                </div>
                
                {event.bookings.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Participants:</h4>
                    <ul className="space-y-2">
                      {event.bookings.map(booking => (
                        <li key={booking.id} className="flex justify-between items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
                          <span>{booking.user.name} ({booking.user.email})</span>
                          <BookingActions bookingId={booking.id} currentStatus={booking.status} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return <div>Unknown role</div>
}
