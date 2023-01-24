import React from 'react'
import { Outlet, Link } from "react-router-dom";
import { useContractWrite, useWaitForTransaction, useContractRead } from 'wagmi'
import { VAULT_FACTORY_ADDRESS } from './config';
import VaultFactory from "./ABI/deployer.json"
import { toast } from "react-toastify"
import { useState } from 'react';
import { ethers } from 'ethers';
import clsx from 'clsx';
import { styled, Box, Theme } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { HTMLInputTypeAttribute } from 'react';


export default function Stake() {
  //////////////////////////////////////////////////////////////////////////////info////////////////////////////////////////////////////////
    //////////////////////////////////////READING ALL THE DEPLOYRD VAULTS ADDRESSES////////////////////////////

    let Vaddress;
  const { data: getData, isLoading: getLoading } = useContractRead({
    address: VAULT_FACTORY_ADDRESS,
    abi: VaultFactory,
    functionName: "info",

    onError(error) {
      // @ts-ignore
      toast.error(`Failed! ${error.reason}`)
    }
  })
  console.log(getData, getLoading);

const BackdropUnstyled = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const Modal = styled(ModalUnstyled)(`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &.MuiModal-hidden {
    visibility: hidden;
  }
`);

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme: Theme) => ({
  bgcolor: 'black',
  padding: '16px 32px 24px 32px',
  color:'white'
});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [stake, staked] = useState<number>(0);
  const [claim, claimed] = useState<number>(0);
  const [unstake, unstaked] = useState<number>(0);


  //////////////////////////////////////////////////////////////////////////////stake///////////////////////////////////////////////////////

  const { data: deployVaultData, write: deployVault, isLoading: deployVaultLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: Vaddress ,
    abi: VaultFactory,
    functionName: "stake",
    args: [stake],

    onError(error) {
      // @ts-ignore
      toast.error(`Failed! ${error.reason}`)
    }
  })

  const { isLoading: deployVaultWaitLoading } = useWaitForTransaction({
    hash: deployVaultData?.hash,

    onSuccess(data) {
      // @ts-ignore
      toast.success(`stake succefully`)
    },

    onError(error) {
      // @ts-ignore
      toast.error(`Failed! ${error.reason}`)
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();

    deployVault?.();
  }
  
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

      <div className='flex flex-col justify-center items-center text-zinc-900'>
        <div className='text-4xl'>More Protocol</div>
          <p className='text-2xl'>Securing NFT liquidity across DeFi Protocol</p>
        <div className='bg-orange-200 my-8'>

        </div>
        <div className='bg-orange-200 flex flex-col justify-center w-3/5 rounded-md items-center p-7'>
          <div className='flex justify-between py-12'>
            <div className='px-32 text-3xl'>vaultName</div>
            <div className='px-32 text-3xl'>rate </div>
          </div>
          {
            // @ts-ignore
            Object.values(getData).map((detail: any, _i: number) => {
              console.log({detail, _i});
             

              return (
                <div key={_i} className='flex justify-between m-8 justify-center bg-zinc-900 text-slate-50 p-5 rounded-2xl'>
                  {
                    Vaddress = detail?.vaultAddress
                  }
                  <div className='px-32 text-xl '>{detail?.vaultName}</div>
                  <div className='px-32 text-xl'>{ethers.utils.formatUnits(detail?.vaultIndex, 0)} days</div>
                  <div>
                  <button type="button" onClick={handleOpen} className = "text-xl p-2 border-solid border-2 border-zinc-500  rounded-2xl">
                    Manage
                  </button>
                  
                  <Modal
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                    open={open}
                    onClose={handleClose}
                    slots={{ backdrop: Backdrop }}
                    keepMounted
                  >
                    <Box sx={style} className = "text-gray-900">
                      <form onSubmit={handleSubmit} className='flex justify-center  m-12'  >
                        <input type="number" placeholder='NFT ID' 
 className= 'md:w-3/5 h-10  p-2 outline-none rounded-md'onChange={(e: any) => staked(e.target.value)}  />
                        <div className='-mt-2 ml-6'>
                          <button className='p-3  border-solid border-2 border-sky-500  rounded-2xl' type='submit'>
                          {deployVaultLoading || deployVaultWaitLoading ? "staking" : "stake"}
                          </button>
                        </div>    
                      </form>

                      <form action=""  className='flex justify-center m-12'>
                        <input type="text" placeholder='NFT ID'  className=' md:w-3/5 h-10  p-2 outline-none rounded-md'onChange={(e: any) => claimed(e.target.value)} />
                        <div className='-mt-2 ml-6'>
                          <button className='p-3  border-solid border-2 border-sky-500  rounded-2xl 'type='submit'>Claim</button>
                        </div>
                      </form>

                      <form action=""  className='flex justify-center  m-12'>
                        <input type="text" placeholder='NFT ID' className=' md:w-3/5 h-10  p-2 outline-none rounded-md'  onChange={(e: any) => unstaked(e.target.value)} />
                        <div className='-mt-2 ml-6'>
                          <button className='p-3  border-solid border-2 border-sky-500  rounded-2xl ' type='submit'>Unstake</button>
                        </div>           
                      </form>
                    </Box>
                  </Modal>
                </div>
                </div>
              )
            })
          }
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
