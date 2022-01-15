import {
  GENDER_BOTH,
  GENDER_FEMALE,
  GENDER_MALE,
  STATUS_DRAFT,
  STATUS_FINISHED,
  STATUS_ONGOING,
  STATUS_REJECTED,
  STATUS_SUBMITTED
} from './constants'

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

export type StatusType =
  | typeof STATUS_DRAFT
  | typeof STATUS_SUBMITTED
  | typeof STATUS_REJECTED
  | typeof STATUS_FINISHED
  | typeof STATUS_ONGOING

export type UserCampaignType = {
  id: string
  name: string
  amount: string
  createdAt: string
  activity: {
    name: string
  }
  status: StatusType
  campaignOnPlacement: [
    {
      placement: {
        id: string
        name: string
      }
    }
  ]
}
