import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
  ModalHeader,
  Heading,
  Flex
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from 'lib/api'
import yup from 'lib/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const ForgotPassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { isSubmitting, errors }
  } = useForm<valuesTypes>({
    resolver: yupResolver(
      yup.object({
        email: yup.string().email().required()
      })
    ),
    defaultValues: {
      email: ''
    }
  })

  const submitForm = async (values: valuesTypes) => {
    const { errors } = (await api.post('/auth/forgot-password', values)) as any
    if (errors) {
      return alert(errors.email.message)
    }
    setShowSuccess(true)
  }

  const handleClose = () => {
    clearErrors()
    reset()
    setShowSuccess(false)
    onClose()
  }
  return (
    <>
      <Button onClick={onOpen} variant="link" mb={10} fontSize="sm">
        Esqueceu sua senha?
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Recuperar senha</ModalHeader>
          {!showSuccess && (
            <ModalBody>
              <Text color="text" mb={8}>
                Digite seu e-mail para enviarmos um link para você redefinir sua senha.
              </Text>

              <Box as="form" id="forgot-password" onSubmit={handleSubmit(submitForm)}>
                <FormControl id="email" mb={3} isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Input
                    autoComplete="off"
                    type="email"
                    placeholder="Digite aqui seu e-mail"
                    {...register('email')}
                  />
                  <>
                    {!!errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
                  </>
                </FormControl>

                <Flex mt={6} mb={4}>
                  <Button variant="outline" mr={3} onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    form="forgot-password"
                    isLoading={isSubmitting}
                    loadingText="Enviando..."
                  >
                    Continuar
                  </Button>
                </Flex>
              </Box>
            </ModalBody>
          )}

          {showSuccess && (
            <ModalBody mb={8} mt={2}>
              <Heading fontWeight="bold" color="text" fontSize="lg" mb={2}>
                Por favor, verifique seu e-mail.
              </Heading>
              <Text color="text">
                Enviamos um e-mail para redefinir sua senha se houver uma conta correspondente em
                nosso sistema. Siga as instruções no e-mail para concluir o processo.
              </Text>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

type valuesTypes = {
  email: string
}
