// import prisma from 'lib/prisma'
// import { validate } from 'lib/yup'
// import { createCampaignValidator } from './validation'

// import { createCampaignParams } from './types'

// export async function createCampaign(params: createCampaignParams) {
//   const { fields, errors } = await validate(createCampaignValidator, params)
//   if (errors) {
//     return {
//       error: {
//         status: 400,
//         errors
//       }
//     }
//   }

//   const {
//     name,
//     activityId,
//     amount,
//     description,
//     estimatedReach,
//     expectedDate,
//     filesIds,
//     gender,
//     location,
//     placementsIds,
//     userId
//   } = fields as createCampaignParams

//   const createdCampaign = await prisma.campaign.create({
//     data: {
//       amount,
//       estimatedReach,
//       expectedDate,
//       gender,
//       location,
//       name,
//       activityId,
//       userId,
//       description,
//       files: {
//         connect: filesIds.map((f) => ({ id: f }))
//       }
//     },
//     include: {
//       activity: true,
//       files: true
//     }
//   })

//   const campaignOnPlacement = await Promise.all(
//     placementsIds.map(async (p) => {
//       return await prisma.campaignOnPlacement.create({
//         data: { campaignId: createdCampaign.id, placementId: p },
//         select: {
//           campaignId: true,
//           placementId: true,
//           isActive: true,
//           placement: true
//         }
//       })
//     })
//   )

//   return {
//     data: { ...createdCampaign, campaignOnPlacement }
//   }
// }
