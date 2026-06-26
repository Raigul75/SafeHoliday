import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const emailToElevate = process.argv[2]

  if (!emailToElevate) {
    console.log("Please provide an email. Usage: npx ts-node prisma/elevate-host.ts <email>")
    process.exit(1)
  }

  const user = await prisma.user.update({
    where: { email: emailToElevate },
    data: { trustLevel: "TRUSTED" }
  })

  console.log(`Success! User ${user.email} is now TRUSTED.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
