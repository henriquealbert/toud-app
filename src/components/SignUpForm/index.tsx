import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { FormControl, Input, FormLabel, Checkbox, Button, Text, Box } from '@chakra-ui/react'

import { api } from 'lib/api'

export const SignUpForm = () => {
  const [submitError, setSubmitError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

  const handleSignUp = async (values: valuesTypes) => {
    const { error } = (await api.post('/users', { ...values, username: values.email })) as any

    if (error) {
      setSubmitError(error.message)
    }

    await signIn('credentials', {
      user: JSON.stringify({
        identifier: values.email,
        password: values.password
      })
    })
  }

  return (
    <Box as="form" onSubmit={handleSubmit(handleSignUp)}>
      <FormControl id="name" mb={6}>
        <FormLabel htmlFor="name">Nome</FormLabel>
        <Input type="name" {...register('name')} />
      </FormControl>

      <FormControl id="email" mb={6}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input type="email" {...register('email')} />
      </FormControl>

      <FormControl id="password" mb={6}>
        <FormLabel htmlFor="password">Senha</FormLabel>
        <Input type="password" {...register('password')} />
      </FormControl>

      <FormControl id="phoneNumber" mb={6}>
        <FormLabel htmlFor="phoneNumber">Número de Telefone</FormLabel>
        <Input type="tel" {...register('phoneNumber')} />
      </FormControl>

      <Checkbox id="terms" {...register('terms')} mb={6}>
        <Text as="span" fontSize="xs">
          Estou de acordo com Termos de serviço e Política de privacidade.
        </Text>
      </Checkbox>

      {submitError && <Text color="red.500">{submitError}</Text>}

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
