import prisma from 'lib/prisma'
import { validate } from 'lib/yup'
import { getCampaignByIdValidator } from './validation'

import { getCampaignByIdParams } from './types'

export async function getCampaignById(params: getCampaignByIdParams) {
  const { fields, errors } = await validate(getCampaignByIdValidator, params)
  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { id, userId } = fields as getCampaignByIdParams

  const campaign = await prisma.campaign.findFirst({
    where: {
      id,
      userId,
      isActive: true
    },
    include: {
      activity: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  if (!campaign) {
    return {
      error: {
        status: 404,
        errors: {
          message: 'Campaign not found'
        }
      }
    }
  }

  return {
    data: campaign
  }
}
