import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Radio,
  RadioGroup,
  Stack,
  Tooltip
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { CalendarInput } from 'components/shared/CalendarInput'
import { TextareaInput } from 'components/shared/TextareaInput'
import { UploadFiles } from 'components/shared/UploadFiles'
import { useAuth } from 'contexts/AuthContext'
import { parseISO } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'
import { MdOutlineErrorOutline } from 'react-icons/md'
import { FooterButtons } from '../FooterButtons'
import { useHandleSubmitFormStep } from '../helpers'
import { FormStepProps } from '../types'
import { step2Schema } from './helpers'
import { FormStep2Values } from './types'

export const FormStep2 = ({ handleNextStep, handlePrevStep, data }: FormStepProps) => {
  const { user } = useAuth()
  const { isSubmitting, submitForm } = useHandleSubmitFormStep({ handleNextStep, data })
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
  const { hasDescription, description, filesIds } = watch()

  const handleSubmitForm = async (values: FormStep2Values) => {
    const formattedValues = {
      ...values,
      description: values.hasDescription === 'Yes' ? values.description : ''
    }
    await submitForm(formattedValues)
  }

  return (
    <Flex as="form" direction="column" flex={1} onSubmit={handleSubmit(handleSubmitForm)}>
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
              <TextareaInput rows={5} value={description} {...register('description')} />
              <>
                {!!errors.description && (
                  <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                )}
              </>
            </FormControl>
          )}
          <FormControl id="filesIds" mb={3} mt={hasDescription === 'Yes' ? 8 : 0}>
            <FormLabel htmlFor="filesIds" mb={2} display="flex">
              Upload de anúncio em vídeo ou imagem
              <ExclamationTooltip label="O arquivos devem seguir as dimensões das redes sociais escolhidas. Por exemplo, para Instagram Stories as dimensões de vídeos e imagens são de 1080 x 1920." />
            </FormLabel>
            <UploadFiles
              onChange={(files) =>
                setValue(
                  'filesIds',
                  files.map((f) => ({ id: f.id }))
                )
              }
              value={filesIds.length > 0 ? filesIds : undefined}
              campaignId={data?.id}
            />
          </FormControl>
        </Flex>

        <FormControl ml={8} id="expectedDate" isInvalid={!!errors.expectedDate}>
          <FormLabel htmlFor="expectedDate" mb={2} display="flex">
            Dia de veiculação
            <ExclamationTooltip label="Só é possível vincular anúncios para o dia seguinte da data atual." />
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

      <FooterButtons isSubmitting={isSubmitting} handlePrevStep={handlePrevStep} />
    </Flex>
  )
}

const ExclamationTooltip = ({ label }: { label: string }) => {
  return (
    <Tooltip hasArrow placement="top" bgColor="purple.500" label={label}>
      <div>
        <Icon ml={2} as={MdOutlineErrorOutline} w="24px" h="24px" color="purple.500" />
      </div>
    </Tooltip>
  )
}
