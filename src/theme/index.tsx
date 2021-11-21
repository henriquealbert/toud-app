import { FC } from 'react'
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

const customTheme = extendTheme(
  {
    colors: {},
  },
  withDefaultColorScheme({ colorScheme: 'purple' }),
)

export const CustomThemeProvider: FC = ({ children }) => (
  <ChakraProvider resetCSS theme={customTheme}>
    {children}
  </ChakraProvider>
)
