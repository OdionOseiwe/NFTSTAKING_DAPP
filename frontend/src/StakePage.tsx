import React from 'react'
import Stakeinfo from './components/stakeInfo'
import StakeBox from './components/StakeBox'
import Stakenav from './components/Stakenav'

export default function StakePage() {
  return (
    <div className=' bg-zinc-900 p-8 min-h-screen'>
        <Stakenav/>
        <StakeBox/>
        <Stakeinfo/> 
    </div>
  )
}
