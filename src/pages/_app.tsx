import Head from 'next/head'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import 'theme/global.css'

import { CustomThemeProvider } from 'theme'
import { AuthProvider } from 'contexts/AuthContext'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Toud</title>
    </Head>
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CustomThemeProvider>
            <Component {...pageProps} />
          </CustomThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  </>
)

export default MyApp
