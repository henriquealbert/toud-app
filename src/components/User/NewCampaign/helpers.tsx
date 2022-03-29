import { api } from 'lib/api'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

import { useHandleSubmitFormStepProps } from './types'

export const useHandleSubmitFormStep = ({ handleNextStep, data }: useHandleSubmitFormStepProps) => {
  const { data: session } = useSession()
  const [isLoading, setLoading] = useState(false)
  const campaignId = data?.id

  const submitForm = async (values: any) => {
    setLoading(true)
    const token = session?.accessToken as string

    if (!campaignId) {
      setLoading(false)
      return alert('Erro ao atualizar campanha')
    }

    const { data: updatedCampaign } = await updateCampaign(campaignId, token, values)

    if (!updatedCampaign) {
      setLoading(false)
      return alert('Erro ao atualizar campanha')
    }

    setLoading(false)
    handleNextStep({ ...values, ...updatedCampaign })
  }

  return { submitForm, isSubmitting: isLoading }
}

export const updateCampaign = async (campaignId: string, token: string, values: any) => {
  if (!campaignId) return alert('Erro ao atualizar campanha')

  return (await api.put(`/campaigns/${campaignId}`, values, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })) as any
}
