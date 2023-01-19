import React from 'react'
import { Outlet, Link } from "react-router-dom";


export default function Stake() {
  return (
    <div className='text-orange-50 bg-zinc-900 p-8 min-h-screen'>
      <div className='sm:flex justify-between p-10 '>
          <div className='md:text-3xl lg:text-4xl font-bold '>
              <h1 className=''> STAKE </h1>
          </div>
          <nav className='flex text-xl font-semibold ' >
              <Link className='px-10' to="/">HOME</Link>
              <Link to="/vault">CREATE VAULT</Link>
          </nav>
          <Outlet />
      </div>

      <div className= 'flex flex-col justify-center items-center text-zinc-900'>
        <div className='text-4xl'>More Protocol</div>
        <p className='text-2xl'>Securing NFT liquidity across DeFi Protocol</p>
        <div className='bg-orange-200 my-8'>

        </div>
        <div className='bg-orange-200 flex flex-col justify-center w-3/5 rounded-md items-center p-7'>
          <div className='text-3xl '>Vaults</div>
          <div className='flex justify-between py-12'>
            <div className='px-28 text-2xl'>NFTs</div>
            <div className='px-28 text-2xl'>Payout assets</div>
            <div className='px-28 text-2xl'>Discount</div>
          </div>

          <div>

          </div>
        </div>
      </div>
        
    </div>
  )
}
