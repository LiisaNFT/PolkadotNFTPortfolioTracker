import React from 'react';
import './TopList.css'; // Ensure the path is correct
import collectionPlaceholder from './collectionplaceholder.png'; // Adjust the path as needed

const RecentlyBought = () => {
  // Updated data to include percentage changes
  const recentlyBought = [
    { name: 'Ethereum', change: '+35%' },
    { name: 'Bitcoin', change: '-7%' },
    { name: 'Cardano', change: '+15%' },
    { name: 'Solana', change: '-2%' },
    { name: 'Polkadot', change: '+22%' },
  ];

  return (
    <div className="top-list">
      <h2>Recently Bought</h2>
      {recentlyBought.map((item, index) => (
        <div key={index} className="collection-item">
          <div className="name-column">
            <div className="collection-image">
              <img src={collectionPlaceholder} alt={item.name} />
            </div>
            <div className="name">{item.name}</div>
          </div>
          <div className={`change ${item.change.startsWith('-') ? 'negative' : 'positive'}`}>
            {item.change}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentlyBought;
