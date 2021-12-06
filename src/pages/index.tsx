import { Button, Flex, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useSession, signIn } from 'next-auth/react'
import NextLink from 'next/link'

const Home: NextPage = () => {
  const { data } = useSession()
  console.log(data)

  return (
    <Flex direction="column" h="100vh" align="center" justify="center">
      <Heading mb={10}>Toud App</Heading>
      <Button
        w="400px"
        mb={4}
        onClick={() =>
          signIn('credentials', {
            user: JSON.stringify({
              identifier: 'henrique@email.com',
              password: '123456'
            })
          })
        }
      >
        Entrar
      </Button>
      <NextLink href="/signup">
        <Button as="a" variant="secondary" w="400px" cursor="pointer">
          Criar conta
        </Button>
      </NextLink>
    </Flex>
  )
}

export default Home
