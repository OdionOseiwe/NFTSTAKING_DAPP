import './App.css';
import Home from './Home';
import Stake from './Stake';
import Vault from './Vault';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="stake" element={<Stake />} />
        <Route path="vault" element={<Vault />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

//gradient(237.43deg, #2b313d -12.81%, #171a20 132.72%);