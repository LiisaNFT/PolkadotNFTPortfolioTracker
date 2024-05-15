import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Popup.css';
import nftValueData from './nftValueData.json';
import activityData from './activityData.json';

const Popup = ({ onClose, image, collectionName, itemId, rarityRank, estimatedValue, acquisitionPrice, unrealizedPNL }) => {
  const abbreviateAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="popup-overlay" data-testid="popup">
      <div className="popup-content">
        <div className="popup-left-block">
          <img src={image} alt="Selected NFT" />
          <div className="collection-info">
            <div className="collection-name" data-testid="collection-name">{collectionName} #{itemId}</div>
            <div className="rarity-rank" data-testid="rarity-rank">Rarity Rank: {rarityRank}</div>
          </div>
        </div>
        <div className="popup-right-block">
          <div className="data-cards">
            <div className="card">
              <div className="card-title">Estimated Value</div>
              <div className="card-value" data-testid="estimated-value">${estimatedValue}M</div>
            </div>
            <div className="card">
              <div className="card-title">Acquisition Price</div>
              <div className="card-value" data-testid="acquisition-price">${acquisitionPrice}M</div>
            </div>
            <div className="card">
              <div className="card-title">Unrealized PNL</div>
              <div className="card-value" data-testid="unrealized-pnl">${unrealizedPNL}M</div>
            </div>
          </div>
          <div className="nft-value-chart">
            <div className="nft-value-chart-title">NFT Value</div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={nftValueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="nftEstimatedValue" stroke="#8884d8" dot={false} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="activity-table">
            <div className="table-title">Activity</div>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Price</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activityData.map((activity, index) => (
                  <tr key={index}>
                    <td>{activity.event}</td>
                    <td>{activity.price}</td>
                    <td>{abbreviateAddress(activity.from)}</td>
                    <td>{abbreviateAddress(activity.to)}</td>
                    <td>{activity.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={onClose} className="popup-close-button" data-testid="close-popup-button">X</button>
      </div>
    </div>
  );
};

export default Popup;
