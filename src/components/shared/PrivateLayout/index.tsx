import { ReactNode, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Loader } from '../Loader'
import { useAuth } from 'contexts/AuthContext'
import { Header } from './Header'

export const PrivateLayout = ({ children }: props) => {
  const { push } = useRouter()
  const { isLoading, user } = useAuth()

  useEffect(() => {
    if (!user && !isLoading) {
      push('/login')
    }
  }, [isLoading, push, user])

  if (user) {
    return (
      <Flex direction="column" minH="100vh">
        <Header />

        <Flex direction="column" w="90%" mx="auto">
          {children}
        </Flex>
      </Flex>
    )
  }

  return <Loader />
}

type props = {
  children: ReactNode
}
