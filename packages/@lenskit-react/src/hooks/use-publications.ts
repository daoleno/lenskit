import { PublicationsQueryRequest, usePublicationsQuery } from 'generated-gql'

export function usePublications(query: PublicationsQueryRequest) {
  const { data, loading, error } = usePublicationsQuery({
    variables: {
      request: query,
    },
  })

  return {
    publications: data?.publications,
    loading,
    error,
  }
}
