import React from 'react';
import { render } from '@testing-library/react';
import NFTCard from '../src/components/NFTs/NFTCard'; // Updated path to match your structure

describe('NFTCard', () => {
  it('renders NFT details correctly', () => {
    // Mock data for an NFT
    const mockNFT = {
      image: 'bayc1.png',
      collectionName: "Mutant Ape Yacht Club",
      itemId: "0001",
      estimatedValue: '40.0',
      acquisitionPrice: '55.0',
      unrealizedPNL: '-15.0',
      tradeCount: '41',
    };

    // Render the NFTCard component with mock data
    const { getByAltText, getByText } = render(
      <NFTCard
        image={mockNFT.image}
        collectionName={mockNFT.collectionName}
        itemId={mockNFT.itemId}
        estimatedValue={mockNFT.estimatedValue}
        acquisitionPrice={mockNFT.acquisitionPrice}
        unrealizedPNL={mockNFT.unrealizedPNL}
        tradeCount={mockNFT.tradeCount}
      />
    );

    // Check if the NFT details are rendered correctly
    expect(getByAltText('NFT')).toBeInTheDocument();
    expect(getByText('Mutant Ape Yacht Club #0001')).toBeInTheDocument();
    expect(getByText('Estimated Value: 40.0 GLMR')).toBeInTheDocument();
    expect(getByText('Acquisition Price: 55.0 GLMR')).toBeInTheDocument();
    expect(getByText('Unrealized PNL: -15.0 GLMR')).toBeInTheDocument();
    expect(getByText('24H Collection Trades: 41')).toBeInTheDocument();
  });
});
