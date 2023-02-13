import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import { useContractRead } from 'wagmi'
import VaultFactory from "../ABI/Vault.json";
import { toast } from 'react-toastify';

export default function StakeBox(props) {

    const { data: getData, isLoading: getLoading } = useContractRead({
        address: '0x6B3dE365bE42022A86c4CC24a9E6057b80FD7A5C' ,
        abi: VaultFactory,
        functionName: "userIds",
    
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
