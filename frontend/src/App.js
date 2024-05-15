import React, { useState, useEffect } from 'react';
import './App.css';
import OverviewBlock from './components/Overview/OverviewBlock';
import PortfolioScorecard from './components/Overview/PortfolioScorecard';
import PortfolioEvolution from './components/Overview/PortfolioEvolution';
import Inventory from './components/Overview/Inventory';
import TopGainers from './components/Overview/tops/TopGainers';
import TopLosers from './components/Overview/tops/TopLosers';
import RecentlyBought from './components/Overview/tops/RecentlyBought';
import NFTsDashboard from './components/NFTs/NFTsDashboard';
import LiisaLogo from './LiisaLogo.svg';
import CollectionsDashboard from './components/Collections/CollectionsDashboard.js';
import { getWallets } from '@talisman-connect/wallets';

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const loadWallets = async () => {
      const availableWallets = getWallets();
      setWallets(availableWallets);
    };
    loadWallets();
  }, []);

  const connectWallet = async () => {
    const wallet = wallets[0]; // Adjust this index based on your wallet selection UI, if needed
    if (!wallet) {
      alert('No wallet available');
      return;
    }
    try {
      await wallet.enable('Your DApp Name');
      const unsubscribe = await wallet.subscribeAccounts((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0].address); // Set the first account address
        }
      });
      setSelectedWallet(wallet);
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
      alert('Failed to connect to wallet');
    }
  }; 
  
  const disconnectWallet = () => {
    setSelectedWallet(null);
    setWalletAddress('');
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const isWalletConnected = !!selectedWallet;

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <img src={LiisaLogo} alt="Liisa Logo" />
          </div>
          <div className="wallet-details">
          {walletAddress && <span>{walletAddress}</span>}
          <button onClick={selectedWallet ? disconnectWallet : connectWallet}>
            {selectedWallet ? 'Disconnect' : 'Connect Wallet'}
          </button>
        </div>
      </header>
      <div className="tabs">
        <button onClick={() => handleTabClick('Overview')} className={activeTab === 'Overview' ? 'active' : ''}>Overview</button>
        <button onClick={() => handleTabClick('NFTs')} className={activeTab === 'NFTs' ? 'active' : ''}>NFTs</button>
        <button onClick={() => handleTabClick('Collections')} className={activeTab === 'Collections' ? 'active' : ''}>Collections</button>
      </div>
      <main>
        {activeTab === 'Overview' && (
          <>
            <OverviewBlock />
            <div className="dashboard-middle">
              <PortfolioScorecard />
              <PortfolioEvolution />
              <Inventory />
            </div>
            <div className="dashboard-bottom">
              <TopGainers />
              <TopLosers />
              <RecentlyBought />
            </div>
          </>
        )}
        {activeTab === 'NFTs' && <NFTsDashboard walletAddress={walletAddress} />}
        {activeTab === 'Collections' && <CollectionsDashboard isWalletConnected={isWalletConnected} walletAddress={walletAddress} />}
      </main>
    </div>
  );
}

export default App;
