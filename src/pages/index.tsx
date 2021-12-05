import { Button, Flex, Heading } from '@chakra-ui/react'
import { api } from 'lib/api'
import type { NextPage } from 'next'
import { useSession, signIn } from 'next-auth/react'

const Home: NextPage = () => {
  const { data, status } = useSession()
  console.log(data)

  const handleSignUp = async ({ email, password }: { email: string; password: string }) => {
    const res = await api.post('/users', {
      email: email,
      password: password,
      username: email
    })
    return res.data
  }

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
      <Button variant="secondary" w="400px">
        Criar conta
      </Button>
    </Flex>
  )
}

export default Home
