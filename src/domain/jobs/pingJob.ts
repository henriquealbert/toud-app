import { format } from 'date-fns'
import prisma from 'lib/prisma'

export async function runPingJob() {
  const [hasPing] = await prisma.ping.findMany()

  if (!hasPing) {
    const newPing = await prisma.ping.create({
      data: {
        notes: format(new Date(), 'dd-MM-yyyy HH:mm:ss')
      }
    })

    if (!newPing) {
      return {
        error: {
          status: 500,
          message: 'Error creating ping'
        }
      }
    }

    return {
      data: newPing
    }
  } else {
    const updatedPing = await prisma.ping.update({
      where: { id: hasPing.id },
      data: {
        notes: format(new Date(), 'dd-MM-yyyy HH:mm:ss')
      }
    })

    if (!updatedPing) {
      return {
        error: {
          status: 500,
          message: 'Error updating ping'
        }
      }
    }

    return {
      data: updatedPing
    }
  }
}
