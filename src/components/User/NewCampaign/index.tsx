import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { FormStep1 } from './Step1/FormStep1'
import { FormStep2 } from './Step2/FormStep2'
import { FormStep3 } from './Step3/FormStep3'
import { ReviewCampaign } from './Step4/ReviewCampaign'
import { StepsProgress } from './StepsProgress'
import { NewCampaignDataType, NewCampaignProps } from './types'

export const NewCampaign = ({ campaignData }: NewCampaignProps) => {
  const [step, setStep] = useState(campaignData?.step || 1)
  const [data, setData] = useState<NewCampaignDataType | undefined>(campaignData)

  const handleNextStep = (data: NewCampaignDataType) => {
    setData((prev) => ({ ...prev, ...data }))
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  return (
    <Flex justifyContent="center">
      <Flex flexDir="column" maxW="5xl" w="full">
        <StepsProgress step={step} />

        {step === 1 && <FormStep1 handleNextStep={handleNextStep} data={data} />}
        {step === 2 && (
          <FormStep2 handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} />
        )}
        {step === 3 && (
          <FormStep3 handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} />
        )}
        {step === 4 && (
          <ReviewCampaign
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
            data={data}
          />
        )}
      </Flex>
    </Flex>
  )
}
