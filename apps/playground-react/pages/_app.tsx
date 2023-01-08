import { LensKitProvider } from '@lenskit/react'
import '@lenskit/react/styles.css'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { WagmiConfig, chain, configureChains, createClient } from 'wagmi'
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
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <LensKitProvider apiEndpoint="https://api-mumbai.lens.dev">
              <Component {...pageProps} />
            </LensKitProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
