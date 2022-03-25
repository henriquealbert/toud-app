import prisma from 'lib/prisma'

export async function getAllActivities() {
  const activities = await prisma.activity.findMany({
    where: {
      isActive: true
    },
    select: {
      id: true,
      name: true,
      isActive: true
    }
  })

  return { data: activities }
}
