import { NewCampaignDataType } from '../types'

export type FormStep2Props = {
  handleNextStep: (data: any) => void
  handlePrevStep: () => void
  data?: NewCampaignDataType | any
}
