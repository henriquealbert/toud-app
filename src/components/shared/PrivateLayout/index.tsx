import { ReactNode, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Loader } from '../Loader'
import { useAuth } from 'contexts/AuthContext'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

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
      <Flex direction="column" minH="100vh" bgColor="gray.100">
        <Header />
        <Flex>
          <Sidebar />

          <Flex direction="column" w="full" mx={10} h="full" minH="calc(100vh - 60px)">
            {children}
          </Flex>
        </Flex>
      </Flex>
    )
  }

  return <Loader />
}

type props = {
  children: ReactNode
}
