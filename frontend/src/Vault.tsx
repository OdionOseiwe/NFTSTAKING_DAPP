import React from 'react'
import { Outlet, Link } from "react-router-dom";
import useFunctionRead from '../hooks/usefunctionRead'
import usefunctionWrite  from '../hooks/usefunctionWrite';
import NFT from "../ABI/deployer.json"
import {useAccount } from 'wagmi'

export default function Vault() {

  const {writeAsync, isLoading:writeLoading, isError:writeError} = usefunctionWrite("deploy", NFT, '0x747f6969c29f2b5561637f27a3a91608694daf54', ['0xa2246e8b4ce49bddefbee20dccc3fe18e2a9c206', '0x5fda5c48ba2233fcb5c9d34303ce1bf0b31c587f', 5])

  const Deploy = async () => {
    try{
      const tx  = await writeAsync?.()
      console.log(tx)
    }
    catch(e){
      console.log(e, writeError);
      
    }
    finally{console.log(writeLoading);
    }
  }
  return (
    <div className='text-orange-50 bg-zinc-900 p-8'>
        <div className='sm:flex justify-between p-10 '>
            <div className='md:text-3xl lg:text-4xl font-bold '>
                <h1 className=''> CREATE A VAULT</h1>
            </div>
        <nav className='flex text-xl font-medium ' >
            <Link className='px-10' to="/">HOME</Link>
            <Link to="/stake">STAKE</Link>
        </nav>
        <Outlet />
        </div>
        <div className='md:bg-slate-800 p-8 md:w-3/4 m-auto rounded-3xl'>
          <form action="" className=' text-slate-900 flex flex-col text-2xl' >
           <input type="text"  placeholder='Name' className=' md:w-96 h-10 m-auto p-2 outline-none'/>
            <input type="text"  placeholder='NFTAddress' className=' md:w-96 h-10 m-auto p-2 outline-none'/>
            <input type="text"  placeholder='TokenAddress' className='md:w-96  h-10 m-auto p-2 outline-none'/>
            <div className='flex justify-center'>
              <button className='text-2xl p-4 m-4 bg-slate-600 w-32 rounded-sm text-orange-50' onClick={Deploy}>create</button>
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