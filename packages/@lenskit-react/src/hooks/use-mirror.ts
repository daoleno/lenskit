import { BigNumber, utils } from 'ethers'
import { useCreateMirrorTypedDataMutation } from 'generated-gql'
import { useEffect, useState } from 'react'
import { getAddressFromSigner, signedTypeData, splitSignature } from 'utils/ethers.service'
import { getLensHub } from 'utils/lens-hub'
import { useIndexedTx } from './use-indexed-tx'
import { useLogin } from './use-login'

export function useMirror() {
  const [publicationId, setPublicationId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [createMirrorTypedDataMutation] = useCreateMirrorTypedDataMutation()
  const { login } = useLogin()
  const [txHash, setTxHash] = useState<string | null>(null)
  const { tx, error: indexError } = useIndexedTx(txHash)

  const createMirror = async (profileId: string, publicationId: string) => {
    setLoading(true)
    try {
      const address = await getAddressFromSigner()
      await login(address)
      const result = await createMirrorTypedDataMutation({
        variables: {
          request: {
            profileId,
            publicationId,
          },
        },
      })

      const typedData = result.data!.createMirrorTypedData.typedData
      const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value)

      console.log('create mirror: signature', signature)

      const { v, r, s } = splitSignature(signature)
      const tx = await getLensHub().mirrorWithSig({
        profileId: typedData.value.profileId,
        profileIdPointed: typedData.value.profileIdPointed,
        pubIdPointed: typedData.value.pubIdPointed,
        referenceModuleData: typedData.value.referenceModuleData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      })
      console.log('create mirror: tx hash', tx.hash)
      setTxHash(tx.hash)
    } catch (e: any) {
      setError(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (tx) {
      const logs = tx.logs
      const topicId = utils.id(
        'MirrorCreated(uint256,uint256,uint256,uint256,bytes,address,bytes,uint256)'
      )
      const mirrorCreatedLog = logs.find((l: any) => l.topics[0] === topicId)
      let mirrorCreatedEventLog = mirrorCreatedLog!.topics
      const publicationId = utils.defaultAbiCoder.decode(['uint256'], mirrorCreatedEventLog[2])[0]
      setPublicationId(BigNumber.from(publicationId).toHexString())
      setLoading(false)
    }
  }, [tx])

  return { createMirror, publicationId, loading, error: error || indexError }
}
