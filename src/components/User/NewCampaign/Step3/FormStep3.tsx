import { Button, Flex } from '@chakra-ui/react'

export const FormStep3 = ({ handleNextStep, handlePrevStep, data }: any) => {
  return (
    <Flex as="form" direction="column" flex={1}>
      <Flex mt={12}>
        <Button variant="outline" mr={20} w="245px" onClick={handlePrevStep}>
          Voltar
        </Button>
        <Button
          type="submit"
          //  isLoading={isSubmitting}
          loadingText="Salvando..."
          w="245px"
        >
          Salvar
        </Button>
      </Flex>
    </Flex>
  )
}
