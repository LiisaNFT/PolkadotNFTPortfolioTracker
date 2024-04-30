// src/components/Collections/CollectionItem.js
import React from 'react';
import './CollectionItem.css'; // You'll create a CSS file for this component
import placeholderImage from './collectionplaceholder.png'; // Import the placeholder image

const CollectionItem = ({ imageUrl, name, nftsOwned, salesFloor, fpChange, investedValue, estimatedValue, unrealizedPnl, volume }) => {
    // Use the provided imageUrl if available, otherwise fallback to the placeholder image
    const finalImageUrl = imageUrl || placeholderImage;
    return (
      <div className="collection-item">
        <div className="name-column">
            <div className="collection-image">
                <img src={finalImageUrl}/>
            </div>
            <div className="name">{name}</div>
      </div>
        <div>{nftsOwned}</div>
        <div>{salesFloor}</div>
        <div className={fpChange > 0 ? 'positive' : 'negative'}>
          {fpChange > 0 ? `+${fpChange}%` : `${fpChange}%`}
        </div>
        <div>{investedValue}</div>
        <div>{estimatedValue}</div>
        <div className={`numeric ${unrealizedPnl > 0 ? 'positive' : 'negative'}`}>
          {unrealizedPnl}
        </div>
        <div>{volume}</div>
      </div>
    );
};
  
export default CollectionItem;
