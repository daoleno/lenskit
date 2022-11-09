import { useProfilesQuery } from 'generated-gql'

export function useProfiles(profileIds: string[]) {
  const { data, loading, error } = useProfilesQuery({
    variables: {
      request: {
        profileIds,
      },
    },
  })

  return {
    profiles: data?.profiles.items,
    loading,
    error,
  }
}
