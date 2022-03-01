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
import { yupResolver } from '@hookform/resolvers/yup'
import { Activity } from 'domain/activity/types'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { formatActivitiesOptions, genderOptions, step1Schema, useBrazilianStates } from './helpers'

export const FormStep1 = ({ handleNextStep, activities }: FormStep1Props) => {
  const { statesOptions, setSpecificState, specificState } = useBrazilianStates()

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(step1Schema(specificState)),
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

  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit(handleSubmitForm)} flex={1}>
      <Flex w="full" my={8}>
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

        <FormControl id="gender" mb={3} ml={8} isInvalid={!!errors.gender}>
          <FormLabel htmlFor="gender">Gênero do público alvo</FormLabel>
          <Select options={genderOptions} placeholder="Selecione o gênero do público alvo" />

          <>{!!errors.gender && <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>}</>
        </FormControl>
      </Flex>

      <Flex w="full" my={8}>
        <FormControl id="activityId" mb={3} isInvalid={!!errors.activityId}>
          <FormLabel htmlFor="activityId">Segmento</FormLabel>
          <Select
            options={formatActivitiesOptions(activities)}
            placeholder="Escolha o segmento da campanha"
          />
          <>
            {!!errors.activityId && (
              <FormErrorMessage>{errors.activityId?.message}</FormErrorMessage>
            )}
          </>
        </FormControl>

        <FormControl id="location" mb={3} ml={8} isInvalid={!!errors.location}>
          <FormLabel htmlFor="location" mb={2}>
            Localização em que será feita a divulgação
          </FormLabel>
          <RadioGroup ml={3}>
            <Stack direction="column" spacing={4}>
              <Radio
                value="Brasil todo"
                bg="white"
                borderColor="border"
                boxShadow="2px 2px 4px rgba(166, 166, 166, 0.2)"
                onChange={() => {
                  setSpecificState(false)
                  setValue('location', 'BR')
                  clearErrors('location')
                }}
              >
                Brasil todo
              </Radio>
              <Radio
                value="Estado"
                bg="white"
                borderColor="border"
                boxShadow="2px 2px 4px rgba(166, 166, 166, 0.2)"
                onChange={() => {
                  setSpecificState(true)
                  clearErrors('location')
                }}
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
      <Flex>
        <Flex w="full" />
        {specificState && (
          <FormControl id="state" mb={3} ml={5} isInvalid={!!errors.state}>
            <FormLabel htmlFor="state">Estado em que será divulgado</FormLabel>
            <Select
              options={statesOptions}
              placeholder="Selecione o estado em que será divulgado"
            />
            <>{!!errors.state && <FormErrorMessage>{errors.state?.message}</FormErrorMessage>}</>
          </FormControl>
        )}
      </Flex>

      <Flex mt={12} maxW="245px">
        <Button type="submit">Salvar</Button>
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
