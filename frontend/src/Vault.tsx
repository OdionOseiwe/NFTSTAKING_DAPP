import React from 'react'
import { Outlet, Link } from "react-router-dom";

export default function Vault() {
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
              <button className='text-2xl p-4 m-4 bg-slate-600 w-32 rounded-sm text-orange-50'>create</button>
            </div>
            
          </form>
        </div>
    </div>
  )
}
