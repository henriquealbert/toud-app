import type { NextPage } from 'next'
import { Flex, Heading, Text, SimpleGrid, Img } from '@chakra-ui/react'

import { SignUpForm } from 'components/SignUpForm'
import { ToudLogo } from 'components/shared/ToudLogo'

const SignUpPage: NextPage = () => (
  <SimpleGrid columns={2} minH="100vh">
    <Flex direction="column" flex="1">
      <ToudLogo m={4} />

      <Flex direction="column" maxW="438px" mx="auto" justify="center" flex={1}>
        <Heading color="purple.800" fontSize="3xl" mb={3}>
          Crie sua conta agora
        </Heading>
        <Text color="text" mb={3}>
          Olá, crie sua conta na Toud e começe a vincular seus anuncios para milhares de pessoas
          usando infuencers reais.
        </Text>
        <SignUpForm />
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

export default SignUpPage
