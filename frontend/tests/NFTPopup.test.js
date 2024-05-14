import React from 'react';
import { render } from '@testing-library/react';
import Popup from './Popup';

describe('Popup', () => {
  it('renders popup content correctly', () => {
    // Mock data for an NFT
    const mockNFT = {
      image: 'bayc1.png',
      collectionName: "Mutant Ape Yacht Club",
      itemId: "0001",
      rarityRank: "880/10000",
      estimatedValue: '40.0',
      acquisitionPrice: '55.0',
      unrealizedPNL: '-15.0',
    };

    // Mock activity data
    const mockActivityData = [
      {
        event: "Sale",
        price: "1.5 ETH",
        from: "0x096a685Bfd75c3998CFC4c70177e17ee6b582B0A",
        to: "0x1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T",
        date: "2023-01-01"
      },
      {
        event: "Transfer",
        price: "N/A",
        from: "0x1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T",
        to: "0x096a685Bfd75c3998CFC4c70177e17ee6b582B0A",
        date: "2023-01-02"
      }
    ];

    // Render the Popup component with mock data
    const { getByAltText, getByText } = render(
      <Popup
        onClose={() => {}} // Mock onClose function
        image={mockNFT.image}
        collectionName={mockNFT.collectionName}
        itemId={mockNFT.itemId}
        rarityRank={mockNFT.rarityRank}
        estimatedValue={mockNFT.estimatedValue}
        acquisitionPrice={mockNFT.acquisitionPrice}
        unrealizedPNL={mockNFT.unrealizedPNL}
      />
    );

    // Check if popup content renders correctly
    expect(getByAltText('Selected NFT')).toBeInTheDocument();
    expect(getByText('Mutant Ape Yacht Club #0001')).toBeInTheDocument();
    expect(getByText('Rarity Rank: 880/10000')).toBeInTheDocument();
    expect(getByText('Estimated Value: $40.0M')).toBeInTheDocument();
    expect(getByText('Acquisition Price: $55.0M')).toBeInTheDocument();
    expect(getByText('Unrealized PNL: $-15.0M')).toBeInTheDocument();

    // Check if activity data renders correctly
    expect(getByText('Activity')).toBeInTheDocument();
    expect(getByText('Sale')).toBeInTheDocument();
    expect(getByText('1.5 ETH')).toBeInTheDocument();
    expect(getByText('0x096a6...582B0A')).toBeInTheDocument();
    expect(getByText('0x1a2B3c...8R9s0T')).toBeInTheDocument();
    expect(getByText('2023-01-01')).toBeInTheDocument();
    expect(getByText('Transfer')).toBeInTheDocument();
    expect(getByText('N/A')).toBeInTheDocument();
    expect(getByText('0x1a2B3c...8R9s0T')).toBeInTheDocument();
    expect(getByText('0x096a6...582B0A')).toBeInTheDocument();
    expect(getByText('2023-01-02')).toBeInTheDocument();
  });
});
