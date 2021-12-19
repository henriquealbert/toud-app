import type { NextPage } from 'next'
import { PrivateLayout } from 'components/shared/PrivateLayout'
import { Box } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <PrivateLayout>
      <Box bgColor="white" h="calc(100vh - 60px)">
        Acompanhamento
      </Box>
    </PrivateLayout>
  )
}

export default Home
