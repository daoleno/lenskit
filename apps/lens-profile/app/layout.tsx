'use client'

import { LensKitProvider } from '@lenskit/react'
import '@lenskit/react/styles.css'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { WagmiConfig, chain, configureChains, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import './globals.css'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <main>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              <LensKitProvider apiEndpoint="https://api.lens.dev">{children}</LensKitProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </main>
      </body>
    </html>
  )
}
