import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import Mint from './Mint';
import Podcast from './Podcast';
import ABI from './ABI.json';
import Logo from './Logo.png';

const contractAddress = "0xD748F1C8C250f1bF1B9EFadd156aBD6EaE5F5143";

function App() {

  const [connected, setConnected] = useState(false);
  const [minted, setMinted] = useState(false);
  const [name, setName] = useState(null);

  const connect = async () => {
    try {
      let provider;
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const network = await provider.getNetwork();
      const desiredChainId = '0xAA36A7';
      if (network.chainId !== parseInt(desiredChainId)) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: desiredChainId }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: desiredChainId,
                  chainName: 'Sepolia',
                  nativeCurrency: {
                    name: 'ETH',
                    symbol: 'ETH',
                    decimals: 18
                  },
                  rpcUrls: ['https://rpc.sepolia.org'],
                  blockExplorerUrls: ['https://sepolia.etherscan.io'],
                }],
              });
            } catch (addError) {
              throw addError;
            }
          } else {
            throw switchError;
          }
        }
      }
      provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const _userAddress = await signer.getAddress();
      const { ethereum } = window;
      if (ethereum) {
        const ensProvider = new ethers.providers.InfuraProvider('mainnet');
        const displayAddress = _userAddress?.substr(0, 6) + "...";
        const ens = await ensProvider.lookupAddress(_userAddress);
        if (ens !== null) {
          setName(ens)

        } else {
          setName(displayAddress)
        }
      }

      await signer.signMessage("Welcome to Web3 Builders!");
      setConnected(true)
    } catch(error) {
      console.log(error)
    }
  }

  const mint = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = signer.getAddress();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      const tx = await contract.safeMint(address);
      await tx.wait()
      setMinted(true)
    } catch(error) {
      console.log(error)
    }
  }

  const disconnect = async () => {
    setConnected(false)
    setMinted(false)
  }
  
  return (
    <div className="app">
      <BrowserRouter>
        {!connected ? (
          <button className='connect-btn' onClick={connect}>Connect</button>
        ) : (
          <>
            <button className='disconnect-btn' onClick={disconnect}>{name}</button>
            <nav>
              <Link to='/mint'>Mint</Link>
              <Link to='/podcast'>Podcast</Link>
            </nav>
            
            <div className='card'>
              <img src={Logo} alt='logo' />
              <hr />
            <Routes>
              <Route path='/mint' element={<Mint mint={mint} minted={minted} />} />
              <Route path='/podcast' element={<Podcast />} />
            </Routes>

            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
