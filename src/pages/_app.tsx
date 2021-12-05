import Head from 'next/head'
import type { AppProps } from 'next/app'
import { CustomThemeProvider } from 'theme'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Toud</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <CustomThemeProvider>
          <Component {...pageProps} />
        </CustomThemeProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp
