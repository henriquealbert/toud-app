import { Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { FooterButtons } from '../FooterButtons'
import { FormStepProps } from '../types'
import { formatReviewData } from './helpers'

export const ReviewCampaign = ({ handlePrevStep, data }: FormStepProps) => {
  const reviewData = formatReviewData(data)
  return (
    <Flex direction="column" flex={1}>
      <Flex
        p={20}
        bgColor="white"
        borderRadius="lg"
        boxShadow="0px 3px 8px 4px rgba(193, 212, 255, 0.25)"
        direction="column"
      >
        <Heading as="h2" fontWeight="bold" fontSize="xl" mb={8}>
          Resumo da campanha
        </Heading>
        <SimpleGrid columns={4} gap={8}>
          {reviewData.map((item) => (
            <Flex key={item.text} direction="column" color="text">
              <Text fontSize="xs" mb={2}>
                {item?.text}
              </Text>
              <Text fontSize="sm" fontWeight="bold">
                {item.value}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Flex>
      <FooterButtons isSubmitting={false} handlePrevStep={handlePrevStep} canSubmit={false}>
        <Button type="button" variant="success" w="245px">
          Finalizar
        </Button>
      </FooterButtons>
    </Flex>
  )
}
