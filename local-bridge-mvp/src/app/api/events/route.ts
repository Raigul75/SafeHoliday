import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id || session.user?.role !== "HOST") {
      return NextResponse.json({ message: "Unauthorized. Only hosts can create events." }, { status: 403 })
    }

    const body = await req.json()
    const { title, description, category, date, price, imageUrl } = body

    if (!title || !description || !category || !date || !price) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Create a new event
    const event = await prisma.event.create({
      data: {
        title,
        description,
        category,
        date,
        price,
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=60",
        hostId: session.user.id,
      }
    })

    return NextResponse.json({ message: "Event created successfully", event }, { status: 201 })
  } catch (error) {
    console.error("Event creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
