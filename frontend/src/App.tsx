import './App.css';
import Home from './Home';
import StakePage from './StakePage';
import Vault from './Vault';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import './App.css';
import { mainnet, polygon, optimism, goerli } from 'wagmi/chains'
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"




const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, goerli],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://eth-goerli.g.alchemy.com/v2/cZArJ5hDwpU8r_6CXv9KbYMJWUtrr3qS`,
        webSocket: `wss://eth-goerli.g.alchemy.com/v2/cZArJ5hDwpU8r_6CXv9KbYMJWUtrr3qS`
      }),
    }),
  ]
  // [alchemyProvider({ apiKey: "https://eth-goerli.g.alchemy.com/v2/cZArJ5hDwpU8r_6CXv9KbYMJWUtrr3qS"}), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});



export default function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}
        theme={darkTheme({
          accentColor: '#000',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="stake" element={<StakePage />} />
              <Route path="vault" element={<Vault />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
;



//gradient(237.43deg, #2b313d -12.81%, #171a20 132.72%);