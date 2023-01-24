import { Outlet, Link } from "react-router-dom";
import { ConnectButton} from '@rainbow-me/rainbowkit';



const Layout = () => {
  return (
    <>
        <nav className='flex text-xl justify-center font-semibold ' >
            <Link className='px-10 ' to="/stake">STAKE</Link>
            <Link className="px-10" to="/vault">CREATE VAULT</Link>
            <ConnectButton />
        </nav>
      <Outlet />
    </>
  )
};

export default Layout;
