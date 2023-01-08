import { Outlet, Link } from "react-router-dom";


const Layout = () => {
  return (
    <>
        <nav className='flex text-xl font-semibold ' >
            <Link className='px-10' to="/stake">STAKE</Link>
            <Link to="/vault">CREATE VAULT</Link>
        </nav>

      <Outlet />
    </>
  )
};

export default Layout;
