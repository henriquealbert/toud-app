import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import NextLink from 'next/link'

const Home: NextPage = () => {
  const { data } = useSession()
  console.log(data)

  return (
    <Flex direction="column" h="100vh" align="center" justify="center">
      <Heading mb={10}>Toud App</Heading>
      {data && (
        <Text my={4}>
          Logado como: <strong>{data?.user?.email}</strong>
        </Text>
      )}
      <NextLink href="/login">
        <Button as="a" w="400px" mb={4} cursor="pointer">
          Entrar
        </Button>
      </NextLink>
      <NextLink href="/signup">
        <Button as="a" variant="secondary" w="400px" cursor="pointer">
          Criar conta
        </Button>
      </NextLink>
    </Flex>
  )
}

export default Home
