import Layout from './components/Layout';
import { Outlet, Link } from "react-router-dom";
import { ConnectButton} from '@rainbow-me/rainbowkit';

export default function Home() {

  return (
    
    <>
        <div className='Home bg-orange-50 h-full text-neutral-800 text-base p-8'>
            <div className='Home-con sm:flex justify-between p-10 '>
                <div className='md:text-3xl lg:text-4xl font-bold '>
                    <h1 className=''> More Protocol </h1>
                </div>
                <Layout/>
            </div>

            <div className='p-8'>
                <h2 className='text-2xl font-semibold font-mono md:text-4xl lg:text-6xl' >The Future Of NFT Staking</h2>
                <p className='md:w-96 py-7'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsa vitae enim, modi accusantium odio 
                    magnam omnis quos illo ducimus quasi incidunt amet maxime assumenda iste nulla sit odit possimus?
                </p>
            </div>
            <div className='p-6 '>
                <h2 className='lg:text-5xl sm:text-3xl text-2xl  font-semibold capitalize text-center py-4'>how to participate</h2>
                <div className='c md:w-3/4  m-auto my-10 md:p-10 sm:p-6 rounded-2xl'>
                    <h2 className='md:text-5xl text-3xl p-8'>Staking</h2>
                    <p className='p-8 w-11/12'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsa vitae enim, modi accusantium odio 
                        magnam omnis quos illo ducimus quasi incidunt amet maxime assumenda iste nulla sit odit possimus?
                    </p>
                    <nav className='ext-2xl p-4 m-4 bg-slate-600 inline rounded-sm text-orange-50' >
                        <Link className='px-10 ' to="/stake">STAKE</Link>
                    </nav>
                    <Outlet />
                </div>
            </div>
        
        </div>
        <div className='text-orange-50 bg-slate-900  p-12'>
            <h1 className='lg:text-5xl md:text-3xl text-center text-xl'>More Protocol</h1>
            <p className='lg:text-2xl p-4 text-xl'>
                A Project helps to facilitate minting of more NFT from a marketplace i.e More Protocol helps generate more NFT(liquidity) by staking it to receive rewards, that can be used to buy more NFT.
            </p>
            
        </div>

    </>
    
  )
  
}