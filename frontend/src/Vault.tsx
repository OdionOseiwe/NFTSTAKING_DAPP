import Navbar from './components/Navbar';

export default function Vault() {
  return (
    <div className='text-orange-50 bg-zinc-900 p-8 min-h-screen'>
      <Navbar />
      <div className='grid justify-items-center'>
        <p>Create your vault on the block explorer</p> 
        <a href="https://goerli.etherscan.io/address/0x9018497AC0a1369c8cD1Fa4F39f7213161B84363#writeContract" className='underline-offset-0 text-green-300 text-xl'> GO TO EXPLORER</a>
      </div>     
    </div>
  )
}


//deployer 0xb663D78fE7Aca81a96B88A2e236Eb6fF955BE564
//vault 
//NFT1 0xdA03c3Ed725E5BE8D4AE3ba58f8809446fCd2C4D
//Rewardtoken1 0x1B8730dc5418b92f12Ba5cC47028bE50eC64D56d
//NFT2 0xdA03c3Ed725E5BE8D4AE3ba58f8809446fCd2C4D
//Rewardtoken2 0x6Ff17B9f4779da042fE5A93D84a21B4644370636


