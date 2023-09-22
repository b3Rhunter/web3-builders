import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import Mint from './Mint';
import Podcast from './Podcast';
import Home from './Home';
import Team from './Team';
import ABI from './ABI.json';
import SubABI from './SubscribeABI.json';
import Logo from './Logo.png';

const contractAddress = "0xD748F1C8C250f1bF1B9EFadd156aBD6EaE5F5143";
const subscribeAddress = "0xf8eC8459ee17B65e6f8A741B3286719822C92A78";

function App() {

  const [connected, setConnected] = useState(false);
  const [minted, setMinted] = useState(false);
  const [name, setName] = useState(null);
  const [userName, setUserName] = useState("");
  const [sub, setSub] = useState(false);
  const [subs, setSubs] = useState("")

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
      const contract = new ethers.Contract(subscribeAddress, SubABI, signer);
      const subCheck = await contract.isSubscriber(_userAddress);

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

      if (subCheck === false) {
        setSub(true)
      }
      if (subCheck === true) {
        const getName = await contract.getUsername(_userAddress);
        setName(getName)
      }
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
    setSub(false)
  }

  const subscribe = async (userName) => {
    try {
      console.log(userName)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = signer.getAddress();
      const contract = new ethers.Contract(subscribeAddress, SubABI, signer);
      const tx = await contract.subscribe(userName);
      await tx.wait()

      getSubs()
      setSub(false)
      setName(userName)
      setConnected(true)
    } catch(error) {
      console.log(error)
    }
  }

  function openSub() {
    setSub(true)
  }

  function closeSub() {
    setSub(false)
  }

  const getSubs = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const contract = new ethers.Contract(subscribeAddress, SubABI, signer);
      const _getSubs = await contract.subscriberCount()
      setSubs(_getSubs.toString())
    } catch(error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getSubs()
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
          <>
            {/* <button className='disconnect-btn' onClick={disconnect}>{name}</button> */}
            <p className='subs'>total subscribers: {subs}</p>
            <nav>
              <Link to='/home'>Home</Link>
              <Link to='/mint'>Collect</Link>
              <Link to='/podcast'>Podcast</Link>
              <Link to='/team'>The Team</Link>
              {!connected && <button onClick={connect}>Sign In</button>}
              {connected && <button onClick={disconnect}>{name}</button>}
            </nav>

            <div className='card'>
              <img src={Logo} alt='logo' />
              <hr />
            {sub && (
              <div className='sub'>
                <strong style={{fontSize: "18px"}}>Sign up today!</strong>
                <input type='text' placeholder='choose user name...' value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <div className='sub-btns'>
                <button onClick={() => subscribe(userName)}>submit</button>
                <button onClick={closeSub}>close</button>
                </div>
              </div>
            )}
            <Routes>
            <Route path="/" element={<Home />} />
              <Route path='/home' element={<Home/>}/>
              <Route path='/mint' element={<Mint mint={mint} minted={minted} connect={connect} connected={connected} />} />
              <Route path='/podcast' element={<Podcast />} />
              <Route path='/team' element={<Team/>}/>
            </Routes>

            </div>
          </>
      </BrowserRouter>
    </div>
  );
}

export default App;
