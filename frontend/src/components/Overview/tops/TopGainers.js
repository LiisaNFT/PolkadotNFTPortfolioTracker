import React from 'react';
import './TopList.css'; // Reuse the same CSS file for consistency
import collectionPlaceholder from './collectionplaceholder.png'; // Adjust the path as needed

const TopGainers = () => {
  // Data representing top gainers
  const topGainers = [
    { name: 'Aave', change: '+45%' },
    { name: 'Uniswap', change: '+30%' },
    { name: 'Chainlink', change: '+25%' },
    { name: 'Litecoin', change: '+20%' },
    { name: 'Tezos', change: '+18%' },
  ];

  return (
    <div className="top-list">
      <h2>Top Gainers</h2>
      {topGainers.map((item, index) => (
        <div key={index} className="collection-item">
          <div className="name-column">
            <div className="collection-image">
              <img src={collectionPlaceholder} alt={item.name} />
            </div>
            <div className="name">{item.name}</div>
          </div>
          <div className={`change positive`}>{item.change}</div>
        </div>
      ))}
    </div>
  );
};

export default TopGainers;
