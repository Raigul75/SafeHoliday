import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("curator123", 10)

  const curator = await prisma.user.upsert({
    where: { email: "curator@safeholiday.com" },
    update: {
      role: "CURATOR",
      trustLevel: "TRUSTED"
    },
    create: {
      name: "Community Curator SAYA",
      email: "curator@safeholiday.com",
      password: hashedPassword,
      role: "CURATOR",
      trustLevel: "TRUSTED"
    }
  })

  console.log("Curator account seeded:", curator.email)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
