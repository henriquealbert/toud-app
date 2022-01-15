import { UserCampaignType } from 'domain/campaign/types'
import { ROLE_ADMIN, ROLE_USER } from './constants'

export type UserType = {
  id: string
  email: string
  phoneNumber: string
  role: RolesType
  name: string
  campaigns: UserCampaignType[]
}

export type RolesType = typeof ROLE_USER | typeof ROLE_ADMIN
