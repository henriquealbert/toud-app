import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  FormHelperText
} from '@chakra-ui/react'
import { NumberInput } from 'components/shared/NumberInput'
import { useForm } from 'react-hook-form'
import { FormStep3Values } from './types'

export const FormStep3 = ({ handleNextStep, handlePrevStep, data }: any) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    control,
    formState: { errors }
  } = useForm<FormStep3Values>({
    // resolver: yupResolver(step2Schema),
    defaultValues: { amount: '' }
  })

  return (
    <Flex as="form" direction="column" flex={1}>
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

      <Flex mt={12}>
        <Button variant="outline" mr={20} w="245px" onClick={handlePrevStep}>
          Voltar
        </Button>
        <Button
          type="submit"
          //  isLoading={isSubmitting}
          loadingText="Salvando..."
          w="245px"
        >
          Salvar
        </Button>
      </Flex>
    </Flex>
  )
}
