import { useState } from 'react'
import {  useContractWrite, useWaitForTransaction, useContractRead } from 'wagmi'
import { VAULT_FACTORY_ADDRESS} from './config';
import VaultFactory from "./ABI/deployer.json"
import { toast } from "react-toastify"
import Navbar from './components/Navbar';

export default function Vault() {

  const [name, setName] = useState<string>("")
  const [nftAddress, setNftAddress] = useState<string>("")
  const [tokenAddress, setTokenAddress] = useState<string>("")
  const [index, setIndex] = useState<number>(0)


  const { data: deployVaultData, write: deployVault, isLoading: deployVaultLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: VAULT_FACTORY_ADDRESS,
    abi: VaultFactory,
    functionName: "deploy",
    args: [nftAddress, tokenAddress, Number(index)],

    onError(error) {
      // @ts-ignore
      toast.error(`Failed! ${error.reason}`)
    }
  })

  const { isLoading: deployVaultWaitLoading } = useWaitForTransaction({
    hash: deployVaultData?.hash,

    onSuccess(data) {
      // @ts-ignore
      toast.success(`Vault deployed successfully`)
    },

    onError(error) {
      // @ts-ignore
      toast.error(`Failed! ${error.reason}`)
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();

    deployVault?.();

    console.log({ name, nftAddress, tokenAddress });

  }

  return (
    <div className='text-orange-50 bg-zinc-900 p-8 min-h-screen'>
      <Navbar />
      <div className='md:bg-slate-800 p-8 md:w-3/4 m-auto rounded-3xl my-16'>
        <form onSubmit={handleSubmit} className=' text-slate-900 flex flex-col text-2xl' >
          <input type="text" onChange={(e: any) => setName(e.target.value)} placeholder='Name' className=' md:w-3/5 h-10 m-auto p-2 outline-none' />
          <input type="text" onChange={(e: any) => setNftAddress(e.target.value)} placeholder='NFTAddress' className=' md:w-3/5 h-10 m-auto p-2 outline-none' />
          <input type="text" onChange={(e: any) => setTokenAddress(e.target.value)} placeholder='TokenAddress' className='md:w-3/5  h-10 m-auto p-2 outline-none' />
          <input type="number" onChange={(e: any) => setIndex(e.target.value)} placeholder='Index' className=' md:w-3/5 h-10 m-auto p-2 outline-none' />
          <div className='flex justify-center'>
            <button className='text-2xl p-4 m-4 bg-slate-600 w-32 rounded-sm text-orange-50' type='submit'>
              {
                deployVaultLoading || deployVaultWaitLoading ? "Loading" : "Create"
              }
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}


//deployer 0x747f6969c29f2b5561637f27a3a91608694daf54
//vault 0x3a1decc5363523de575495089401e41f66a43ab4
//NFT 0xa2246e8b4ce49bddefbee20dccc3fe18e2a9c206
//Rewardtoken 0x5fda5c48ba2233fcb5c9d34303ce1bf0b31c587f


