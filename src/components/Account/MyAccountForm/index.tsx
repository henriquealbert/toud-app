import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { PhoneInput } from 'components/shared/PhoneInput'
import { useAuth } from 'contexts/AuthContext'
import { api } from 'lib/api'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { myAccountValidator } from './helpers'
import { MyAccountFormValues } from './types'

export const MyAccountForm = () => {
  const { user } = useAuth()
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { isSubmitting, errors }
  } = useForm<MyAccountFormValues>({
    resolver: yupResolver(myAccountValidator),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      currentPassword: '',
      newPassword: ''
    }
  })

  const submitForm = async (values: MyAccountFormValues) => {
    if (values.currentPassword.length > 0 && !values.newPassword.length) {
      return setError('newPassword', {
        message: 'Campo obrigatório',
        type: 'client'
      })
    }

    if (values.newPassword.length > 0 && !values.currentPassword.length) {
      return setError('currentPassword', {
        message: 'Campo obrigatório',
        type: 'client'
      })
    }

    const { errors } = (await api.put(`/users/${user?.id}`, values, {
      headers: {
        Authorization: `Bearer ${session?.accessToken as string}`
      }
    })) as any

    if (errors) {
      setError('newPassword', { message: errors?.newPassword?.message, type: 'server' })
      setError('currentPassword', { message: errors?.currentPassword?.message, type: 'server' })
      return
    }
    setValue('currentPassword', '')
    setValue('newPassword', '')
    queryClient.invalidateQueries('me')
    toast({
      title: 'Dados atualizados!',
      description: 'Seus dados foram atualizados com sucesso!',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right'
    })
  }

  return (
    <Flex direction="column" as="form" onSubmit={handleSubmit(submitForm)} maxW={{ lg: '90%' }}>
      <Flex gap={6} flexWrap={{ base: 'wrap', lg: 'initial' }}>
        <FormControl id="name" mb={3} minW={{ lg: '200px' }} isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Nome</FormLabel>
          <Input
            variant="outlineWhite"
            type="name"
            placeholder="Digite aqui seu nome"
            {...register('name')}
          />
          <>{!!errors.name && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}</>
        </FormControl>

        <FormControl id="email" mb={3} minW={{ lg: '200px' }} isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">E-mail</FormLabel>
          <Input
            variant="outlineWhite"
            type="email"
            placeholder="Digite aqui seu e-mail"
            {...register('email')}
          />
          <>{!!errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}</>
        </FormControl>

        <FormControl
          id="phoneNumber"
          mb={3}
          minW={{ lg: '200px' }}
          isInvalid={!!errors.phoneNumber}
        >
          <FormLabel htmlFor="phoneNumber">Número de Telefone</FormLabel>
          <PhoneInput
            variant="outlineWhite"
            placeholder="(DDD) 9 9999-9999"
            name="phoneNumber"
            control={control}
          />
          <>
            {!!errors.phoneNumber && (
              <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
            )}
          </>
        </FormControl>
      </Flex>

      <Flex mt={10} gap={6} flexWrap={{ base: 'wrap', lg: 'initial' }}>
        <FormControl id="currentPassword" mb={3} isInvalid={!!errors.currentPassword}>
          <FormLabel htmlFor="currentPassword">Senha atual</FormLabel>
          <Input
            variant="outlineWhite"
            type="password"
            placeholder="Digite sua senha atual"
            {...register('currentPassword')}
          />
          <>
            {!!errors.currentPassword && (
              <FormErrorMessage>{errors.currentPassword?.message}</FormErrorMessage>
            )}
          </>
        </FormControl>

        <FormControl id="newPassword" mb={3} isInvalid={!!errors.newPassword}>
          <FormLabel htmlFor="newPassword">Nova senha</FormLabel>
          <Input
            variant="outlineWhite"
            type="password"
            placeholder="Crie uma nova senha"
            {...register('newPassword')}
          />
          <>
            {!!errors.newPassword && (
              <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
            )}
          </>
        </FormControl>
      </Flex>

      <Button
        type="submit"
        isLoading={isSubmitting}
        loadingText="Salvando..."
        maxW={{ lg: '245px' }}
        mt={{ base: 8, lg: 24 }}
        mb={{ base: 8, lg: 0 }}
      >
        Salvar
      </Button>
    </Flex>
  )
}
