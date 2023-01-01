import { PublicationQueryRequest, usePublicationQuery } from 'generated-gql'

export function usePublication(query: PublicationQueryRequest) {
  const { data, loading, error } = usePublicationQuery({
    variables: {
      request: query,
    },
  })

  return {
    publication: data?.publication,
    loading,
    error,
  }
}
