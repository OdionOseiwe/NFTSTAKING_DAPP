import React from 'react'
import { useContractRead } from 'wagmi'
import { VAULT_FACTORY_ADDRESS } from '../config';
import VaultFactory from "../ABI/deployer.json"
import { toast } from "react-toastify"
import { ethers } from 'ethers';
import TransitionsModal from './Modal';


export default function Stakeinfo() {

  const { data: getData, isLoading: getLoading } = useContractRead({
    address: VAULT_FACTORY_ADDRESS ,
    abi: VaultFactory,
    functionName: "info",

    onError(error) {
      // @ts-ignore
      toast.error(`Failed! ${error.reason}`)
    }
  })
  
  console.log(getData, getLoading);
  
  return (
    <div >
      <div className='flex flex-col justify-center items-center '>
        {/* <div className='text-4xl text-slate-100'>More Protocol</div>
          <p className='text-2xl text-slate-100'>Securing NFT liquidity across DeFi Protocol</p>
        <div className='bg-orange-200 my-8'>
        </div> */}
        <div className= 'Table bg-orange-200 w-3/5 rounded-md items-center p-7'>
          <div className='flex justify-around sm:py-12 py-4'>
            <div className='Table-title text-3xl'>vaultName</div>
            <div className='Table-title text-3xl'>rate </div>
            <div className='Table-title text-3xl'>stake </div>
          </div>
          {
            // @ts-ignore
            getData ?  Object.values(getData).map((detail: any, _i: number) => {
              return (
                <div key={_i} className='Table-details flex justify-around bg-zinc-900 text-slate-50 p-1 rounded-2xl w-4/5 m-auto'>
                  <div className='  text-xl '>{detail?.vaultName}</div>
                  <div className=' text-xl'>{ethers.utils.formatUnits(detail?.vaultIndex, 0)} days</div>
                  <TransitionsModal address = {detail?.vaultAddress}/>
                </div>    
              )
            }) : " "  
          }
        </div>
      </div>

    </div>
  )
}
