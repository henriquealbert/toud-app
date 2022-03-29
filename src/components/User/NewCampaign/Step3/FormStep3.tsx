import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Audience } from './Audience'
import { parseValue, step3Schema } from './helpers'
import { useHandleSubmitFormStep } from '../helpers'
import { NumberInput } from 'components/shared/NumberInput'

import { FormStep3Values } from './types'
import { FormStepProps } from '../types'
import { useAuth } from 'contexts/AuthContext'

export const FormStep3 = ({ handleNextStep, handlePrevStep, data }: FormStepProps) => {
  const { user } = useAuth()
  const { isSubmitting, submitForm } = useHandleSubmitFormStep({ handleNextStep, data })

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<FormStep3Values>({
    resolver: yupResolver(step3Schema),
    defaultValues: {
      amount: data?.amount || '',
      userId: user?.id || ''
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
      <Audience value={amount} />

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
