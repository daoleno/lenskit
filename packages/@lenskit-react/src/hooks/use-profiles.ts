import { ProfileQueryRequest, useProfilesQuery } from 'generated-gql'

export function useProfiles(req: ProfileQueryRequest) {
  const { data, loading, error } = useProfilesQuery({
    variables: {
      request: req,
    },
  })

  return {
    profiles: data?.profiles.items,
    loading,
    error,
  }
}
