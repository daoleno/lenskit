import { usePublicationQuery } from 'generated-gql'

export function usePublication(publicationId: string) {
  const { data, loading, error } = usePublicationQuery({
    variables: {
      request: {
        publicationId,
      },
    },
  })

  return {
    publication: data?.publication,
    loading,
    error,
  }
}
