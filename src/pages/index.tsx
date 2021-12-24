import type { NextPage } from 'next'
import { PrivateLayout } from 'components/shared/PrivateLayout'
import { Box, Heading, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getCampaigns } from 'api/campaign/getCampaigns'
import { useAuth } from 'contexts/AuthContext'

const Home: NextPage = () => {
  const { user } = useAuth()
  const { data } = useQuery('campaigns', async () => await getCampaigns({ userId: user.id }))
  return (
    <PrivateLayout>
      <Heading fontSize="3xl" color="purple.800" mb={2}>
        Acompanhamento
      </Heading>
      <Text color="text" mb={6}>
        Acompanhe as campanhas que foram criadas para a sua empresa
      </Text>
      <Box
        bgColor="white"
        boxShadow="0px 3px 8px 4px rgba(193, 212, 255, 0.25)"
        borderRadius="lg"
      ></Box>
    </PrivateLayout>
  )
}

export default Home
