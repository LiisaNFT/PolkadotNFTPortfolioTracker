import React from 'react';
import { render } from '@testing-library/react';
import CollectionsDashboard from '../src/components/Collections/CollectionsDashboard';

// Import mockCollections data/
import mockCollections from '../src/components/Collections/mockCollectionsData.json';

// Mock the fetchCollectionNfts function
jest.mock('../src/functions', () => ({
  fetchCollectionNfts: jest.fn(() => Promise.resolve({ collections: mockCollections })),
}));

describe('CollectionsDashboard', () => {
  it('renders correctly with mock collections data', async () => {
    const { getByText } = render(<CollectionsDashboard isWalletConnected={false} walletAddress="" />);
    
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('NFTs Owned')).toBeInTheDocument();
    expect(getByText('Sales Floor')).toBeInTheDocument();
    expect(getByText('FP % Change')).toBeInTheDocument();
    expect(getByText('Invested Value')).toBeInTheDocument();
    expect(getByText('Estimated Value')).toBeInTheDocument();
    expect(getByText('Unrealized PnL')).toBeInTheDocument();
    expect(getByText('Volume')).toBeInTheDocument();

    // Check if each collection name from mock data is rendered
    mockCollections.forEach(collection => {
      expect(getByText(collection.name)).toBeInTheDocument();
    });
  });
});
