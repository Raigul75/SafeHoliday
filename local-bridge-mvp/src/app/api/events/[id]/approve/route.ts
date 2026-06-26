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
    
    // Only CURATOR can approve or reject events
    if (!session || !session.user || session.user.role !== "CURATOR") {
      return NextResponse.json({ message: "Unauthorized. Only curators can moderate events." }, { status: 403 })
    }

    const resolvedParams = await params
    const eventId = resolvedParams.id

    const body = await req.json()
    const { status } = body

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 })
    }

    const event = await prisma.event.update({
      where: { id: eventId },
      data: { status }
    })

    return NextResponse.json({ message: `Event ${status.toLowerCase()} successfully`, event }, { status: 200 })
  } catch (error) {
    console.error("Event moderation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
