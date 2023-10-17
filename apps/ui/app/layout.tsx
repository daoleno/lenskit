"use client"

import "@/styles/globals.css"

import { development, LensConfig, LensProvider } from "@lens-protocol/react-web"
import { bindings as wagmiBindings } from "@lens-protocol/wagmi"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { polygonMumbai } from "wagmi/chains"
import { InjectedConnector } from "wagmi/connectors/injected"
import { publicProvider } from "wagmi/providers/public"

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster as DefaultToaster } from "@/registry/default/ui/toaster"
import { Toaster as NewYorkToaster } from "@/registry/new-york/ui/toaster"

const { publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      options: {
        shimDisconnect: false, // see https://github.com/wagmi-dev/wagmi/issues/2511
      },
    }),
  ],
})

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: development,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <WagmiConfig config={config}>
                <LensProvider config={lensConfig}>
                  <div className="flex-1">{children}</div>
                </LensProvider>
              </WagmiConfig>
              <SiteFooter />
            </div>
            <TailwindIndicator />
          </ThemeProvider>

          <Analytics />
          <NewYorkToaster />
          <DefaultToaster />
        </body>
      </html>
    </>
  )
}
