import type { NextPage } from 'next'
import { PrivateLayout } from 'components/shared/PrivateLayout'
import { Box } from '@chakra-ui/react'

const NewCampaignPage: NextPage = () => {
  return (
    <PrivateLayout>
      <Box bgColor="white" h="calc(100vh - 60px)">
        Nova campanha
      </Box>
    </PrivateLayout>
  )
}

export default NewCampaignPage
