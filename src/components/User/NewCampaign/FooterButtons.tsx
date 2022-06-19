import { Button, Flex } from '@chakra-ui/react'
import { FooterButtonsProps } from './types'

export const FooterButtons = ({
  isSubmitting = false,
  handlePrevStep,
  canGoBack = true,
  canSubmit = true,
  children
}: FooterButtonsProps) => (
  <Flex mt={12} direction={{ base: 'column-reverse', lg: 'row' }} gap={{ base: 2, lg: 0 }}>
    {canGoBack && (
      <Button
        variant="outline"
        mr={{ base: 4, lg: 20 }}
        w={{ base: 'full', lg: '245px' }}
        onClick={handlePrevStep}
      >
        Voltar
      </Button>
    )}
    {canSubmit && (
      <Button
        type="submit"
        isLoading={isSubmitting}
        loadingText="Salvando..."
        w={{ base: 'full', lg: '245px' }}
      >
        Salvar
      </Button>
    )}
    {children}
  </Flex>
)
