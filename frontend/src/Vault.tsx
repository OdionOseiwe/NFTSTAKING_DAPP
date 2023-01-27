import { useState } from 'react'
import {  useContractWrite, useWaitForTransaction, useContractRead } from 'wagmi'
import { VAULT_FACTORY_ADDRESS} from './config';
import VaultFactory from "./ABI/deployer.json"
import { toast } from "react-toastify"
import Navbar from './components/Navbar';

export default function Vault() {

  // const [name, setName] = useState<string>("")
  // const [nftAddress, setNftAddress] = useState<string>("")
  // const [tokenAddress, setTokenAddress] = useState<string>("")
  // const [index, setIndex] = useState<number>(0)


  // const { data: deployVaultData, write: deployVault, isLoading: deployVaultLoading } = useContractWrite({
  //   mode: "recklesslyUnprepared",
  //   address: VAULT_FACTORY_ADDRESS,
  //   abi: VaultFactory,
  //   functionName: "deploy",
  //   args: [nftAddress, tokenAddress, Number(index), name],

  //   onError(error) {
  //     // @ts-ignore
  //     toast.error(`Failed! ${error.reason}`)
  //   }
  // })

  // const { isLoading: deployVaultWaitLoading } = useWaitForTransaction({
  //   hash: deployVaultData?.hash,

  //   onSuccess(data) {
  //     // @ts-ignore
  //     toast.success(`Vault deployed successfully`)
  //   },

  //   onError(error) {
  //     // @ts-ignore
  //     toast.error(`Failed! ${error.reason}`)
  //   }
  // })

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();

  //   deployVault?.();

  //   console.log({ name, nftAddress, tokenAddress });

  // }
  

  return (
    <div className='text-orange-50 bg-zinc-900 p-8 min-h-screen'>
      {/* <Navbar />
      <div className='md:bg-slate-800 p-8 md:w-3/4 m-auto rounded-3xl my-16'>
        <form onSubmit={handleSubmit} className=' text-slate-900 flex flex-col text-2xl' >
          <input type="text" onChange={(e: any) => setName(e.target.value)} placeholder='VaultName' className=' md:w-3/5 h-10 m-auto p-2 outline-none' />
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
      </div> */}
      <Navbar />
      <div className='grid justify-items-center'>
        <p>Create your vault on the block explorer</p> 
        <a href="https://goerli.etherscan.io/address/0x9018497AC0a1369c8cD1Fa4F39f7213161B84363#writeContract" className='underline-offset-0 text-green-300 text-xl'> GO TO EXPLORER</a>
      </div>
     
    </div>
  )
}


//deployer 0xb663D78fE7Aca81a96B88A2e236Eb6fF955BE564
//vault 
//NFT1 0xdA03c3Ed725E5BE8D4AE3ba58f8809446fCd2C4D
//Rewardtoken1 0x1B8730dc5418b92f12Ba5cC47028bE50eC64D56d
//NFT2 0xdA03c3Ed725E5BE8D4AE3ba58f8809446fCd2C4D
//Rewardtoken2 0x6Ff17B9f4779da042fE5A93D84a21B4644370636


