import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { status } = await req.json()
    if (!["CONFIRMED", "CANCELLED"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 })
    }

    const resolvedParams = await params;
    const bookingId = resolvedParams.id;

    // Verify that the host owns the event this booking is for
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { event: true }
    })

    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 })
    }

    // @ts-ignore
    if (booking.event.hostId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status }
    })

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error("Failed to update booking:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
