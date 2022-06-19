import { Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { useAuth } from 'contexts/AuthContext'
import { redirectToCheckout } from 'lib/stripe'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { FooterButtons } from '../FooterButtons'
import { FormStepProps } from '../types'
import { formatReviewData } from './helpers'

export const ReviewCampaign = ({ handlePrevStep, data }: FormStepProps) => {
  const { user } = useAuth()
  const { data: session } = useSession()
  const reviewData = formatReviewData(data)
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const { error } = await redirectToCheckout({
      amount: data?.amount || 1,
      email: user?.email,
      token: session?.accessToken as string,
      campaignId: data?.id
    })
    setLoading(false)
    if (error) {
      alert(error.message)
    }
  }

  return (
    <Flex direction="column" flex={1} h="fit-content">
      <Flex
        p={{ base: 4, lg: 20 }}
        bgColor="white"
        borderRadius="lg"
        boxShadow="0px 3px 8px 4px rgba(193, 212, 255, 0.25)"
        direction="column"
      >
        <Heading as="h2" fontWeight="bold" fontSize="xl" mb={8}>
          Resumo da campanha
        </Heading>
        <SimpleGrid columns={{ base: 1, lg: 4 }} gap={{ base: 4, lg: 8 }}>
          {reviewData.map((item) => (
            <Flex
              key={item.text}
              direction={{ lg: 'column' }}
              alignItems={{ base: 'center', lg: 'initial' }}
              justifyContent={{ base: 'space-between', lg: 'flex-start' }}
              color="text"
            >
              <Text fontSize="xs" mb={{ lg: 2 }} fontWeight="bold" noOfLines={1}>
                {item?.text}
              </Text>
              <Text fontSize="sm" noOfLines={1}>
                {item.value}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Flex>
      <FooterButtons isSubmitting={isLoading} handlePrevStep={handlePrevStep} canSubmit={false}>
        <Button
          type="button"
          variant="success"
          w={{ lg: '245px' }}
          isLoading={isLoading}
          loadingText="Finalizando..."
          onClick={handleSubmit}
        >
          Finalizar
        </Button>
      </FooterButtons>
    </Flex>
  )
}
