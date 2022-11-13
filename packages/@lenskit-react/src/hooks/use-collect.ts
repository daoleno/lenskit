import { useCreateCollectTypedDataMutation } from 'generated-gql'
import { useCallback, useEffect, useState } from 'react'
import { getAddressFromSigner, signedTypeData, splitSignature } from 'utils/ethers.service'
import { getLensHub } from 'utils/lens-hub'
import { useIndexedTx } from './use-indexed-tx'
import { useLogin } from './use-login'

export function useCollect() {
  const [error, setError] = useState<Error | null>(null)
  const [createCollectTypedDataMutation] = useCreateCollectTypedDataMutation()

  const { login } = useLogin()
  const [txHash, setTxHash] = useState<string | null>(null)
  const { tx, error: indexError } = useIndexedTx(txHash)
  const [loading, setLoading] = useState(false)

  const collect = useCallback(async (publicationId: string) => {
    setLoading(true)
    try {
      const address = await getAddressFromSigner()
      await login(address)
      const result = await createCollectTypedDataMutation({
        variables: {
          request: {
            publicationId,
          },
        },
      })

      const typedData = result.data!.createCollectTypedData.typedData
      const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value)

      const { v, r, s } = splitSignature(signature)

      const tx = await getLensHub().collectWithSig(
        {
          collector: address,
          profileId: typedData.value.profileId,
          pubId: typedData.value.pubId,
          data: typedData.value.data,
          sig: {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          },
        },
        { gasLimit: 1000000 }
      )
      console.log('collect: tx hash', tx.hash)
      setTxHash(tx.hash)
    } catch (e: any) {
      setError(e)
    }
  }, [])

  useEffect(() => {
    if (txHash && tx) {
      setLoading(false)
    }
  }, [txHash, tx])

  return { collect, tx, loading, error: error || indexError }
}
