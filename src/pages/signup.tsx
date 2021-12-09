import { Flex, Heading, Text, SimpleGrid, Img, Box } from '@chakra-ui/react'
import { SignUpForm } from 'components/SignUpForm'
import NextLink from 'next/link'

const SignUpPage = () => {
  return (
    <SimpleGrid columns={2} minH="100vh">
      <Flex direction="column" flex="1">
        <NextLink href="/" passHref>
          <Box as="a" w="fit-content">
            <Img src="/img/logo.svg" alt="Toud logo" w="86px" h="28px" m={4} />
          </Box>
        </NextLink>

        <Flex direction="column" maxW="438px" mx="auto">
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
}

export default SignUpPage
