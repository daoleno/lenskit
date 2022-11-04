import { BigNumber, utils } from 'ethers'
import { useCreateProfileMutation } from 'generated-gql'
import { getAddressFromSigner } from 'lensapi/ethers.service'
import { useCallback, useEffect, useState } from 'react'
import { useIndexedTx } from './use-indexed-tx'
import { useLogin } from './use-login'

export function useCreateProfile() {
  const [profileId, setProfileId] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [createProfileMutation] = useCreateProfileMutation()
  const { login } = useLogin()
  const [txHash, setTxhash] = useState<string | null>(null)
  const { tx, error: indexError } = useIndexedTx(txHash)

  const createProfile = useCallback(async (handle: string) => {
    try {
      const address = await getAddressFromSigner()
      await login(address)
      const createProfileResult = await createProfileMutation({
        variables: {
          request: {
            handle,
          },
        },
      })

      if (createProfileResult.data?.createProfile.__typename === 'RelayerResult') {
        const { txHash } = createProfileResult.data.createProfile
        setTxhash(txHash)
      } else {
        throw new Error(createProfileResult.data?.createProfile.reason)
      }
    } catch (e: any) {
      setError(e)
    }
  }, [])

  useEffect(() => {
    if (tx) {
      const logs = tx.txReceipt.logs
      const topicId = utils.id(
        'ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)'
      )
      const profileCreatedLog = logs.find((l: any) => l.topics[0] === topicId)
      let profileCreatedEventLog = profileCreatedLog.topics
      const profileId = utils.defaultAbiCoder.decode(['uint256'], profileCreatedEventLog[1])[0]
      setProfileId(BigNumber.from(profileId).toHexString())
    }
  }, [tx])

  return { profileId, error: error || indexError, createProfile }
}
