import { GENDER_BOTH, GENDER_FEMALE, GENDER_MALE } from './constants'

export type createCampaignParams = {
  name: string
  description: string
  gender: GenderType
  location: string
  amount: number
  expectedDate: Date
  estimatedReach: string
  userId: string
  activityId: string
  placementsIds: string[]
  filesIds: string[]
}

export type GenderType = typeof GENDER_MALE | typeof GENDER_FEMALE | typeof GENDER_BOTH
