import { Flex, Heading, Text, SimpleGrid, Img, Box } from '@chakra-ui/react'
import { LoginForm } from 'components/LoginForm'
import NextLink from 'next/link'

const LoginPage = () => (
  <SimpleGrid columns={2} minH="100vh">
    <Flex direction="column" flex="1">
      <NextLink href="/" passHref>
        <Box as="a" w="fit-content">
          <Img src="/img/logo.svg" alt="Toud logo" w="86px" h="28px" m={4} />
        </Box>
      </NextLink>

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
