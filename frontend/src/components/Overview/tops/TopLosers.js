import React from 'react';
import './TopList.css'; // Reuse the same CSS file for consistency
import collectionPlaceholder from './collectionplaceholder.png'; // Adjust the path as needed

const TopLosers = () => {
  // Data representing top losers
  const topLosers = [
    { name: 'Sushiswap', change: '-10%' },
    { name: 'Compound', change: '-8%' },
    { name: 'Yearn.finance', change: '-5%' },
    { name: 'Maker', change: '-4%' },
    { name: 'Algorand', change: '-3%' },
  ];

  return (
    <div className="top-list">
      <h2>Top Losers</h2>
      {topLosers.map((item, index) => (
        <div key={index} className="collection-item">
          <div className="name-column">
            <div className="collection-image">
              <img src={collectionPlaceholder} alt={item.name} />
            </div>
            <div className="name">{item.name}</div>
          </div>
          <div className={`change negative`}>{item.change}</div>
        </div>
      ))}
    </div>
  );
};

export default TopLosers;
