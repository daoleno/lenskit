import { ApolloClient, ApolloProvider } from '@apollo/client'

export interface LensKitProviderProps {
  apolloClient: ApolloClient<any>
  children: React.ReactNode
}
export function LensKitProvider({ children, apolloClient }: LensKitProviderProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
