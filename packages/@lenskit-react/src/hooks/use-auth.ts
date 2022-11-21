import { useAuthenticateMutation, useChallengeLazyQuery } from 'generated-gql'
import { useState } from 'react'
import { signText } from 'utils/ethers.service'
import { getAuthenticationToken, setAuthenticationToken } from 'utils/state'

export const useAuth = () => {
  const [token, setAuthToken] = useState<string>(getAuthenticationToken() || '')
  const [generateChallenge] = useChallengeLazyQuery()
  const [authenticate] = useAuthenticateMutation()
  const [error, setError] = useState<Error | null>(null)

  const auth = async (address: string): Promise<string | null> => {
    const token = getAuthenticationToken()
    if (token) {
      setAuthToken(token)
      return token
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
      return token
    } catch (e: any) {
      setError(e)
    }

    return null
  }

  return {
    auth,
    token,
    error,
  }
}
