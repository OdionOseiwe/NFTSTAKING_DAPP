import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import VaultFactory from "../ABI/Vault.json"
import { toast } from 'react-toastify';

/////////////add some description to the modal

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'black',
  border: '2px blue #000',
  boxShadow: 24,
  p: 4,
};

export default function Modals(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [stake, usestake] = useState<number>(0);
  const [unstake, useunstake] = useState<number>(0);
  const [claim, useclaime] = useState<number>(0);

  


  //////////////////////////////////////////////////////////////////////////////stake/////////////////////////////////////////////////////// 
  
    const { data: deployVaultData, write: deployVault, isLoading: deployVaultLoading } = useContractWrite({
      mode: "recklesslyUnprepared",
      address: props.address ,
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
      toast.success(`stake successfully`)
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
    <div>
      <Button onClick={handleOpen} >manage</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <Box sx={style} className = "">
        <p className='text-slate-300'> Your Token will be locked for 21days when staked, so you can claim after 21days</p>
          <form onSubmit={handleSubmit} className='flex justify-center  m-12'  >
            <input type="number" placeholder='NFT ID' 
                className= 'md:w-3/5 h-10  p-2 outline-none rounded-md text-slate-900'onChange={(e: any) => Number(usestake(e.target.value))}  />
            <div className='-mt-2 ml-6'>
              <button className='p-3  border-solid border-2 border-sky-500  rounded-2xl text-neutral-50' type='submit'>
              {
                deployVaultWaitLoading || deployVaultLoading ? "staking" : "stake"
              }
              </button>
            </div>    
          </form>
          <form action=""  className='flex justify-center m-12'>
            <input type="text" placeholder='NFT ID'  className=' md:w-3/5 h-10  p-2 outline-none rounded-md text-slate-900'onChange={(e: any) => useclaime(e.target.value)} />
            <div className='-mt-2 ml-6'>
              <button className='p-3  border-solid border-2 border-sky-500  rounded-2xl text-neutral-50 'type='submit'>Claim</button>
            </div>
          </form>
          <form action=""  className='flex justify-center  m-12'>
            <input type="text" placeholder='NFT ID' className=' md:w-3/5 h-10  p-2 outline-none rounded-md text-slate-900'  onChange={(e: any) => useunstake(e.target.value)} />
            <div className='-mt-2 ml-6'>
              <button className='p-3  border-solid border-2 border-sky-500  rounded-2xl text-neutral-50' type='submit'>Unstake</button>
            </div>           
          </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
