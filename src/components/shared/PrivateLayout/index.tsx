import { Flex } from '@chakra-ui/react'
import { useAuth } from 'contexts/AuthContext'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { Loader } from '../Loader'
import { DesktopSidebar } from './DesktopSidebar'
import { Header } from './Header'
import { MobileTabBar } from './MobileTabBar'

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
          <DesktopSidebar />
          <MobileTabBar />

          <Flex
            direction="column"
            w="full"
            p={{ base: 4, lg: 8 }}
            h={{ base: 'calc(100vh - 75px - 60px)', lg: 'full' }}
            minH={{ lg: 'calc(100vh - 60px)' }}
            overflowY="auto"
          >
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
