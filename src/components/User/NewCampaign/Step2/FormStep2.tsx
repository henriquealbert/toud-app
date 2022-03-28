import { Button, Flex } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { FormStep2Props } from './types'

export const FormStep2 = ({ handleNextStep, handlePrevStep }: FormStep2Props) => {
  const { user } = useAuth()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm({
    // resolver: yupResolver(step1Schema(specificState)),
    defaultValues: {
      userId: user?.id || ''
    }
  })

  return (
    <Flex as="form" direction="column" flex={1}>
      <Flex w="full" my={8}></Flex>

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
