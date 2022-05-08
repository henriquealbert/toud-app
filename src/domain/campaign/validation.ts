import yup from 'lib/yup'
import { ALL_GENDERS, ALL_STATUS } from './constants'

export const createCampaignValidator = yup
  .object({
    name: yup.string().required(),
    gender: yup.string().oneOf(ALL_GENDERS).required(),
    location: yup.string().required(),
    userId: yup.string().required(),
    activityId: yup.string().required(),
    step: yup.number().required()
  })
  .required()

export const updateCampaignValidator = yup.object({
  id: yup.string().required(),
  userId: yup.string().required(),
  expectedDate: yup.date().optional(),
  name: yup.string().optional(),
  description: yup.string().optional(),
  gender: yup.string().oneOf(ALL_GENDERS).optional(),
  location: yup.string().optional(),
  amount: yup.number().optional(),
  estimatedReach: yup.string().optional(),
  activityId: yup.string().optional(),
  placementsIds: yup.array(yup.string()).optional(),
  filesIds: yup
    .array()
    .of(yup.object({ id: yup.string() }))
    .optional(),
  status: yup.string().oneOf(ALL_STATUS).optional(),
  isActive: yup.bool().optional(),
  notes: yup.string().optional(),
  step: yup.number().optional()
})

export const getCampaignByIdValidator = yup.object({
  id: yup.string().required(),
  userId: yup.string().required()
})
