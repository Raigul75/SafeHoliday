const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.event.updateMany({
  data: { status: "APPROVED" }
}).then(res => {
  console.log("Updated events:", res.count);
  prisma.$disconnect();
});
