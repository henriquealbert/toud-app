import axios from 'axios'
import { Activity } from 'domain/activity/types'
import { fetcher } from 'lib/fetcher'
import yup from 'lib/yup'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const formatActivitiesOptions = (activities: Activity[]) => {
  return activities?.map((activity) => ({
    value: activity.id,
    label: activity.name
  }))
}

export const useActivities = () => {
  const { data } = useQuery('activities', async () => await fetcher('/activities'))

  return data ? formatActivitiesOptions(data) : []
}

export const genderOptions = [
  { label: 'Masculino', value: 'MALE' },
  { label: 'Feminino', value: 'FEMALE' },
  { label: 'Ambos', value: 'BOTH' }
]

export const useBrazilianStates = () => {
  const [statesOptions, setStatesOptions] = useState([])
  const [specificState, setSpecificState] = useState(false)

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
          value: state.sigla,
          label: state.nome
        }))
        .sort((a: any, b: any) => a.label.localeCompare(b.label))
      return setStatesOptions(states)
    } else {
      return console.log('error getting states')
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
      state: yup.string()
    })
  }
}
