import { GenderType } from 'domain/campaign/types'
import { NewCampaignDataType } from '../types'

export type FormStep1Props = {
  handleNextStep: (data: any) => void
  data?: NewCampaignDataType | any
}
export type FormStep1Values = {
  name: string
  activityId: string
  gender: GenderType | string
  location: string
  state?: string
  userId: string
}
export type useHandleSubmitFormStep1Props = {
  handleNextStep: (data: any) => void
  data?: NewCampaignDataType | any
}

export type useBrazilianStatesProps = {
  state?: string
}
