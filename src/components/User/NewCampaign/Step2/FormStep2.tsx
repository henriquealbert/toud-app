import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Textarea
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import { useAuth } from 'contexts/AuthContext'
import { UploadFiles } from 'components/shared/UploadFiles'
import { CalendarInput } from 'components/shared/CalendarInput'
import { step2Schema, useHandleSubmitFormStep2 } from './helpers'

import { FormStep2Props, FormStep2Values } from './types'
import { parseISO } from 'date-fns'

export const FormStep2 = ({ handleNextStep, handlePrevStep, data }: FormStep2Props) => {
  const { user } = useAuth()
  const { isSubmitting, submitForm } = useHandleSubmitFormStep2({ handleNextStep, data })
  const expectedDateValue = data?.expectedDate ? parseISO(String(data?.expectedDate)) : undefined

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    control,
    formState: { errors }
  } = useForm<FormStep2Values>({
    resolver: yupResolver(step2Schema),
    defaultValues: {
      hasDescription: data?.hasDescription || 'Yes',
      description: data?.description || '',
      userId: user?.id || '',
      filesIds: data?.filesIds || [],
      expectedDate: expectedDateValue
    }
  })
  const { hasDescription, filesIds } = watch()

  return (
    <Flex as="form" direction="column" flex={1} onSubmit={handleSubmit(submitForm)}>
      <Flex w="full" my={8}>
        <FormControl id="hasDescription" mb={3} isInvalid={!!errors.hasDescription}>
          <FormLabel htmlFor="hasDescription" mb={2}>
            Você possui um roteiro em texto que gostaria que o influencer seguisse?
          </FormLabel>
          <RadioGroup ml={3} defaultValue={hasDescription} color="text">
            <Stack direction="column" spacing={4}>
              <Radio
                value="Yes"
                bg="white"
                borderColor="border"
                boxShadow="2px 2px 4px rgba(166, 166, 166, 0.2)"
                onChange={() => {
                  setValue('hasDescription', 'Yes')
                  clearErrors('hasDescription')
                }}
              >
                Sim
              </Radio>
              <Radio
                value="No"
                bg="white"
                borderColor="border"
                boxShadow="2px 2px 4px rgba(166, 166, 166, 0.2)"
                onChange={() => {
                  setValue('hasDescription', 'No')
                  clearErrors('hasDescription')
                }}
              >
                Não, eu possuo um anuncio em vídeo ou imagem
              </Radio>
            </Stack>
          </RadioGroup>
          <>
            {!!errors.hasDescription && (
              <FormErrorMessage>{errors.hasDescription?.message}</FormErrorMessage>
            )}
          </>
        </FormControl>

        <FormControl id="placementId" mb={3} ml={8}>
          <FormLabel htmlFor="placementId" mb={2}>
            Rede social de veiculação
          </FormLabel>
          <RadioGroup ml={3} defaultValue={'Instagram Stories'} color="text">
            <Stack direction="column" spacing={4}>
              <Radio
                value="Instagram Stories"
                bg="white"
                borderColor="border"
                boxShadow="2px 2px 4px rgba(166, 166, 166, 0.2)"
                isDisabled
              >
                Instagram Stories
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Flex>

      <Flex w="full" my={5}>
        <Flex flexDir="column" w="full">
          {hasDescription === 'Yes' && (
            <FormControl id="description" mb={3} isInvalid={!!errors.description}>
              <FormLabel htmlFor="description" mb={2}>
                Qual é o roteiro que o influencer deve seguir?
              </FormLabel>
              <Textarea rows={4} {...register('description')} />
              <>
                {!!errors.description && (
                  <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                )}
              </>
            </FormControl>
          )}
          <FormControl id="filesIds" mb={3} mt={hasDescription === 'Yes' ? 8 : 0}>
            <FormLabel htmlFor="filesIds" mb={2}>
              Upload de anúncio em vídeo ou imagem
            </FormLabel>
            <UploadFiles
              onChange={(files) =>
                setValue(
                  'filesIds',
                  files.map((f) => ({ id: f.id }))
                )
              }
              value={filesIds}
              campaignId={data?.id}
            />
          </FormControl>
        </Flex>

        <FormControl ml={8} id="expectedDate" isInvalid={!!errors.expectedDate}>
          <FormLabel htmlFor="expectedDate" mb={2}>
            Dia de veiculação
          </FormLabel>
          <Controller
            name="expectedDate"
            control={control}
            render={({ field: { onBlur, onChange, value, name } }) => (
              <CalendarInput
                placeholder="Selecione o dia de veiculação"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                name={name}
                isInvalid={!!errors.expectedDate}
              />
            )}
          />
          <>
            {!!errors.expectedDate && (
              <FormErrorMessage>{errors.expectedDate?.message}</FormErrorMessage>
            )}
          </>
        </FormControl>
      </Flex>

      <Flex mt={12}>
        <Button variant="outline" mr={20} w="245px" onClick={handlePrevStep}>
          Voltar
        </Button>
        <Button type="submit" isLoading={isSubmitting} loadingText="Salvando..." w="245px">
          Salvar
        </Button>
      </Flex>
    </Flex>
  )
}
