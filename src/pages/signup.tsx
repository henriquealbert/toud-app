import { Flex, Heading, Img, SimpleGrid, Text } from '@chakra-ui/react'
import { SignUpForm } from 'components/Auth/SignUpForm'
import { ToudLogo } from 'components/shared/ToudLogo'
import type { NextPage } from 'next'

const SignUpPage: NextPage = () => (
  <SimpleGrid columns={{ base: 1, md: 2 }} minH="100vh" px={{ base: 8, md: 0 }}>
    <Flex direction="column" flex="1">
      <ToudLogo m={{ md: 4 }} mt={{ base: 8, md: 4 }} />

      <Flex
        direction="column"
        maxW={{ base: 'none', lg: '438px' }}
        w="full"
        mx={{ md: 'auto' }}
        h={{ base: 'full', md: 'calc(100% - 150px)' }}
        justify="center"
        px={{ md: 4, lg: 0 }}
      >
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
      display={{ base: 'none', md: 'block' }}
    />
  </SimpleGrid>
)

export default SignUpPage
