import { useCallback, useState } from 'react'

export function useCreateProfile() {
  const [profileId, setProfileId] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const createProfile = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // const profileId = await createProfileAPI(handle)
      const profileId = '123'
      setProfileId(profileId)
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error('An unknown error occurred.'))
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { profileId, error, isLoading, createProfile }
}
