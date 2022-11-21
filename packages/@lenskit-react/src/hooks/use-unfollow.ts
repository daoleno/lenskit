import { ethers } from 'ethers'
import { useCreateUnfollowTypedDataMutation } from 'generated-gql'
import { useCallback, useEffect, useState } from 'react'
import { LENS_FOLLOW_NFT_ABI } from 'utils/config'
import {
  getAddressFromSigner,
  getSigner,
  signedTypeData,
  splitSignature,
} from 'utils/ethers.service'
import { useAuth } from './use-auth'
import { useIndexedTx } from './use-indexed-tx'

export function useUnfollow() {
  const [error, setError] = useState<Error | null>(null)
  const [createUnfollowTypedDataMutation] = useCreateUnfollowTypedDataMutation()
  const { auth: login } = useAuth()
  const [txHash, setTxHash] = useState<string | null>(null)
  const { tx, error: indexError } = useIndexedTx(txHash)
  const [loading, setLoading] = useState(false)

  const unfollow = useCallback(async (profileId: string) => {
    setLoading(true)
    try {
      const address = await getAddressFromSigner()
      await login(address)
      const result = await createUnfollowTypedDataMutation({
        variables: {
          request: {
            profile: profileId,
          },
        },
      })

      const typedData = result.data!.createUnfollowTypedData.typedData
      const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value)

      const { v, r, s } = splitSignature(signature)

      // load up the follower nft contract
      const followNftContract = new ethers.Contract(
        typedData.domain.verifyingContract,
        LENS_FOLLOW_NFT_ABI,
        getSigner()
      )

      const sig = {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      }

      // force the tx to send
      const tx = await followNftContract.burnWithSig(typedData.value.tokenId, sig)
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

  return { unfollow, tx, loading, error: error || indexError }
}
