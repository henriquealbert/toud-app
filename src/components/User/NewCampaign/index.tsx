import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { FormStep1 } from './Step1/FormStep1'

export const NewCampaign = () => {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({})

  const handleNextStep = (data: any) => {
    setData((prev) => ({ ...prev, ...data }))
    setStep(step + 1)
  }

  return <Flex>{step === 1 && <FormStep1 handleNextStep={handleNextStep} />}</Flex>
}
