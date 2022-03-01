import { Flex } from '@chakra-ui/react'
import { Activity } from 'domain/activity/types'
import { useState } from 'react'
import { FormStep1 } from './Step1/FormStep1'

export const NewCampaign = ({ activities }: NewCampaignProps) => {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({})

  const handleNextStep = (data: any) => {
    setData((prev) => ({ ...prev, ...data }))
    setStep(step + 1)
  }

  return (
    <Flex justifyContent="center">
      <Flex maxW="5xl" w="full">
        {step === 1 && <FormStep1 handleNextStep={handleNextStep} activities={activities} />}
      </Flex>
    </Flex>
  )
}

type NewCampaignProps = {
  activities: Activity[]
}
