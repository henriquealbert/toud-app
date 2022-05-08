import { UseFormSetValue } from 'react-hook-form'

export type FormStep3Values = {
  amount: string | number
  userId: string
  estimatedReach: string
  step?: number
}
export type AudienceProps = {
  value: string | number
  setValue: UseFormSetValue<FormStep3Values>
}
