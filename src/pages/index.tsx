import { Flex } from '@chakra-ui/react'
import { PrivateLayout } from 'components/shared/PrivateLayout'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <PrivateLayout>
      <Flex direction="column" h="100vh" align="center" justify="center">
        oi
      </Flex>
    </PrivateLayout>
  )
}

export default Home
