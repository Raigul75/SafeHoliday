import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const events = [
    {
      title: "Burabay Weekend Escape",
      description: "Join us for a 2-day trip to the pearl of Kazakhstan. Hiking, fresh air, and networking with locals and expats.",
      category: "Nature & Hiking",
      date: "This Weekend",
      price: "35,000 KZT",
      imageUrl: "https://images.unsplash.com/photo-1572816766428-11b0fea30d1d?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Coffee & Language Exchange",
      description: "Practice your Russian/Kazakh with friendly locals while helping them with English. Free coffee for the first 10 participants!",
      category: "Social & Culture",
      date: "Tomorrow, 19:00",
      price: "Free",
      imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Hiking in the Outskirts",
      description: "A moderate 10km hike just outside Astana. Perfect for beginners and nature lovers. Transport provided.",
      category: "Nature & Hiking",
      date: "Sunday, 09:00",
      price: "5,000 KZT",
      imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=60",
    }
  ]

  console.log(`Start seeding ...`)
  for (const event of events) {
    const createdEvent = await prisma.event.create({
      data: event,
    })
    console.log(`Created event with id: ${createdEvent.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
