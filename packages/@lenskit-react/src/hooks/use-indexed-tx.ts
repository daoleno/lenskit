import { useHasTxHashBeenIndexedLazyQuery } from 'generated-gql'
import { useCallback, useEffect, useState } from 'react'
import { sleep } from 'utils/helpers'

export function useIndexedTx(txHash: string | null) {
  const [tx, setTx] = useState<any>(null)
  const [error, setError] = useState<Error | null>(null)
  const [hasTxHashBeenIndexedQuery] = useHasTxHashBeenIndexedLazyQuery()

  const pollUntilIndexed = useCallback(
    async (txHash: string) => {
      if (!txHash) {
        return
      }
      while (true) {
        const result = await hasTxHashBeenIndexedQuery({
          variables: {
            request: {
              txHash,
            },
          },
          fetchPolicy: 'network-only',
        })
        console.log('polling for tx', txHash, result.data?.hasTxHashBeenIndexed)
        const response = result.data?.hasTxHashBeenIndexed
        if (response?.__typename === 'TransactionIndexedResult') {
          if (response.metadataStatus) {
            if (response.metadataStatus.status === 'SUCCESS') {
              setTx(response.txReceipt)
              return response.txReceipt
            }
            if (response.metadataStatus.status === 'METADATA_VALIDATION_FAILED') {
              setError(new Error(response.metadataStatus.reason || 'Metadata validation failed'))
              throw new Error(response.metadataStatus.reason || 'Metadata validation failed')
            }
          } else {
            if (response.indexed) {
              setTx(response.txReceipt)
              return response.txReceipt
            }
          }
          await sleep(1500)
        } else {
          setError(new Error(response?.reason))
          throw new Error(response?.reason)
        }
      }
    },
    [hasTxHashBeenIndexedQuery]
  )

  useEffect(() => {
    if (txHash) {
      pollUntilIndexed(txHash)
    }
  }, [pollUntilIndexed, txHash])

  return { tx, error }
}
