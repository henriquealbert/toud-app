import { ReactNode, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Loader } from '../Loader'
import { useAuth } from 'contexts/AuthContext'

export const PrivateLayout = ({ children }: props) => {
  const { push } = useRouter()
  const { isLoading, user } = useAuth()

  useEffect(() => {
    if (!user && !isLoading) {
      push('/login')
    }
  }, [isLoading, push, user])

  if (isLoading) return <Loader />

  return <Flex direction="column">{children}</Flex>
}

type props = {
  children: ReactNode
}
