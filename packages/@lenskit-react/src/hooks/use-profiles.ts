import { useProfilesQuery } from 'generated-gql'

export function useProfiles(profileIds: string[]) {
  const {
    data: profiles,
    loading,
    error,
  } = useProfilesQuery({
    variables: {
      request: {
        profileIds,
      },
    },
  })

  return {
    profiles: profiles?.profiles,
    loading,
    error,
  }
}
