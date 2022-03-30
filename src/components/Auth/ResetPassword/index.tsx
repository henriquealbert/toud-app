import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalHeader,
  Flex,
  useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordValidator } from 'domain/auth/validation'
import { api } from 'lib/api'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export const ResetPasswordModal = () => {
  const { query, replace } = useRouter()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors }
  } = useForm<valuesTypes>({
    resolver: yupResolver(resetPasswordValidator),
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: (query?.passwordToken as string) || ''
    }
  })

  const submitForm = async (values: valuesTypes) => {
    const { errors } = (await api.post('/auth/reset-password', values)) as any
    if (errors) {
      setError('password', { message: errors?.password?.message, type: 'server' })
      setError('confirmPassword', { message: errors?.confirmPassword?.message, type: 'server' })
      if (errors?.token) {
        alert(errors?.token?.message)
      }
      return
    }
    replace('/login')
    toast({
      title: 'Senha atualizada!',
      description: 'Sua senha foi atualizada com Sucesso! Faça login com sua nova senha.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right'
    })
  }

  return (
    <>
      <Modal isOpen={!!query?.passwordToken} onClose={() => null} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resetar senha</ModalHeader>
          <ModalBody>
            <Box as="form" id="reset-password" onSubmit={handleSubmit(submitForm)}>
              <FormControl id="password" mb={3} isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">Nova senha</FormLabel>
                <Input
                  autoComplete="off"
                  type="password"
                  placeholder="Digite aqui sua nova senha"
                  {...register('password')}
                />
                <>
                  {!!errors.password && (
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                  )}
                </>
              </FormControl>

              <FormControl id="confirmPassword" mb={3} isInvalid={!!errors.confirmPassword}>
                <FormLabel htmlFor="confirmPassword">Confirme sua senha</FormLabel>
                <Input
                  autoComplete="off"
                  type="password"
                  placeholder="Digite novamente a sua senha"
                  {...register('confirmPassword')}
                />
                <>
                  {!!errors.confirmPassword && (
                    <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                  )}
                </>
              </FormControl>

              <input
                type="hidden"
                id="token"
                value={query?.passwordToken}
                defaultValue={query?.passwordToken}
                {...register('token')}
              />

              <Flex mt={6} mb={4} justify="center">
                <Button
                  maxW="245px"
                  type="submit"
                  form="reset-password"
                  isLoading={isSubmitting}
                  loadingText="Enviando..."
                >
                  Continuar
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

type valuesTypes = {
  token: string
  password: string
  confirmPassword: string
}
