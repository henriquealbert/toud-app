import yup from 'lib/yup'
import { ALL_GENDERS } from './constants'

export const createCampaignValidator = yup
  .object({
    name: yup.string().required(),
    gender: yup.string().oneOf(ALL_GENDERS).required(),
    location: yup.string().required(),
    userId: yup.string().required(),
    activityId: yup.string().required()
  })
  .required()

export const updateCampaignValidator = yup
  .object({
    id: yup.string().required(),
    name: yup.string(),
    description: yup.string(),
    gender: yup.string().oneOf(ALL_GENDERS),
    location: yup.string(),
    amount: yup.number(),
    expectedDate: yup.string(),
    estimatedReach: yup.string(),
    userId: yup.string(),
    activityId: yup.string(),
    placementsIds: yup.array(yup.string()),
    filesIds: yup.array(yup.string())
  })
  .required()
