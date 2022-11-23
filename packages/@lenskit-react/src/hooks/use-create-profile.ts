import { BigNumber, utils } from 'ethers'
import { useCreateProfileMutation } from 'generated-gql'
import { useCallback, useEffect, useState } from 'react'
import { getAddressFromSigner } from 'utils/ethers.service'
import { useAuth } from './use-auth'
import { useIndexedTx } from './use-indexed-tx'

export function useCreateProfile() {
  const [profileId, setProfileId] = useState<string | null>(null)
  const [createProfileMutation] = useCreateProfileMutation()
  const { auth } = useAuth()
  const [txHash, setTxHash] = useState<string | null>(null)
  const { tx, error: indexError } = useIndexedTx(txHash)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const createProfile = useCallback(async (handle: string) => {
    setLoading(true)
    try {
      const address = await getAddressFromSigner()
      await auth(address)
      const createProfileResult = await createProfileMutation({
        variables: {
          request: {
            handle,
          },
        },
      })

      if (createProfileResult.data?.createProfile.__typename === 'RelayerResult') {
        const { txHash } = createProfileResult.data.createProfile
        setTxHash(txHash)
      } else {
        throw new Error(createProfileResult.data?.createProfile.reason)
      }
    } catch (e: any) {
      setError(e)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (tx) {
      const logs = tx.logs
      const topicId = utils.id(
        'ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)'
      )
      const profileCreatedLog = logs.find((l: any) => l.topics[0] === topicId)
      let profileCreatedEventLog = profileCreatedLog.topics
      const profileId = utils.defaultAbiCoder.decode(['uint256'], profileCreatedEventLog[1])[0]
      setProfileId(BigNumber.from(profileId).toHexString())
      setLoading(false)
    }
  }, [tx])

  return { createProfile, profileId, loading, error: error || indexError }
}
