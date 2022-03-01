import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react'
import axios from 'axios'
import { Activity } from 'domain/activity/types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'

export const FormStep1 = ({ handleNextStep, activities }: FormStep1Props) => {
  const [specificState, setSpecificState] = useState(false)
  const [stateOptions, setStateOptions] = useState([])

  useEffect(() => {
    if (stateOptions.length < 1) {
      getStates({ setStateOptions })
    }
  }, [stateOptions])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      activityId: '',
      gender: '',
      location: '',
      state: ''
    }
  })

  const handleSubmitForm = async (values: formValues) => {
    console.log(values)
  }

  const activitiesOptions = activities?.map((activity) => ({
    value: activity.id,
    label: activity.name
  }))

  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit(handleSubmitForm)} flex={1}>
      <Flex w="full">
        <FormControl id="name" mb={3} isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Nome da campanha</FormLabel>
          <Input
            variant="outlineWhite"
            type="text"
            placeholder="Digite o nome da campanha"
            autoComplete="off"
            {...register('name')}
          />
          <>{!!errors.name && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}</>
        </FormControl>

        <FormControl id="gender" mb={3} ml={5} isInvalid={!!errors.gender}>
          <FormLabel htmlFor="gender">Gênero do público alvo</FormLabel>
          <Select options={genderOptions} placeholder="Selecione o gênero do público alvo" />

          <>{!!errors.gender && <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>}</>
        </FormControl>
      </Flex>

      <Flex w="full" mt={8}>
        <FormControl id="activityId" mb={3} isInvalid={!!errors.activityId}>
          <FormLabel htmlFor="activityId">Segmento</FormLabel>
          <Select options={activitiesOptions} placeholder="Escolha o segmento da campanha" />
          <>
            {!!errors.activityId && (
              <FormErrorMessage>{errors.activityId?.message}</FormErrorMessage>
            )}
          </>
        </FormControl>

        <FormControl id="location" mb={3} ml={5} isInvalid={!!errors.location}>
          <FormLabel htmlFor="location" mb={2}>
            Localização em que será feita a divulgação
          </FormLabel>
          <RadioGroup ml={3}>
            <Stack direction="column" spacing={5}>
              <Radio
                value="Brasil todo"
                bg="white"
                borderColor="border"
                boxShadow="2px 2px 4px rgba(166, 166, 166, 0.2)"
                onChange={() => setSpecificState(false)}
              >
                Brasil todo
              </Radio>
              <Radio
                value="Estado"
                bg="white"
                borderColor="border"
                boxShadow="2px 2px 4px rgba(166, 166, 166, 0.2)"
                onChange={() => setSpecificState(true)}
              >
                Em um estado específico
              </Radio>
            </Stack>
          </RadioGroup>
          <>
            {!!errors.location && <FormErrorMessage>{errors.location?.message}</FormErrorMessage>}
          </>
        </FormControl>
      </Flex>
      <Flex mt={5}>
        <Flex w="full" />
        {specificState && (
          <FormControl id="state" mb={3} ml={5} isInvalid={!!errors.state}>
            <FormLabel htmlFor="state">Estado em que será divulgado</FormLabel>
            <Select options={stateOptions} placeholder="Selecione o estado em que será divulgado" />
            <>{!!errors.state && <FormErrorMessage>{errors.state?.message}</FormErrorMessage>}</>
          </FormControl>
        )}
      </Flex>

      <Flex mt={10} maxW="245px">
        <Button>Salvar</Button>
      </Flex>
    </Flex>
  )
}

type FormStep1Props = {
  handleNextStep: (data: any) => void
  activities: Activity[]
}
type formValues = {
  name: string
}

const genderOptions = [
  { label: 'Masculino', value: 'MALE' },
  { label: 'Feminino', value: 'FEMALE' },
  { label: 'Ambos', value: 'BOTH' }
]

const getStates = async ({ setStateOptions }: any) => {
  const resp = await axios.get('https://brasilapi.com.br/api/ibge/uf/v1')

  if (resp.status === 200) {
    const states = resp.data
      .map((state: any) => ({
        value: state.sigla,
        label: state.nome
      }))
      .sort((a: any, b: any) => a.label.localeCompare(b.label))
    return setStateOptions(states)
  } else {
    return console.log('error getting states')
  }
}
