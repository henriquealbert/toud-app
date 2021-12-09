import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import {
  FormControl,
  Input,
  FormLabel,
  Checkbox,
  Button,
  Text,
  Box,
  FormErrorMessage
} from '@chakra-ui/react'

import { api } from 'lib/api'
import { signUpValidator } from './validations'
import { PhoneInput } from 'components/shared/PhoneInput'
import { useRouter } from 'next/router'

export const SignUpForm = () => {
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, errors }
  } = useForm({
    resolver: yupResolver(signUpValidator)
  })

  const handleSignUp = async (values: valuesTypes) => {
    if (Object.keys(errors).length > 0) return

    const { error } = (await api.post('/users', { ...values, username: values.email })) as any

    if (error.message === 'Email already taken') {
      setError('email', { message: 'Email já cadastrado.' })
      return
    }

    try {
      await signIn('credentials', {
        user: JSON.stringify({
          identifier: values.email,
          password: values.password
        })
      })
      push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit(handleSignUp)}>
      <FormControl id="name" mb={3} isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Nome</FormLabel>
        <Input
          type="name"
          placeholder="Digite aqui o seu nome ou o nome da sua empresa"
          {...register('name')}
        />
        <>{!!errors.name && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}</>
      </FormControl>

      <FormControl id="email" mb={3} isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input type="email" placeholder="Digite aqui seu melhor e-mail" {...register('email')} />
        <>{!!errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}</>
      </FormControl>

      <FormControl id="password" mb={3} isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Senha</FormLabel>
        <Input type="password" placeholder="Crie aqui sua senha" {...register('password')} />
        <>{!!errors.password && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}</>
      </FormControl>

      <FormControl id="phoneNumber" mb={3} isInvalid={!!errors.phoneNumber}>
        <FormLabel htmlFor="phoneNumber">Número de Telefone</FormLabel>
        <PhoneInput placeholder="(DDD) 9 9999-9999" name="phoneNumber" control={control} />
        <>
          {!!errors.phoneNumber && (
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          )}
        </>
      </FormControl>

      <Checkbox id="terms" {...register('terms')} mb={6} isInvalid={!!errors.terms}>
        <Text as="span" fontSize="xs" color="text" fontWeight="light">
          Estou de acordo com Termos de serviço e Política de privacidade.
        </Text>
      </Checkbox>

      <Button type="submit" isLoading={isSubmitting} isDisabled={isSubmitting}>
        Criar conta
      </Button>
    </Box>
  )
}

type valuesTypes = {
  name: string
  email: string
  password: string
  phoneNumber: string
  terms: boolean
}
