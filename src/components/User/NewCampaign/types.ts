import { GenderType, StatusType } from 'domain/campaign/types'

export type NewCampaignDataType = {
  activity: activity
  activityId: string
  amount?: number | null
  createdAt: string
  description?: string | null
  estimatedReach?: string | null
  expectedDate?: Date | null | string
  gender: GenderType
  id: string
  isActive: boolean
  location: string
  name: string
  notes?: string | null
  status: StatusType
  updatedAt: string
  userId: string
  hasDescription: 'Yes' | 'No'
  filesIds?: Array<{ id: string }>
}

type activity = {
  id: string
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
