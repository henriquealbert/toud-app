import { StatusType, GenderType } from 'domain/campaign/types'

export type CampaignType = {
  activity: {
    id: string
    name: string
  }
  activityId: string
  amount: string
  createdAt: string
  description?: string
  estimatedReach: string
  expectedDate: string
  gender: GenderType
  id: string
  isActive: boolean
  location: string
  name: string
  notes?: string
  status: StatusType
  updatedAt: string
  userId: string
}

export type CampaignDetailsProps = {
  data: CampaignType | undefined
}
