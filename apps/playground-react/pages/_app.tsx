import { ApolloClient, InMemoryCache } from '@apollo/client'
import { LensKitProvider } from '@lenskit/react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import '../styles/globals.css'

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'https://api-mumbai.lens.dev',
    cache: new InMemoryCache(),
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <LensKitProvider apolloClient={client}>
          <Component {...pageProps} />
        </LensKitProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
