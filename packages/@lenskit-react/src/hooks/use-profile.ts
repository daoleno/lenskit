import { SingleProfileQueryRequest, useProfileQuery } from 'generated-gql'

export function useProfile(query: SingleProfileQueryRequest) {
  const { data, loading, error } = useProfileQuery({
    variables: {
      request: query,
    },
  })

  return {
    profile: data?.profile,
    loading,
    error,
  }
}
