import { Button, Flex, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Flex direction='column' h='100vh' align='center' justify='center'>
      <Heading mb={10}>Toud App</Heading>
      <Button w='400px' mb={4}>Login</Button>
      <Button variant='outline' w='400px'>Sign in</Button>
    </Flex>
  )
}

export default Home
