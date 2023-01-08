import {
  ApolloClient,
  ApolloLink,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { getAuthenticationToken } from 'state'
import { PublicationsDocument, PublicationsQueryRequest } from './generated-gql'

export class LensClient<TCacheShape> {
  apolloClient: ApolloClient<TCacheShape>

  constructor(apolloClient: ApolloClient<TCacheShape>) {
    this.apolloClient = apolloClient
  }

  getPublications = async (request: PublicationsQueryRequest) => {
    return await this.apolloClient.query({
      query: PublicationsDocument,
      variables: {
        request,
      },
    })
  }

  getAllPublications = async (q: PublicationsQueryRequest, minDate?: Date) => {
    console.log('[publications] fetching all publications')
    try {
      let result = await this.getPublications(q)
      const items = result.data?.publications?.items
      console.log('[publications] feched page 0 with %d items', items?.length)
      let allData = items ? [...items] : []
      let cursor = result.data?.publications?.pageInfo.next
      let count = 1
      while (cursor) {
        result = await this.getPublications({
          ...q,
          cursor,
        })

        const items = result.data?.publications?.items
        console.log('[publications] feched page %d with %d items', count, items?.length)
        allData.push(...(items ? items : []))

        if (minDate && items && items.length > 0) {
          const lastItem = items[items.length - 1]
          for (const item of items) {
            const itemDate = new Date(item.createdAt)
            if (itemDate >= minDate) {
              allData.push(item)
            }
          }
          if (new Date(lastItem.createdAt) < minDate) {
            console.log('[publications] breaking loop at page %d', count)
            break
          }
        }

        cursor = result.data?.publications?.pageInfo.next
        count++
      }
      console.log('[publications] fetched a total of %d items', allData.length)
      return allData
    } catch (e: any) {
      console.error('[publications] error fetching publications:', e)
      throw e
    }
  }
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

export const createLensClient = (LENS_API: string) => {
  const httpLink = new HttpLink({
    uri: LENS_API,
    fetch,
  })

  // other initialization code

  const apolloClient = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  })

  return new LensClient(apolloClient)
}
