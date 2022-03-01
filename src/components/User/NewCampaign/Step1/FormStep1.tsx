import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

export const FormStep1 = ({ handleNextStep }: FormStep1Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { name: '' }
  })

  const handleSubmitForm = async (values: formValues) => {
    console.log(values)
  }
  return (
    <Flex as="form" onSubmit={handleSubmit(handleSubmitForm)} flex={1}>
      <Box w="full">
        <FormControl id="name" mb={3} isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Nome da campanha</FormLabel>
          <Input
            variant="outlineWhite"
            type="text"
            placeholder="Digite o nome da campanha"
            autoComplete="off"
            {...register('name')}
          />
          <>{!!errors.name && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}</>
        </FormControl>
        <FormControl id="name" mb={3} isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Nome da campanha</FormLabel>
          <Input
            variant="outlineWhite"
            type="text"
            placeholder="Digite o nome da campanha"
            autoComplete="off"
            {...register('name')}
          />
          <>{!!errors.name && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}</>
        </FormControl>
      </Box>
      <Box w="full" ml={5}>
        <FormControl id="name" mb={3} isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Nome da campanha</FormLabel>
          <Input
            variant="outlineWhite"
            type="text"
            placeholder="Digite o nome da campanha"
            autoComplete="off"
            {...register('name')}
          />
          <>{!!errors.name && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}</>
        </FormControl>
        <FormControl id="name" mb={3} isInvalid={!!errors.name}>
          <FormLabel htmlFor="name" mb={4}>
            Localização em que será feita a divulgação
          </FormLabel>
          <RadioGroup>
            <Stack direction="column" spacing={5}>
              <Radio value="1">Brasil todo</Radio>
              <Radio
                value="2"
                bg="white"
                borderColor="border"
                boxShadow="2px 2px 4px rgba(166, 166, 166, 0.2)"
              >
                Em um estado específico
              </Radio>
            </Stack>
          </RadioGroup>
          <>{!!errors.name && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}</>
        </FormControl>
      </Box>
    </Flex>
  )
}

type FormStep1Props = {
  handleNextStep: (data: any) => void
}
type formValues = {
  name: string
}
