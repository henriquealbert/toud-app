import prisma from 'lib/prisma'
import { validate } from 'lib/yup'
import { createCampaignParams } from './types'
import { createCampaignValidator } from './validation'

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

  const { name, activityId, gender, location, userId, step } = fields as createCampaignParams

  const createdCampaign = await prisma.campaign.create({
    data: {
      userId,
      name,
      activityId,
      gender,
      location,
      step
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
