import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Inventory from '../src/components/Overview/Inventory';

// Mock fetchCollectionNfts function
jest.mock('../../functions', () => ({
  fetchCollectionNfts: jest.fn(),
}));

describe('Inventory', () => {
  it('renders correctly with fetched data', async () => {
    // Mock data to be returned by fetchCollectionNfts
    const mockData = {
      data: {
        collections: [
          { name: 'Product A', nfts: [{}, {}, {}], value: 400 },
          { name: 'Product B', nfts: [{}, {}], value: 300 },
          { name: 'Product C', nfts: [{}, {}], value: 300 },
          { name: 'Product D', nfts: [{}], value: 200 },
          { name: 'Product E', nfts: [{}], value: 150 },
          { name: 'Product F', nfts: [{}], value: 120 },
          { name: 'Product G', nfts: [{}], value: 100 },
          { name: 'Product H', nfts: [{}], value: 80 },
          { name: 'Product I', nfts: [{}], value: 50 },
        ],
      },
    };

    // Set up mock data for fetchCollectionNfts
    require('../../functions').fetchCollectionNfts.mockResolvedValueOnce(mockData);

    // Render Inventory component
    const { getByText, getByTestId } = render(
      <Inventory isWalletConnected={true} walletAddress="exampleWalletAddress" />
    );

    // Wait for the chart to render
    await waitFor(() => {
      expect(getByText('Inventory')).toBeInTheDocument();
      expect(getByTestId('pie-chart')).toBeInTheDocument();
    });

    // Check if each product name is rendered with its corresponding value
    expect(getByText('Product A (40%)')).toBeInTheDocument();
    expect(getByText('Product B (30%)')).toBeInTheDocument();
    expect(getByText('Product C (30%)')).toBeInTheDocument();
    expect(getByText('Product D (20%)')).toBeInTheDocument();
    expect(getByText('Product E (15%)')).toBeInTheDocument();
    expect(getByText('Product F (12%)')).toBeInTheDocument();
    expect(getByText('Product G (10%)')).toBeInTheDocument();
    expect(getByText('Product H (8%)')).toBeInTheDocument();
    expect(getByText('Product I (5%)')).toBeInTheDocument();
  });

  it('handles error when fetching data', async () => {
    // Mock error to be thrown by fetchCollectionNfts
    const errorMessage = 'Failed to fetch collections';
    require('../../functions').fetchCollectionNfts.mockRejectedValueOnce(new Error(errorMessage));

    // Render Inventory component
    const { getByText } = render(
      <Inventory isWalletConnected={true} walletAddress="exampleWalletAddress" />
    );

    // Wait for the error message to render
    await waitFor(() => {
      expect(getByText('Error fetching collections: Failed to fetch collections')).toBeInTheDocument();
    });
  });
});
