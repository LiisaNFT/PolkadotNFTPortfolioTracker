// In src/components/NFTs/NFTCard.js
import React from 'react';
import './NFTCard.css'; // Make sure to create an accompanying CSS file

const NFTCard = ({ image, collectionName,itemId, estimatedValue, acquisitionPrice, unrealizedPNL, tradeCount }) => {
  return (
    <div className="nft-card">
      <img src={image} alt="NFT" />
      <div className="nft-details">
        <div style={{ fontWeight: 'bold', marginBottom: '8px'}}>{collectionName} #{itemId}</div>
        <div>Estimated Value: {estimatedValue} GLMR</div>
        <div>Acquisition Price: {acquisitionPrice} GLMR</div>
        <div>Unrealized PNL: {unrealizedPNL} GLMR</div>
        <div>24H Collection Trades: {tradeCount}</div>
      </div>
    </div>
  );
};

export default NFTCard;
