import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import {
  FormControl,
  Flex,
  Input,
  FormLabel,
  Button,
  Box,
  FormErrorMessage
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { loginValidator } from './validations'
import { useRouter } from 'next/router'

export const LoginForm = () => {
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors }
  } = useForm({
    resolver: yupResolver(loginValidator)
  })

  const handleSignUp = async (values: valuesTypes) => {
    if (Object.keys(errors).length > 0) return

    const { error } = (await signIn('credentials', {
      user: JSON.stringify({
        identifier: values.email,
        password: values.password
      }),
      redirect: false
    })) as any

    if (error) {
      setError('email', { message: error, type: 'server' })
      setError('password', { message: error, type: 'server' })
      return
    }

    push('/dashboard')
  }

  return (
    <Box as="form" onSubmit={handleSubmit(handleSignUp)}>
      <FormControl id="email" mb={3} isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">E-mail</FormLabel>
        <Input type="email" placeholder="Digite aqui seu e-mail" {...register('email')} />
        <>{!!errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}</>
      </FormControl>

      <FormControl id="password" mb={3} isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Senha</FormLabel>
        <Input type="password" placeholder="Digite aqui sua senha" {...register('password')} />
        <>{!!errors.password && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}</>
      </FormControl>
      <Flex justify="flex-end">
        <NextLink href="/forgot-password" passHref>
          <Button
            as="a"
            variant="link"
            w="auto"
            mb={10}
            fontSize="sm"
            textTransform="none"
            fontWeight="normal"
            cursor="pointer"
          >
            Esqueceu sua senha?
          </Button>
        </NextLink>
      </Flex>

      <Button type="submit" isLoading={isSubmitting} isDisabled={isSubmitting}>
        Entrar
      </Button>
      <NextLink href="/signup" passHref>
        <Button as="a" cursor="pointer" mt={3} variant="secondary">
          Criar conta
        </Button>
      </NextLink>
    </Box>
  )
}

type valuesTypes = {
  email: string
  password: string
}
