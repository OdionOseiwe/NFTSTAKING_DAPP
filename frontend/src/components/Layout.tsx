import { Outlet, Link } from "react-router-dom";
import { ConnectButton} from '@rainbow-me/rainbowkit';



const Layout = () => {
  return (
    <>
        <nav className='Home-nav flex text-xl justify-center font-semibold ' >
            <Link className='Home-nav-com sm:px-10 ' to="/stake">STAKE</Link>
            <Link className="Home-nav-com sm:px-10" to="/vault">CREATE VAULT</Link>
            <ConnectButton />
        </nav>
      <Outlet />
    </>
  )
};

export default Layout;
