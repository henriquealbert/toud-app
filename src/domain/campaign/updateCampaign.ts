import prisma from 'lib/prisma'
import { validate } from 'lib/yup'
import { updateCampaignParams } from './types'
import { updateCampaignValidator } from './validation'

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
    id,
    status,
    isActive,
    notes,
    filesIds,
    step
    // placementsIds
  } = fields as updateCampaignParams

  const [campaign] = await prisma.campaign.findMany({
    where: {
      id,
      userId
    },
    select: {
      id: true
    }
  })

  if (!campaign) {
    return {
      error: {
        status: 404,
        message: 'Campaign not found'
      }
    }
  }

  const updatedCampaign = await prisma.campaign.update({
    where: { id },
    data: {
      name,
      activityId,
      gender,
      location,
      amount,
      description,
      estimatedReach,
      expectedDate,
      status,
      isActive,
      notes,
      step,
      files: { connect: filesIds }
    },
    include: {
      files: true,
      activity: true
    }
  })

  if (!updatedCampaign) {
    return {
      error: {
        status: 500,
        message: 'Error updating campaign'
      }
    }
  }

  return {
    data: updatedCampaign
  }
}
