import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer'
import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers'
import { ethers, utils } from 'ethers'
import { omit } from './helpers'

declare global {
  interface Window {
    ethereum?: ExternalProvider | JsonRpcFetchFunc
  }
}

// getSigner function from injected web3 provider
export const getSigner = () => {
  if (typeof window === 'undefined') {
    // server side
    const privateKey: any = process.env.PRIVATE_KEY
    const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC)
    const singer = new ethers.Wallet(privateKey, provider)
    return singer
  } else {
    // client side
    const p: any = window.ethereum
    const provider = new ethers.providers.Web3Provider(p)
    return provider.getSigner()
  }
}

export const getAddressFromSigner = async () => {
  return await getSigner().getAddress()
}

export const signedTypeData = (
  domain: TypedDataDomain,
  types: Record<string, TypedDataField[]>,
  value: Record<string, any>
) => {
  const signer = getSigner()
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omit(domain, '__typename'),
    omit(types, '__typename'),
    omit(value, '__typename')
  )
}

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature)
}

export const sendTx = (
  transaction: ethers.utils.Deferrable<ethers.providers.TransactionRequest>
) => {
  const signer = getSigner()
  return signer.sendTransaction(transaction)
}

export const signText = (text: string) => {
  return getSigner().signMessage(text)
}
