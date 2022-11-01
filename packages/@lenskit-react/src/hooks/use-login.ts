import { useAuthenticateMutation, useChallengeLazyQuery } from 'generated-gql'
import { signText } from 'lensapi/ethers.service'
import { getAuthenticationToken, setAuthenticationToken } from 'lensapi/state'
import { useState } from 'react'

export const useLogin = () => {
  const [authToken, setAuthToken] = useState<string>(getAuthenticationToken() || '')
  const [error, setError] = useState<Error | null>(null)
  const [generateChallenge] = useChallengeLazyQuery()
  const [authenticate] = useAuthenticateMutation()

  const login = async (address: string) => {
    const token = getAuthenticationToken()
    if (token) {
      setAuthToken(token)
      return
    }

    try {
      // we request a challenge from the server
      const challengeResponse = await generateChallenge({
        variables: {
          request: {
            address,
          },
        },
      })

      // check challenge text
      const text = challengeResponse.data?.challenge?.text
      if (!text) {
        throw new Error('No challenge text')
      }

      // sign the text with the wallet
      const signature = await signText(text)

      // authenticate
      const accessTokens = await authenticate({ variables: { request: { address, signature } } })
      const token = accessTokens.data?.authenticate?.accessToken
      if (!token) {
        throw new Error('No access token')
      }

      setAuthenticationToken(token)
      setAuthToken(token)
    } catch (e: any) {
      setError(e)
    }
  }

  return {
    login,
    authToken,
    error,
  }
}
