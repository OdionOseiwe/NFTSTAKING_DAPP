import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='sm:flex justify-between p-10 '>
        <div className='md:text-3xl lg:text-4xl font-bold '>
          <h1 className=''> CREATE A VAULT</h1>
        </div>
        <nav className='flex text-xl font-medium ' >
          <Link className='px-10' to="/">HOME</Link>
          <Link to="/stake">STAKE</Link>
        </nav>
        {/* <Outlet /> */}
      </div>
  )
}

export default Navbar