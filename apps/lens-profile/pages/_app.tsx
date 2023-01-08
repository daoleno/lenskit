import { LensKitProvider } from '@lenskit/react'
import '@lenskit/react/styles.css'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
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
  return (
    <WagmiConfig client={wagmiClient}>
      <LensKitProvider apiEndpoint="https://api.lens.dev">
        <Component {...pageProps} />
      </LensKitProvider>
    </WagmiConfig>
  )
}
