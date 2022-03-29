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
import { SelectInput } from 'components/shared/SelectInput'
import { useAuth } from 'contexts/AuthContext'
import { Controller, useForm } from 'react-hook-form'
import {
  useActivities,
  genderOptions,
  step1Schema,
  useBrazilianStates,
  useHandleSubmitFormStep1
} from './helpers'
import { FormStep1Props, FormStep1Values } from './types'

export const FormStep1 = ({ handleNextStep, data }: FormStep1Props) => {
  const { user } = useAuth()
  const activitiesOptions = useActivities()
  const { statesOptions, setSpecificState, specificState } = useBrazilianStates({
    state: data?.state
  })
  const { submitForm, isSubmitting } = useHandleSubmitFormStep1({ handleNextStep, data })

  const {
    control,
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<FormStep1Values>({
    resolver: yupResolver(step1Schema(specificState)),
    defaultValues: {
      name: data?.name || '',
      activityId: data?.activityId || '',
      gender: data?.gender || '',
      location: data?.location || 'BR',
      state: data?.state || '',
      userId: user?.id || ''
    }
  })

  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit(submitForm)} flex={1}>
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
          <Controller
            name="gender"
            control={control}
            render={({ field: { onBlur, onChange, value, name } }) => (
              <SelectInput
                options={genderOptions}
                placeholder="Selecione o gênero do público alvo"
                onChange={(option: any) => {
                  onChange(option?.value)
                  setValue(name, option?.value)
                }}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <>{!!errors.gender && <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>}</>
        </FormControl>
      </Flex>

      <Flex w="full" my={8}>
        <FormControl id="activityId" mb={3} isInvalid={!!errors.activityId}>
          <FormLabel htmlFor="activityId">Segmento</FormLabel>
          <Controller
            name="activityId"
            control={control}
            render={({ field: { onBlur, onChange, value, name } }) => (
              <SelectInput
                isSearchable
                options={activitiesOptions}
                placeholder="Escolha o segmento da campanha"
                onChange={(option: any) => {
                  onChange(option?.value)
                  setValue(name, option?.value)
                }}
                onBlur={onBlur}
                value={value}
              />
            )}
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
          <RadioGroup ml={3} defaultValue={data?.state ? 'state' : 'BR'} color="text">
            <Stack direction="column" spacing={4}>
              <Radio
                value="BR"
                bg="white"
                borderColor="border"
                boxShadow="2px 2px 4px rgba(166, 166, 166, 0.2)"
                onChange={() => {
                  setSpecificState(false)
                  setValue('location', 'BR')
                  setValue('state', '')
                  clearErrors('location')
                }}
              >
                Brasil todo
              </Radio>
              <Radio
                value="state"
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
            <Controller
              name="state"
              control={control}
              render={({ field: { onBlur, onChange, value, name } }) => (
                <SelectInput
                  isSearchable
                  options={statesOptions}
                  placeholder="Selecione o estado em que será divulgado"
                  onChange={(option: any) => {
                    onChange(option?.value)
                    setValue('location', option?.value)
                    setValue(name, option?.value)
                    clearErrors('location')
                  }}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />

            <>{!!errors.state && <FormErrorMessage>{errors.state?.message}</FormErrorMessage>}</>
          </FormControl>
        )}
      </Flex>

      <Flex mt={12} maxW="245px">
        <Button type="submit" isLoading={isSubmitting} loadingText="Salvando...">
          Salvar
        </Button>
      </Flex>
    </Flex>
  )
}
