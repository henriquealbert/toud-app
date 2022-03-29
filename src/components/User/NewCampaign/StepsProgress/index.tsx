import { Box, Text, Progress } from '@chakra-ui/react'

export const StepsProgress = ({ step = 1 }: stepsControlProps) => {
  const currentStep = steps.find((s) => s.value === step)?.label
  return (
    <Box my={4}>
      <Box maxW="220px" mb={4}>
        <Progress
          value={step}
          max={steps.length}
          borderRadius="base"
          size="xs"
          colorScheme="purple"
          bg="gray.300"
        />
      </Box>
      <Text color="text" fontSize="sm">
        Etapa {step} de {steps.length} -{' '}
        <Text as="span" color="text" fontWeight="bold">
          {currentStep}
        </Text>
      </Text>
    </Box>
  )
}

const steps = [
  {
    label: 'Informações iniciais',
    value: 1
  },
  {
    label: 'Veiculação',
    value: 2
  },
  {
    label: 'Investimento',
    value: 3
  },
  {
    label: 'Resumo',
    value: 4
  }
]

type stepsControlProps = {
  step: number
}
