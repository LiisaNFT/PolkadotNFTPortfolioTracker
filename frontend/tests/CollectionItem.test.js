import React from 'react';
import { render, screen } from '@testing-library/react';
import CollectionItem from '../src/components/Collections/CollectionItem';

const mockCollection = {
  id: 1,
  name: "MoonPets",
  nftsOwned: 3,
  salesFloor: 40.0,
  fpChange: 39,
  investedValue: 113.6,
  estimatedValue: 120.0,
  unrealizedPnl: 6.4,
  volume: "32.35K"
};

describe('CollectionItem', () => {
  it('renders correctly with mock data', () => {
    render(
      <CollectionItem
        imageUrl="mockImageUrl"
        name={mockCollection.name}
        nftsOwned={mockCollection.nftsOwned}
        salesFloor={mockCollection.salesFloor}
        fpChange={mockCollection.fpChange}
        investedValue={mockCollection.investedValue}
        estimatedValue={mockCollection.estimatedValue}
        unrealizedPnl={mockCollection.unrealizedPnl}
        volume={mockCollection.volume}
      />
    );

    // Check if each data element is rendered
    expect(screen.getByText(mockCollection.name)).toBeInTheDocument();
    expect(screen.getByText(mockCollection.nftsOwned)).toBeInTheDocument();
    expect(screen.getByText(mockCollection.salesFloor)).toBeInTheDocument();
    expect(screen.getByText(`+${mockCollection.fpChange}%`)).toBeInTheDocument();
    expect(screen.getByText(mockCollection.investedValue)).toBeInTheDocument();
    expect(screen.getByText(mockCollection.estimatedValue)).toBeInTheDocument();
    expect(screen.getByText(mockCollection.unrealizedPnl)).toBeInTheDocument();
    expect(screen.getByText(mockCollection.volume)).toBeInTheDocument();

    // Check if image is rendered with correct src
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'mockImageUrl');
  });

  it('applies correct style for fpChange', () => {
    render(
      <CollectionItem
        imageUrl="mockImageUrl"
        name={mockCollection.name}
        nftsOwned={mockCollection.nftsOwned}
        salesFloor={mockCollection.salesFloor}
        fpChange={mockCollection.fpChange}
        investedValue={mockCollection.investedValue}
        estimatedValue={mockCollection.estimatedValue}
        unrealizedPnl={mockCollection.unrealizedPnl}
        volume={mockCollection.volume}
      />
    );

    // Check if correct class is applied based on fpChange
    const fpChangeElement = screen.getByText(`+${mockCollection.fpChange}%`);
    expect(fpChangeElement).toHaveClass('positive');
  });

  it('applies correct style for unrealizedPnl', () => {
    render(
      <CollectionItem
        imageUrl="mockImageUrl"
        name={mockCollection.name}
        nftsOwned={mockCollection.nftsOwned}
        salesFloor={mockCollection.salesFloor}
        fpChange={mockCollection.fpChange}
        investedValue={mockCollection.investedValue}
        estimatedValue={mockCollection.estimatedValue}
        unrealizedPnl={mockCollection.unrealizedPnl}
        volume={mockCollection.volume}
      />
    );

    // Check if correct class is applied based on unrealizedPnl
    const unrealizedPnlElement = screen.getByText(mockCollection.unrealizedPnl);
    expect(unrealizedPnlElement).toHaveClass('positive');
  });
});
