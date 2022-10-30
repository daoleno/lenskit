import { useCallback, useState } from 'react'

import { createProfile as createProfileApi } from 'lensapi/profile/create-profile'
export function useCreateProfile() {
  const [profileId, setProfileId] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const createProfile = useCallback(async (handle: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const profileId = await createProfileApi(handle)
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
