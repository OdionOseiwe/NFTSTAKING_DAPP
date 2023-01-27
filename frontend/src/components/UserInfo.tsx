import React from 'react'
import { useContractRead } from 'wagmi'
import VaultFactory from "../ABI/Vault.json"
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { useState } from 'react';


export default function UserInfo(props) {
  const [rewards,usereweads] = useState<number>(0);
  const { data: getData, isLoading: getLoading } = useContractRead({
    address: props.address ,
    abi: VaultFactory,
    functionName: "earnedInfo",
    args:[4],

    onError(error) {
      // @ts-ignore
      toast.error(`Failed! ${error.reason}`)
    }  
    
  }) 
  
  const handleUnstake = (e: any) => {
    e.preventDefault()
          // @ts-ignore
    console.log(ethers.utils.formatUnits(getData, 0));

  }

  return (
    <>
      <div className='flex justify-around text-xl bg-sky-900 w-full p-3'>
          <div>VaultName</div>
          <div>
            Rewards
          </div>
      </div>
    </>
  )
}
//239254611428571428571428571