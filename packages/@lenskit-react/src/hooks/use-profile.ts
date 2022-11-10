import { useProfileQuery } from 'generated-gql'

export function useProfile(profileId: string) {
  const { data, loading, error } = useProfileQuery({
    variables: {
      request: {
        profileId,
      },
    },
  })

  return {
    profile: data?.profile,
    loading,
    error,
  }
}
