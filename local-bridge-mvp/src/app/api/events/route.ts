import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { translate } from "@vitalets/google-translate-api"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
    }

    const { role, trustLevel } = session.user
    
    // In Phase 1, only CURATOR can create events, or a TRUSTED host (for future Phase 2).
    if (role !== "CURATOR" && !(role === "HOST" && trustLevel === "TRUSTED")) {
      return NextResponse.json({ message: "Forbidden. Only Curators or Trusted Hosts can create events." }, { status: 403 })
    }

    const body = await req.json()
    const { title, description, category, date, price, imageUrl } = body

    if (!title || !description || !category || !date || !price) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    let finalTitle = title;
    let finalDescription = description;

    if (role === "CURATOR") {
      try {
        const titleRes = await translate(title, { to: "en" });
        finalTitle = titleRes.text;

        const descRes = await translate(description, { to: "en" });
        finalDescription = descRes.text;
      } catch (err) {
        console.error("Translation error:", err);
      }
    }

    // Create a new event
    const event = await prisma.event.create({
      data: {
        title: finalTitle,
        description: finalDescription,
        category,
        date,
        price,
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=60",
        hostId: session.user.id,
        status: role === "CURATOR" ? "APPROVED" : "PENDING",
      }
    })

    return NextResponse.json({ message: "Event created successfully", event }, { status: 201 })
  } catch (error) {
    console.error("Event creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
