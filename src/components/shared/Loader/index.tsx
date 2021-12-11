import { Center, Spinner } from '@chakra-ui/react'

export const Loader = () => (
  <Center h="100vh">
    <Spinner size="xl" color="purple.500" emptyColor="purple.200" />
  </Center>
)
