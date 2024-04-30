// src/components/Collections/CollectionsDashboard.js
import React, { useState, useEffect } from 'react';
import CollectionItem from './CollectionItem';
import './CollectionsDashboard.css'; 
import mockCollections from './mockCollectionsData.json'; // Import the JSON data
import { fetchCollectionNfts } from '../../functions';


const CollectionsDashboard = ({ isWalletConnected }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isWalletConnected) { // Only fetch data if the wallet is connected
        try {
          const data = await fetchCollectionNfts();
          setCollections(data);
        } catch (error) {
          console.error('Error fetching collections:', error);
          setCollections([]); // Optionally clear or maintain old data based on your use case
        }
      } else {
        setCollections([]); // Clear data if wallet is not connected
      }
    };

    fetchData();
  }, [isWalletConnected]);

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
      {collections.map(collection => (
        <CollectionItem key={collection.id} {...collection} />
      ))}
    </div>
  );
};
  
export default CollectionsDashboard;
