import type { NextPage } from 'next'
import { Flex, Heading, Text, SimpleGrid, Img } from '@chakra-ui/react'

import { LoginForm } from 'components/Auth/LoginForm'
import { ToudLogo } from 'components/shared/ToudLogo'

const LoginPage: NextPage = () => (
  <SimpleGrid columns={2} minH="100vh">
    <Flex direction="column" flex="1">
      <ToudLogo m={4} />

      <Flex direction="column" w="438px" mx="auto" h="calc(100% - 150px)" justify="center">
        <Heading color="purple.800" fontSize="3xl" mb={3}>
          Login
        </Heading>
        <Text color="text" mb={10}>
          Olá, acesse sua conta na Toud.
        </Text>
        <LoginForm />
      </Flex>
    </Flex>

    <Img
      src="/img/signup-banner.jpeg"
      h="100vh"
      w="full"
      objectFit="cover"
      objectPosition="center"
    />
  </SimpleGrid>
)

export default LoginPage
