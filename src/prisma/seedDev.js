/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'user@email.com',
      name: 'The User',
      isActive: true,
      isVerified: true,
      password: '$2b$10$GOjP2MEi1LAsZ87m4Imx1OvNNAuexZX2SF0kLV57FbE4x2NPQRfvy',
      phoneNumber: '+5511999999999',
      terms: true
    }
  })

  await prisma.activity.createMany({
    data: [{ name: 'Activity 1' }, { name: 'Activity 2' }]
  })

  await prisma.placement.createMany({
    data: [{ name: 'Placement 1' }, { name: 'Placement 2' }]
  })

  await prisma.userFile.create({
    data: {
      filename: 'file.jpg',
      key: 'key',
      type: 'IMAGE',
      url: 'url',
      userId: user.id
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
