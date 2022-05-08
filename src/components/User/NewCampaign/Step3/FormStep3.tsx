import { Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { NumberInput } from 'components/shared/NumberInput'
import { useAuth } from 'contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { FooterButtons } from '../FooterButtons'
import { useHandleSubmitFormStep } from '../helpers'
import { FormStepProps } from '../types'
import { Audience } from './Audience'
import { parseValue, step3Schema } from './helpers'
import { FormStep3Values } from './types'

export const FormStep3 = ({ handleNextStep, handlePrevStep, data }: FormStepProps) => {
  const { user } = useAuth()
  const { isSubmitting, submitForm } = useHandleSubmitFormStep({ handleNextStep, data })

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors }
  } = useForm<FormStep3Values>({
    resolver: yupResolver(step3Schema),
    defaultValues: {
      amount: data?.amount || '',
      userId: user?.id || '',
      estimatedReach: data?.estimatedReach || '',
      step: 3
    }
  })
  const { amount } = watch()

  const handleSubmitForm = async (values: FormStep3Values) => {
    const formattedValues = {
      ...values,
      amount: parseValue(String(values.amount))
    }
    await submitForm(formattedValues)
  }

  return (
    <Flex as="form" direction="column" flex={1} onSubmit={handleSubmit(handleSubmitForm)}>
      <Flex w="full" my={8}>
        <FormControl id="amount" mb={3} isInvalid={!!errors.amount}>
          <FormLabel htmlFor="amount" mb={2} ml={0}>
            Investimento
            <FormHelperText fontWeight="normal" fontSize="xs" color="gray.500">
              Digite o valor que você deseja investir em sua publi. O valor mínimo é de R$250,00.
            </FormHelperText>
          </FormLabel>
          <NumberInput
            autoComplete="off"
            variant="outlineWhite"
            name="amount"
            control={control}
            maxW="485px"
            placeholder="Digite o valor que deseja investir"
          />
          <>{!!errors.amount && <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>}</>
        </FormControl>
      </Flex>
      <Audience value={amount} setValue={setValue} />

      <FooterButtons isSubmitting={isSubmitting} handlePrevStep={handlePrevStep} />
    </Flex>
  )
}
