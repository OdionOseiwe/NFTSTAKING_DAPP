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


// forge create --rpc-url https://eth-goerli.g.alchemy.com/v2/0h4KWpjRd3xXNW50By-hTTaZDJnNpjiw  \ 
// --private-key 6974ff09da21f8bc9e70bfe4cda2fd911502bc1eed1038e51c475f2f0d622cb8 src/deployVault.sol:Deployer  \   
// --etherscan-api-key Z8P4W843RDB83JD848SWFRI6JVVXGVM9KT  \  
// --verify

// forge create --rpc-url https://eth-goerli.g.alchemy.com/v2/0h4KWpjRd3xXNW50By-hTTaZDJnNpjiw  \ 
// --private-key 6974ff09da21f8bc9e70bfe4cda2fd911502bc1eed1038e51c475f2f0d622cb8 src/deployVault.sol:Deployer  \   
// --etherscan-api-key Z8P4W843RDB83JD848SWFRI6JVVXGVM9KT  \  
// --verify

// forge create --rpc-url <your_rpc_url> \
//     --constructor-args "ForgeUSD" "FUSD" 18 1000000000000000000000 \
//     --private-key <your_private_key> src/MyToken.sol:MyToken \
//     --etherscan-api-key <your_etherscan_api_key> \
//     --verify
