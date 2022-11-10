import { useCreateSetProfileMetadataTypedDataMutation } from 'generated-gql'
import { useState } from 'react'
import { ProfileMetadata } from 'types/profile-metadata'
import { getAddressFromSigner, signedTypeData, splitSignature } from 'utils/ethers.service'
import { uploadIpfs } from 'utils/ipfs'
import { getLensPeriphery } from 'utils/lens-hub'
import { useIndexedTx } from './use-indexed-tx'
import { useLogin } from './use-login'

export const useSetProfileMetadata = () => {
  const [error, setError] = useState(null)
  const { login } = useLogin()
  const [txHash, setTxHash] = useState(null)
  const { tx, error: indexError } = useIndexedTx(txHash)
  const [createSetProfileMetadataTypedDataMutation] = useCreateSetProfileMetadataTypedDataMutation()

  const setProfileMetadata = async (profileId: string, metadata: ProfileMetadata) => {
    try {
      const address = await getAddressFromSigner()
      await login(address)
      const ipfsResult = await uploadIpfs<ProfileMetadata>(metadata)
      const createProfileMetadataRequest = {
        profileId,
        metadata: 'ipfs://' + ipfsResult.path,
      }
      const result = await createSetProfileMetadataTypedDataMutation({
        variables: {
          request: createProfileMetadataRequest,
        },
      })

      console.log('create profile metadata: createCommentTypedData', result)

      const typedData = result.data!.createSetProfileMetadataTypedData.typedData
      console.log('create profile metadata: typedData', typedData)

      const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value)
      console.log('create profile metadata: signature', signature)

      const { v, r, s } = splitSignature(signature)
      const tx = await getLensPeriphery().setProfileMetadataURIWithSig({
        profileId: createProfileMetadataRequest.profileId,
        metadata: createProfileMetadataRequest.metadata,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      })
      console.log('create profile metadata: tx hash', tx.hash)
      setTxHash(tx.hash)
    } catch (e: any) {
      setError(e)
    }
  }

  return { setProfileMetadata, tx, error: error || indexError }
}
