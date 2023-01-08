import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  DefaultOptions,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { getAuthenticationToken } from 'utils/state'

export interface LensKitProviderProps {
  children: React.ReactNode
  apiEndpoint: string
}

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
  const token = getAuthenticationToken()
  console.log('jwt token:', token)

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      'x-access-token': token ? `Bearer ${token}` : '',
    },
  })

  // Call the next link in the middleware chain.
  return forward(operation)
})

export function LensKitProvider({ apiEndpoint, children }: LensKitProviderProps) {
  const httpLink = new HttpLink({
    uri: apiEndpoint,
    fetch,
  })

  const client = new ApolloClient({
    uri: apiEndpoint,
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  })
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
