import { prisma } from "@/lib/prisma"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Tag, Users } from "lucide-react"
import { BookingButton } from "@/components/BookingButton"

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = await prisma.event.findUnique({
    where: { id: resolvedParams.id }
  })

  if (!event) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative w-full h-[40vh] md:h-[50vh]">
        <Image 
          src={event.imageUrl} 
          alt={event.title} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 w-full p-6 md:p-12 max-w-5xl mx-auto left-0 right-0">
          <Badge className="bg-(--color-primary) text-white border-none mb-4">{event.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{event.title}</h1>
          <p className="text-white/90 text-xl font-medium">{event.price}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this experience</h2>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                {event.description}
              </p>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-4">Key Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-(--color-primary)" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Tag className="w-5 h-5 text-(--color-primary)" />
                  <span>{event.price}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="w-5 h-5 text-(--color-primary)" />
                  <span>Group Meeting Policy (Min 4)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-(--color-primary)" />
                  <span>Public location (Sent 24h prior)</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (Booking Widget) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-black/5 sticky top-28">
              {event.category === "Real Family Event" ? (
                <>
                  <Badge className="bg-amber-100 text-amber-800 border-none mb-3">Cultural Contribution</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.price}</h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-amber-900 leading-relaxed">
                      This is a non-commercial cultural event. Your contribution goes directly to the host family to cover the costs of hospitality (food, gifts) and supports the preservation of traditions.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.price}</h3>
                  <p className="text-gray-500 mb-6 border-b pb-6">Secure your spot for this experience. Total is held in escrow until completion.</p>
                </>
              )}
              
              <BookingButton eventId={event.id} />
              
              <p className="text-xs text-gray-400 mt-4 text-center">
                By booking, you agree to our Safety Protocol and zero-tolerance policy.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
