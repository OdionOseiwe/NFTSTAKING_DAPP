import React from 'react'
import { Outlet, Link } from "react-router-dom";


export default function Stake() {
  return (
    <div className='text-orange-50 bg-zinc-900 p-8'>
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
        
    </div>
  )
}
