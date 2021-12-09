import { FC } from 'react'
import { extendTheme, withDefaultColorScheme, ChakraProvider } from '@chakra-ui/react'

// Foundation
import { typography } from './foundation/typography'
import { colors } from './foundation/colors'

// Components
import { customButton } from './components/customButton'
import { customFormLabel } from './components/customFormLabel'
import { customInput } from './components/customInput'
import { customFormErrorMessage } from './components/customFormErrorMessage'

const customTheme = extendTheme(
  {
    colors,
    ...typography,
    components: {
      Button: customButton,
      FormLabel: customFormLabel,
      Input: customInput,
      FormError: customFormErrorMessage
    }
  },
  withDefaultColorScheme({ colorScheme: 'purple' })
)

export const CustomThemeProvider: FC = ({ children }) => (
  <ChakraProvider resetCSS theme={customTheme}>
    {children}
  </ChakraProvider>
)
