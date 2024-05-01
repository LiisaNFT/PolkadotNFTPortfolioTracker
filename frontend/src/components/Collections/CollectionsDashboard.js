import React, { useState, useEffect } from 'react';
import CollectionItem from './CollectionItem';
import './CollectionsDashboard.css'; 
import mockCollections from './mockCollectionsData.json'; // Import the JSON data
import { fetchCollectionNfts } from '../../functions';
import placeholderImage from './collectionplaceholder.png';

const host = '';

const CollectionsDashboard = ({ isWalletConnected, walletAddress }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isWalletConnected) {
        try {
          const data = await fetchCollectionNfts(host, walletAddress);
          setCollections(data);
        } catch (error) {
          console.error('Error fetching collections:', error);
          setCollections([]); 
        }
      } else {
        setCollections([]);
      }
    };

    fetchData();  
  }, [isWalletConnected, walletAddress]);

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
        <CollectionItem
          imageUrl={placeholderImage}
          name={collection.name}
          nftsOwned={collection.nftsOwned}
          salesFloor={collection.salesFloor}
          fpChange={collection.fpChange}
          investedValue={collection.investedValue}
          estimatedValue={collection.estimatedValue}
          unrealizedPnl={collection.unrealizedPnl}
          volume={collection.volume}
        />
      ))}
    </div>
  );
};
  
export default CollectionsDashboard;
