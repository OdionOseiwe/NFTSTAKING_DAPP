import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import { useContractRead } from 'wagmi'
import { VAULT_FACTORY_ADDRESS } from '../config';
import VaultFactory from "../ABI/Vault.json";
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify';

export default function StakeBox(props) {

    const { address} = useAccount()

    const { data: getData, isLoading: getLoading } = useContractRead({
        address: VAULT_FACTORY_ADDRESS ,
        abi: VaultFactory,
        functionName: "UsersIDs",
        args:[address],
    
        onError(error) {
          // @ts-ignore
          toast.error(`Failed! ${error.reason}`)
        }
    })
      
    console.log(getData, getLoading);  

  return (
    
    <div className=' scrollmenu'>
        <div className='Stake'>
            <p className='Stake--box--title'>test3</p>
            <div className='Stake--box'>
                <div className='stake--APR'>
                    <p className='APR'>APR</p>
                    <p className='per'>6.64%</p>
                </div>

                <div className='stake--earn'>
                    <p className='earn'>STAKE/EARN</p>
                    <p className='pairs'>kill/pill</p>
                </div>

                <div>
                    <p className='NFT---title'>NFT staked and rewards</p>
                </div>

                <Scrollbars style={{ height: 200 }}>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                </Scrollbars>
            </div>
           
        </div>

        <div className='Stake'>
            <p className='Stake--box--title'>test3</p>
            <div className='Stake--box'>
                <div className='stake--APR'>
                    <p className='APR'>APR</p>
                    <p className='per'>6.64%</p>
                </div>

                <div className='stake--earn'>
                    <p className='earn'>STAKE/EARN</p>
                    <p className='pairs'>kill/pill</p>
                </div>

                <div>
                    <p className='NFT---title'>NFT staked and rewards</p>
                </div>

                <Scrollbars style={{ height: 200 }}>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                </Scrollbars>
            </div>
           
        </div>

        <div className='Stake'>
            <p className='Stake--box--title'>test3</p>
            <div className='Stake--box'>
                <div className='stake--APR'>
                    <p className='APR'>APR</p>
                    <p className='per'>6.64%</p>
                </div>

                <div className='stake--earn'>
                    <p className='earn'>STAKE/EARN</p>
                    <p className='pairs'>kill/pill</p>
                </div>

                <div>
                    <p className='NFT---title'>NFT staked and rewards</p>
                </div>

                <Scrollbars style={{ height: 200 }}>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                </Scrollbars>
            </div>
           
        </div>

        <div className='Stake'>
            <p className='Stake--box--title'>test3</p>
            <div className='Stake--box'>
                <div className='stake--APR'>
                    <p className='APR'>APR</p>
                    <p className='per'>6.64%</p>
                </div>

                <div className='stake--earn'>
                    <p className='earn'>STAKE/EARN</p>
                    <p className='pairs'>kill/pill</p>
                </div>

                <div>
                    <p className='NFT---title'>NFT staked and rewards</p>
                </div>

                <Scrollbars style={{ height: 200 }}>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                </Scrollbars>
            </div>
           
        </div>

        <div className='Stake'>
            <p className='Stake--box--title'>test3</p>
            <div className='Stake--box'>
                <div className='stake--APR'>
                    <p className='APR'>APR</p>
                    <p className='per'>6.64%</p>
                </div>

                <div className='stake--earn'>
                    <p className='earn'>STAKE/EARN</p>
                    <p className='pairs'>kill/pill</p>
                </div>

                <div>
                    <p className='NFT---title'>NFT staked and rewards</p>
                </div>

                <Scrollbars style={{ height: 200 }}>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                    <div className='stake--ID'>
                        <p className='ID'>ID</p>
                        <button className='stake--unstake'>unstake</button>
                        <div className='stake--claim'>
                            <p className='rewards'>0.00034</p>
                            <button className='claim'>Claim</button>
                        </div>
                    </div>

                </Scrollbars>
            </div>
           
        </div>
        
    </div>
  )
}
