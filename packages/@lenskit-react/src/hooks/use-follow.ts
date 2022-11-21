import { useCreateFollowTypedDataMutation } from 'generated-gql'
import { useCallback, useEffect, useState } from 'react'
import { getAddressFromSigner, signedTypeData, splitSignature } from 'utils/ethers.service'
import { getLensHub } from 'utils/lens-hub'
import { useAuth } from './use-auth'
import { useIndexedTx } from './use-indexed-tx'

export function useFollow() {
  const [error, setError] = useState<Error | null>(null)
  const [createFollowTypedDataMutation] = useCreateFollowTypedDataMutation()
  const { auth: login } = useAuth()
  const [txHash, setTxHash] = useState<string | null>(null)
  const { tx, error: indexError } = useIndexedTx(txHash)
  const [loading, setLoading] = useState(false)

  const follow = useCallback(async (profileId: string) => {
    setLoading(true)
    try {
      const address = await getAddressFromSigner()
      await login(address)
      const result = await createFollowTypedDataMutation({
        variables: {
          request: {
            follow: [
              {
                profile: profileId,
              },
            ],
          },
        },
      })

      const typedData = result.data!.createFollowTypedData.typedData
      const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value)

      const { v, r, s } = splitSignature(signature)

      const tx = await getLensHub().followWithSig({
        follower: getAddressFromSigner(),
        profileIds: typedData.value.profileIds,
        datas: typedData.value.datas,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      })
      console.log('follow: tx hash', tx.hash)
      setTxHash(tx.hash)
    } catch (e: any) {
      setError(e)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (txHash && tx) {
      setLoading(false)
    }
  }, [txHash, tx])

  return { follow, tx, loading, error: error || indexError }
}
