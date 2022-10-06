import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { PhoneInput } from 'components/shared/PhoneInput'
import { signupValidator } from 'domain/auth/validation'
import { api } from 'lib/api'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export const SignUpForm = () => {
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, errors }
  } = useForm<valuesTypes>({
    resolver: yupResolver(signupValidator),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      terms: false
    }
  })

  const handleSignUp = async (values: valuesTypes) => {
    if (Object.keys(errors).length > 0) return

    const { error } = (await api.post('/auth/signup', values)) as any

    if (error) {
      setError('email', { message: 'Email já cadastrado.' })
      return
    }

    const { error: signInError } = (await signIn('credentials', {
      user: JSON.stringify({
        email: values.email,
        password: values.password
      }),
      redirect: false
    })) as any

    if (signInError) {
      setError('email', { message: signInError, type: 'server' })
      setError('password', { message: signInError, type: 'server' })
      return
    } else {
      push('/bemvindo')
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit(handleSignUp)}>
      <FormControl id="name" mb={5} isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Nome</FormLabel>
        <Input
          type="name"
          placeholder="Digite aqui o seu nome ou o nome da sua empresa"
          {...register('name')}
        />
        <>{!!errors.name && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}</>
      </FormControl>

      <FormControl id="email" mb={5} isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">E-mail</FormLabel>
        <Input type="email" placeholder="Digite aqui seu melhor e-mail" {...register('email')} />
        <>{!!errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}</>
      </FormControl>

      <FormControl id="password" mb={5} isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Senha</FormLabel>
        <Input type="password" placeholder="Crie aqui sua senha" {...register('password')} />
        <>{!!errors.password && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}</>
      </FormControl>

      <FormControl id="phoneNumber" mb={5} isInvalid={!!errors.phoneNumber}>
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
