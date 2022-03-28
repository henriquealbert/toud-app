import { GenderType } from 'domain/campaign/types'

export type FormStep1Props = {
  handleNextStep: (data: any) => void
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
}
