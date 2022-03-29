import { NewCampaignDataType } from '../types'

export type FormStep2Props = {
  handleNextStep: (data: any) => void
  handlePrevStep: () => void
  data?: NewCampaignDataType
}

export type FormStep2Values = {
  hasDescription: 'Yes' | 'No'
  description: string
  userId: string
  filesIds: Array<{ id: string }>
  expectedDate: Date | undefined
}

export type useHandleSubmitFormStep2Props = {
  handleNextStep: (data: any) => void
  data?: NewCampaignDataType
}
