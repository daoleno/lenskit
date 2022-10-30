import { LensKitProvider } from '@lenskit/react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LensKitProvider>
      <Component {...pageProps} />
    </LensKitProvider>
  )
}
