import axios from 'axios'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import yup from 'lib/yup'
import { api } from 'lib/api'
import { fetcher } from 'lib/fetcher'

import { Activity } from 'domain/activity/types'
import { FormStep1Values, useBrazilianStatesProps } from './types'
import { useHandleSubmitFormStepProps } from '../types'
import { updateCampaign } from '../helpers'

const formatActivitiesOptions = (activities: Activity[]) =>
  activities?.map((activity) => ({
    value: activity.id,
    label: activity.name
  }))

export const useActivities = () => {
  const { data } = useQuery('activities', async () => await fetcher('/activities'))

  return data ? formatActivitiesOptions(data) : []
}

export const genderOptions = [
  { label: 'Ambos', value: 'BOTH' },
  { label: 'Feminino', value: 'FEMALE' },
  { label: 'Masculino', value: 'MALE' }
]

export const useBrazilianStates = ({ state }: useBrazilianStatesProps) => {
  const [statesOptions, setStatesOptions] = useState([])
  const [specificState, setSpecificState] = useState(!!state || false)

  useEffect(() => {
    if (statesOptions.length < 1 && specificState) {
      getStates({ setStatesOptions })
    }
  }, [statesOptions, specificState])

  const getStates = async ({ setStatesOptions }: any) => {
    const resp = await axios.get('https://brasilapi.com.br/api/ibge/uf/v1')

    if (resp.status === 200) {
      const states = resp.data
        .map((state: any) => ({
          value: `${state.nome} - BR`,
          label: state.nome
        }))
        .sort((a: any, b: any) => a.label.localeCompare(b.label))
      return setStatesOptions(states)
    } else {
      return console.error('error getting states')
    }
  }

  return { statesOptions, specificState, setSpecificState }
}

export const step1Schema = (specificState: boolean) => {
  if (specificState) {
    return yup.object().shape({
      name: yup.string().required('Campo obrigatório'),
      activityId: yup.string().required('Campo obrigatório'),
      gender: yup.string().oneOf(['MALE', 'FEMALE', 'BOTH']).required('Campo obrigatório'),
      location: yup.string().required('Campo obrigatório'),
      state: yup.string().required('Campo obrigatório')
    })
  } else {
    return yup.object().shape({
      name: yup.string().required('Campo obrigatório'),
      activityId: yup.string().required('Campo obrigatório'),
      gender: yup.string().oneOf(['MALE', 'FEMALE', 'BOTH']).required('Campo obrigatório'),
      location: yup.string().required('Campo obrigatório'),
      state: yup.string().optional()
    })
  }
}

export const useHandleSubmitFormStep1 = ({
  handleNextStep,
  data
}: useHandleSubmitFormStepProps) => {
  const { data: session } = useSession()
  const [isLoading, setLoading] = useState(false)

  const submitForm = async (values: FormStep1Values) => {
    setLoading(true)
    const token = session?.accessToken as string

    if (data?.id) {
      const { data: updatedCampaign } = await updateCampaign(data?.id, token, values)

      if (!updatedCampaign) {
        setLoading(false)
        return alert('Erro ao atualizar campanha')
      }

      setLoading(false)
      handleNextStep({ ...updatedCampaign, state: values.state })
    } else {
      const { data: createdCampaign } = await createCampaign(token, values)

      if (!createdCampaign) {
        setLoading(false)
        return alert('Erro ao criar campanha')
      }

      setLoading(false)
      handleNextStep({ ...createdCampaign, state: values.state })
    }
  }

  return { submitForm, isSubmitting: isLoading }
}

const createCampaign = async (token: string, values: FormStep1Values) => {
  return (await api.post('/campaigns', values, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })) as any
}
