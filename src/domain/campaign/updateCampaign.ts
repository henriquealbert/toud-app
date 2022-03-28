import prisma from 'lib/prisma'
import { validate } from 'lib/yup'
import { updateCampaignValidator } from './validation'

import { updateCampaignParams } from './types'

export async function updateCampaign(params: updateCampaignParams) {
  const { fields, errors } = await validate(updateCampaignValidator, params)
  if (errors) {
    return {
      error: {
        status: 400,
        errors
      }
    }
  }

  const {
    name,
    activityId,
    gender,
    location,
    userId,
    amount,
    description,
    estimatedReach,
    expectedDate,
    id
    // filesIds,
    // placementsIds
  } = fields as updateCampaignParams

  const updatedCampaign = await prisma.campaign.update({
    where: { id },
    data: {
      userId,
      name,
      activityId,
      gender,
      location,
      amount,
      description,
      estimatedReach,
      expectedDate
    },
    include: {
      activity: true,
      files: true
    }
  })

  if (!updatedCampaign) {
    return {
      error: {
        status: 500,
        errors: {
          message: 'Error updating campaign'
        }
      }
    }
  }

  return {
    data: updatedCampaign
  }
}
