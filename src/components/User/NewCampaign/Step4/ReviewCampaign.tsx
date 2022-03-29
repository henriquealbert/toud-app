import { Flex } from '@chakra-ui/react'
import { FooterButtons } from '../FooterButtons'
import { FormStepProps } from '../types'

export const ReviewCampaign = ({ handlePrevStep }: FormStepProps) => {
  return (
    <Flex as="form" direction="column" flex={1}>
      <FooterButtons isSubmitting={false} handlePrevStep={handlePrevStep} />
    </Flex>
  )
}
