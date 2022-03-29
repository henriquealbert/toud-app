import { useState } from 'react'
import { useSession } from 'next-auth/react'

import yup from 'lib/yup'
import { api } from 'lib/api'

import { FormStep2Values, useHandleSubmitFormStep2Props } from './types'

const updateCampaign = async (campaignId: string, token: string, values: FormStep2Values) => {
  if (!campaignId) return alert('Erro ao atualizar campanha')

  return (await api.put(`/campaigns/${campaignId}`, values, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })) as any
}

export const useHandleSubmitFormStep2 = ({
  handleNextStep,
  data
}: useHandleSubmitFormStep2Props) => {
  const { data: session } = useSession()
  const [isLoading, setLoading] = useState(false)

  const submitForm = async (values: FormStep2Values) => {
    setLoading(true)
    const token = session?.accessToken as string

    if (!data?.id) {
      setLoading(false)
      return alert('Erro ao atualizar campanha')
    }

    const formattedValues = {
      ...values,
      description: values.hasDescription === 'Yes' ? values.description : ''
    }

    const { data: updatedCampaign } = await updateCampaign(data?.id, token, formattedValues)

    if (!updatedCampaign) {
      setLoading(false)
      return alert('Erro ao atualizar campanha')
    }

    setLoading(false)
    handleNextStep({ ...formattedValues, ...updatedCampaign })
  }

  return { submitForm, isSubmitting: isLoading }
}

export const step2Schema = yup.object().shape({
  hasDescription: yup.string().required('Campo obrigatório'),
  description: yup.string().when('hasDescription', {
    is: 'Yes',
    then: yup.string().required('Campo obrigatório')
  }),
  userId: yup.string().required('Campo obrigatório'),
  filesIds: yup
    .array()
    .of(yup.object({ id: yup.string() }))
    .optional(),
  expectedDate: yup.date().required('Campo obrigatório')
})
