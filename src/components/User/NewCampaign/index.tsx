import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { FormStep1 } from './Step1/FormStep1'
import { FormStep2 } from './Step2/FormStep2'
import { StepsProgress } from './StepsProgress'

export const NewCampaign = () => {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({})

  const handleNextStep = (data: any) => {
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
          <FormStep2 handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />
        )}
      </Flex>
    </Flex>
  )
}
