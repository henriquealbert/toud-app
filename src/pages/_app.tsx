import type { AppProps } from 'next/app'
import Head from 'next/head'
import { CustomThemeProvider } from 'theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Toud</title>
      </Head>
      <CustomThemeProvider>
        <Component {...pageProps} />
      </CustomThemeProvider>
    </>
  )
}

export default MyApp
