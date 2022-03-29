import { Button, Flex } from '@chakra-ui/react'
import { FooterButtonsProps } from './types'

export const FooterButtons = ({
  isSubmitting = false,
  handlePrevStep,
  canGoBack = true
}: FooterButtonsProps) => (
  <Flex mt={12}>
    {canGoBack && (
      <Button variant="outline" mr={20} w="245px" onClick={handlePrevStep}>
        Voltar
      </Button>
    )}
    <Button type="submit" isLoading={isSubmitting} loadingText="Salvando..." w="245px">
      Salvar
    </Button>
  </Flex>
)
