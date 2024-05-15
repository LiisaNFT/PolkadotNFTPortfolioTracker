import React from 'react';
import { render } from '@testing-library/react';
import Popup from '../src/components/NFTs/Popup/Popup';

describe('Popup', () => {
  it('renders popup content correctly', () => {
    const mockNFT = {
      image: 'bayc1.png',
      collectionName: "Mutant Ape Yacht Club",
      itemId: "0001",
      rarityRank: "880/10000",
      estimatedValue: '40.0',
      acquisitionPrice: '55.0',
      unrealizedPNL: '-15.0',
    };

    const { getByAltText, getByTestId } = render(
      <Popup
        onClose={() => {}}
        image={mockNFT.image}
        collectionName={mockNFT.collectionName}
        itemId={mockNFT.itemId}
        rarityRank={mockNFT.rarityRank}
        estimatedValue={mockNFT.estimatedValue}
        acquisitionPrice={mockNFT.acquisitionPrice}
        unrealizedPNL={mockNFT.unrealizedPNL}
      />
    );

    expect(getByAltText('Selected NFT')).toBeInTheDocument();
    expect(getByTestId('collection-name')).toHaveTextContent('Mutant Ape Yacht Club #0001');
    expect(getByTestId('rarity-rank')).toHaveTextContent('Rarity Rank: 880/10000');
    expect(getByTestId('estimated-value')).toHaveTextContent('$40.0M');
    expect(getByTestId('acquisition-price')).toHaveTextContent('$55.0M');
    expect(getByTestId('unrealized-pnl')).toHaveTextContent('$-15.0M');
  });
});
