import './App.css';
import Home from './Home';
import Stake from './Stake';
import Vault from './Vault';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import './App.css';
import { mainnet, polygon, optimism, goerli } from 'wagmi/chains'
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"




const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, goerli],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://goerli.infura.io/v3/e7af8fc766b941c498bc770af5246568`,
        webSocket: `wss://goerli.infura.io/v3/e7af8fc766b941c498bc770af5246568`
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
              <Route path="stake" element={<Stake />} />
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