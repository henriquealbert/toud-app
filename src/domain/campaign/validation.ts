import yup from 'lib/yup'
import { ALL_GENDERS } from './constants'

export const createCampaignValidator = yup
  .object({
    name: yup.string().required(),
    description: yup.string().optional(),
    gender: yup.string().oneOf(ALL_GENDERS).required(),
    location: yup.string().required(),
    amount: yup.number().required(),
    expectedDate: yup.string().required(),
    estimatedReach: yup.string().required(),
    userId: yup.string().required(),
    activityId: yup.string().required(),
    placementsIds: yup.array(yup.string().required()).required(),
    filesIds: yup.array(yup.string().required()).required()
  })
  .required()
