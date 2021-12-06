import { Flex, Heading, Text, SimpleGrid, Img } from '@chakra-ui/react'
import { SignUpForm } from 'components/SignUpForm'

const SignUpPage = () => {
  return (
    <SimpleGrid columns={2}>
      <Flex direction="column" flex="1">
        <Img src="/img/logo.svg" alt="" w="86px" h="28px" m={12} />
        <Flex direction="column" maxW="md" mx="auto">
          <Heading color="purple.800" fontSize="3xl" mb={5}>
            Crie sua conta agora
          </Heading>
          <Text color="text" mb={10}>
            Olá, crie sua conta na Toud e começe a vincular seus anuncios para milhares de pessoas
            usando infuencers reais.
          </Text>
          <SignUpForm />
        </Flex>
      </Flex>

      <Flex w="full" h="full" bg="gray.100">
        imagem
      </Flex>
    </SimpleGrid>
  )
}

export default SignUpPage
