// src/components/Collections/CollectionsDashboard.js
import React from 'react';
import CollectionItem from './CollectionItem';
import './CollectionsDashboard.css'; // Create a corresponding CSS file
import mockCollections from './mockCollectionsData.json'; // Import the JSON data

const CollectionsDashboard = () => {
    return (
        <div className="collections-dashboard">
        <div className="collection-header">
          <div className="name">Name</div>
          <div>NFTs Owned</div>
          <div>Sales Floor</div>
          <div>FP % Change</div>
          <div>Invested Value</div>
          <div>Estimated Value</div>
          <div>Unrealized PnL</div>
          <div>Volume</div>
        </div>
        {mockCollections.map(collection => (
          <CollectionItem key={collection.id} {...collection} />
        ))}
      </div>
    );
  };
  
  export default CollectionsDashboard;
