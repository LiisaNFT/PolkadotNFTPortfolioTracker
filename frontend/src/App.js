import React, { useState } from 'react';
import './App.css';
import OverviewBlock from './components/Overview/OverviewBlock';
import PortfolioScorecard from './components/Overview/PortfolioScorecard';
import PortfolioEvolution from './components/Overview/PortfolioEvolution';
import Inventory from './components/Overview/Inventory';
import TopGainers from './components/Overview/tops/TopGainers';
import TopLosers from './components/Overview/tops/TopLosers';
import RecentlyBought from './components/Overview/tops/RecentlyBought';
import NFTsDashboard from './components/NFTs/NFTsDashboard';
import CollectionsDashboard from './components/Collections/CollectionsDashboard';
import LiisaLogo from './LiisaLogo.svg'; 


function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  // Function to change the active tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          {/* Use the imported image here */}
          <img src={LiisaLogo} alt="Liisa Logo" />
        </div>

        {/* Placeholder for the center area if you plan to add anything later */}

        <div className="connect-wallet">
          <button>Connect Wallet</button>
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
        {activeTab === 'NFTs' && <NFTsDashboard />}
        {activeTab === 'Collections' && <CollectionsDashboard />}
      </main>
    </div>
  );
}

export default App;
