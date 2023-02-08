import { LensKitProvider } from '@lenskit/react'
import '@lenskit/react/styles.css'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import { WagmiConfig, chain, configureChains, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

import './globals.css'
// const vt333 = Public_Sans({
//   weight: '400',
//   subsets: ['latin'],
// })

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'LensKit demo',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(
    function sendGoatCounterEventsOnRoute() {
      const handleRouteChange = (path: string) => {
        // @ts-ignore
        window?.goatcounter?.count?.({
          path,
        })
      }
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    },
    [router.events]
  )

  return (
    <>
      <Script
        async
        data-goatcounter="https://lens-profile.goatcounter.com/count"
        src="//gc.zgo.at/count.js"
        strategy="afterInteractive"
      />

      <WagmiConfig client={wagmiClient}>
        <LensKitProvider apiEndpoint="https://api.lens.dev">
          <Component {...pageProps} />
        </LensKitProvider>
      </WagmiConfig>
    </>
  )
}
