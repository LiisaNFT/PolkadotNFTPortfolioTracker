import React, { useState } from 'react';
import NFTCard from './NFTCard';
import Popup from './Popup/Popup'; // Updated path to reflect the new folder structure
import './NFTsDashboard.css'; // Ensure CSS is properly set up for styling
import bayc1 from './bayc1.png';
import bayc2 from './bayc2.png';
import bayc3 from './bayc3.png';
import bayc4 from './bayc4.png';
import bayc5 from './bayc5.png';
import bayc6 from './bayc6.png';

const mockNFTs = [
  { id: 1, image: bayc1, collectionName: "Mutant Ape Yacht Club", itemId: "0001", rarityRank:"880/10000", estimatedValue: '40.0', acquisitionPrice: '55.0', unrealizedPNL: '-15.0', tradeCount: '41' },
  { id: 2, image: bayc2, collectionName: "Bored Ape Yacht Club", itemId: "0002", rarityRank:"4/10000",estimatedValue: '40.0', acquisitionPrice: '55.0', unrealizedPNL: '-15.0', tradeCount: '41' },
  { id: 3, image: bayc3, collectionName: "Bored Ape Yacht Club", itemId: "0003", rarityRank:"7/10000",estimatedValue: '40.0', acquisitionPrice: '55.0', unrealizedPNL: '-15.0', tradeCount: '41' },
  { id: 4, image: bayc4, collectionName: "Bored Ape Yacht Club", itemId: "0004", rarityRank:"420/10000",estimatedValue: '40.0', acquisitionPrice: '55.0', unrealizedPNL: '-15.0', tradeCount: '41' },
  { id: 5, image: bayc5, collectionName: "Bored Ape Yacht Club", itemId: "0005", rarityRank:"999/10000",estimatedValue: '40.0', acquisitionPrice: '55.0', unrealizedPNL: '-15.0', tradeCount: '41' },
  { id: 6, image: bayc6, collectionName: "Bored Ape Yacht Club", itemId: "0006", rarityRank:"8050/10000",estimatedValue: '40.0', acquisitionPrice: '55.0', unrealizedPNL: '-15.0', tradeCount: '41' },
];

const NFTsDashboard = () => {
  const [selectedNFT, setSelectedNFT] = useState(null);

  const handleClosePopup = () => {
    setSelectedNFT(null); // Close popup by resetting the selected NFT
  };

  return (
    <div className="nft-dashboard">
      {mockNFTs.map((nft) => (
        <div key={nft.id} onClick={() => setSelectedNFT(nft)} style={{ cursor: 'pointer' }}>
          <NFTCard
            image={nft.image}
            collectionName={nft.collectionName}
            itemId={nft.itemId}
            rarityRank={nft.rarityRank}
            estimatedValue={nft.estimatedValue}
            acquisitionPrice={nft.acquisitionPrice}
            unrealizedPNL={nft.unrealizedPNL}
            tradeCount={nft.tradeCount}
          />
        </div>
      ))}
      {selectedNFT && (
        <Popup 
            onClose={handleClosePopup} 
            image={selectedNFT.image}
            collectionName={selectedNFT.collectionName}
            itemId={selectedNFT.itemId}
            rarityRank={selectedNFT.rarityRank}
            estimatedValue={selectedNFT.estimatedValue}
            acquisitionPrice={selectedNFT.acquisitionPrice}
            unrealizedPNL={selectedNFT.unrealizedPNL}
        >
            {/* Content here is now managed within the Popup component */}
        </Popup>
)}
    </div>
  );
};

export default NFTsDashboard;
