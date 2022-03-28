import prisma from 'lib/prisma'
import { validate } from 'lib/yup'
import { createCampaignValidator } from './validation'

import { createCampaignParams } from './types'

export async function createCampaign(params: createCampaignParams) {
  const { fields, errors } = await validate(createCampaignValidator, params)
  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const { name, activityId, gender, location, userId } = fields as createCampaignParams

  const createdCampaign = await prisma.campaign.create({
    data: {
      userId,
      name,
      activityId,
      gender,
      location
    },
    include: {
      activity: true
    }
  })

  if (!createdCampaign) {
    return {
      error: {
        status: 500,
        errors: {
          message: 'Error creating campaign'
        }
      }
    }
  }

  return {
    data: createdCampaign
  }
}
