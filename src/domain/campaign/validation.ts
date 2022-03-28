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
