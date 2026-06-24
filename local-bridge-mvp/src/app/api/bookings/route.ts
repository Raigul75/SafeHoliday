import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { eventId } = await req.json()

    if (!eventId) {
      return NextResponse.json({ message: "Event ID is required" }, { status: 400 })
    }

    // Create a new booking
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        eventId: eventId,
        status: "PENDING",
      }
    })

    return NextResponse.json({ message: "Booking successful", booking }, { status: 201 })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
