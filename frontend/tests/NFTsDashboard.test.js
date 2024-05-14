import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NFTsDashboard from './NFTsDashboard';
import { fetchCollectionNfts } from '../../functions';

// Mock fetchCollectionNfts function
jest.mock('../../functions', () => ({
  fetchCollectionNfts: jest.fn(),
}));

describe('NFTsDashboard', () => {
  it('renders NFT cards correctly', async () => {
    // Mock data to be returned by fetchCollectionNfts
    const mockData = {
      ownedTokens: [
        { id: 1, image: 'bayc1.png', collection: { name: "Mutant Ape Yacht Club" }, nativeId: "0001", rarityRank:"880/10000", estimatedValue: '40.0', acquisitionPrice: '55.0', unrealizedPNL: '-15.0', tradeCount: '41' },
        // Add more mock data as needed
      ],
    };

    // Set up mock data for fetchCollectionNfts
    fetchCollectionNfts.mockResolvedValueOnce(mockData);

    // Render NFTsDashboard component
    const { getByText } = render(<NFTsDashboard isWalletConnected={true} walletAddress="exampleWalletAddress" />);

    // Wait for the NFT cards to render
    await new Promise(resolve => setTimeout(resolve, 100)); // Wait for async rendering

    // Check if the NFT cards are rendered correctly
    expect(getByText('Mutant Ape Yacht Club')).toBeInTheDocument();
    // Add more assertions as needed for other properties
  });

  it('opens and closes popup on NFT card click', async () => {
    // Mock data to be returned by fetchCollectionNfts
    const mockData = {
      ownedTokens: [
        { id: 1, image: 'bayc1.png', collection: { name: "Mutant Ape Yacht Club" }, nativeId: "0001", rarityRank:"880/10000", estimatedValue: '40.0', acquisitionPrice: '55.0', unrealizedPNL: '-15.0', tradeCount: '41' },
        // Add more mock data as needed
      ],
    };

    // Set up mock data for fetchCollectionNfts
    fetchCollectionNfts.mockResolvedValueOnce(mockData);

    // Render NFTsDashboard component
    const { getByTestId, queryByTestId } = render(<NFTsDashboard isWalletConnected={true} walletAddress="exampleWalletAddress" />);

    // Wait for the NFT cards to render
    await new Promise(resolve => setTimeout(resolve, 100)); // Wait for async rendering

    // Check if popup is closed initially
    expect(queryByTestId('popup')).not.toBeInTheDocument();

    // Click on an NFT card to open the popup
    fireEvent.click(getByTestId('nft-card'));

    // Check if popup is opened
    expect(getByTestId('popup')).toBeInTheDocument();

    // Click on close button in the popup
    fireEvent.click(getByTestId('close-popup-button'));

    // Check if popup is closed after clicking the close button
    expect(queryByTestId('popup')).not.toBeInTheDocument();
  });
});
