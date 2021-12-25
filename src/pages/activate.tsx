import type { GetServerSideProps } from 'next'
import { Loader } from 'components/shared/Loader'
import { verifyAccount } from 'domain/auth/verifyAccount'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const ActivateAccount = ({ data, error }: propsTypes) => {
  const toast = useToast()
  const { replace } = useRouter()

  useEffect(() => {
    if (data) {
      toast({
        title: 'Conta verificada!',
        description: 'Sua conta foi verificada com sucesso! Faça login para continuar.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
    if (error) {
      toast({
        title: 'Erro ao verificar conta!',
        description: 'Não foi possível verificar sua conta. Tente novamente mais tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
    replace('/login')
  }, [data, error, toast, replace])

  return <Loader />
}

export default ActivateAccount

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query
  const { data, error } = await verifyAccount({ token: token as string })

  if (error) {
    return {
      props: {
        error: error.errors
      }
    }
  }
  return {
    props: { data }
  }
}

type propsTypes = {
  data?: any
  error?: any
}
