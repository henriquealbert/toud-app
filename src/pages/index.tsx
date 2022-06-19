import { PrivateLayout } from 'components/shared/PrivateLayout'
import type { NextPage } from 'next'
import { Box, Heading, Text } from '@chakra-ui/react'
import { CampaignList } from 'components/User/CampaignList'

const Home: NextPage = () => {
  return (
    <PrivateLayout>
      <Heading display={{ base: 'none', lg: 'block' }} fontSize="3xl" color="purple.800" mb={2}>
        Acompanhamento
      </Heading>
      <Text display={{ base: 'none', lg: 'block' }} color="text" mb={6}>
        Acompanhe as campanhas que foram criadas para a sua empresa
      </Text>
      <Box
        bgColor={{ lg: 'white' }}
        boxShadow={{ lg: '0px 3px 8px 4px rgba(193, 212, 255, 0.25)' }}
        borderRadius={{ lg: 'lg' }}
        p={{ lg: 8 }}
      >
        <CampaignList />
      </Box>
    </PrivateLayout>
  )
}

export default Home
