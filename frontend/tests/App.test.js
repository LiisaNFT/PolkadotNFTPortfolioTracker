import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from '../src/App';

// Mock the Talisman Connect wallet functions
jest.mock('@talisman-connect/wallets', () => ({
  getWallets: jest.fn(() => []),
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls between tests
  });

  it('renders without crashing', () => {
    render(<App />);
    const logoElement = screen.getByAltText('Liisa Logo');
    expect(logoElement).toBeInTheDocument();
  });

  it('renders the connect wallet button', () => {
    render(<App />);
    const connectWalletButton = screen.getByText('Connect Wallet');
    expect(connectWalletButton).toBeInTheDocument();
  });

  it('connects and disconnects wallet when button is clicked', async () => {
    // Mock wallet enabling function
    const enableMock = jest.fn();
    const subscribeAccountsMock = jest.fn((callback) => {
      callback([{ address: 'test-address' }]);
      return { unsubscribe: jest.fn() };
    });
    const mockWallet = {
      enable: enableMock,
      subscribeAccounts: subscribeAccountsMock,
    };
    jest.spyOn(global, 'alert').mockImplementation(() => {}); // Mock alert function

    // Mock available wallets
    require('@talisman-connect/wallets').getWallets.mockReturnValueOnce([mockWallet]);

    render(<App />);

    // Click connect wallet button
    const connectWalletButton = screen.getByText('Connect Wallet');
    await act(async () => {
      fireEvent.click(connectWalletButton);
    });

    // Ensure wallet is connected
    expect(enableMock).toHaveBeenCalledWith('Your DApp Name');
    expect(subscribeAccountsMock).toHaveBeenCalled();

    // Check if wallet address is displayed
    await waitFor(() => expect(screen.getByText('test-address')).toBeInTheDocument());

    // Click disconnect wallet button
    const disconnectWalletButton = screen.getByText('Disconnect');
    await act(async () => {
      fireEvent.click(disconnectWalletButton);
    });

    // Ensure wallet is disconnected
    expect(screen.queryByText('Disconnect')).not.toBeInTheDocument();
  });

  it('renders the Overview tab by default', () => {
    render(<App />);
    const overviewTab = screen.getByText('Overview');
    expect(overviewTab).toHaveClass('active');
  });

  it('renders different tabs when clicked', async () => {
    render(<App />);

    // Click NFTs tab
    const nftsTab = screen.getByText('NFTs');
    await act(async () => {
      fireEvent.click(nftsTab);
    });
    expect(nftsTab).toHaveClass('active');

    // Click Collections tab
    const collectionsTab = screen.getByText('Collections');
    await act(async () => {
      fireEvent.click(collectionsTab);
    });
    expect(collectionsTab).toHaveClass('active');
  });
});
