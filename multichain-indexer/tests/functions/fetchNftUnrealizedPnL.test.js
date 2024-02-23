const { fetchNftUnrealizedPnL } = require('../../src/functions/fetchNftUnrealizedPnL');
const { fetchNftAcquisitionPrice } = require('../../src/functions/fetchNftAcquisitionPrice');
const { nftEstimatedValue } = require('../../src/functions/nftEstimatedValue');
 
// Mock the dependent functions
jest.mock('../../src/functions/fetchNftAcquisitionPrice', () => ({
  fetchNftAcquisitionPrice: jest.fn(),
}));
jest.mock('../../src/functions/nftEstimatedValue', () => ({
  nftEstimatedValue: jest.fn(),
}));

describe('fetchNftUnrealizedPnL', () => {
  const host = 'http://localhost:4350';
  const nftId = '0x5173-076350-38733';
  const collectionId = '0x51737fa634e26f5687e45c6ca07604e064076350';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly calculate unrealized P&L', async () => {
    const mockAcquisitionPrice = 100; // Mock acquisition price
    const mockEstimatedPrice = 150; // Mock estimated price
    fetchNftAcquisitionPrice.mockResolvedValue(mockAcquisitionPrice);
    nftEstimatedValue.mockResolvedValue(mockEstimatedPrice);

    const unrealizedPnL = await fetchNftUnrealizedPnL(host, nftId, collectionId);

    expect(fetchNftAcquisitionPrice).toHaveBeenCalledWith(host, nftId);
    expect(nftEstimatedValue).toHaveBeenCalledWith(host, nftId, collectionId);
    expect(unrealizedPnL).toBe(mockEstimatedPrice - mockAcquisitionPrice);
  });

  it('should handle errors gracefully', async () => {
    fetchNftAcquisitionPrice.mockRejectedValue(new Error('Network error'));
    nftEstimatedValue.mockResolvedValue(150); // This call might not even be reached due to the error in fetchNftAcquisitionPrice

    await expect(fetchNftUnrealizedPnL(host, nftId, collectionId)).rejects.toThrow('Network error');
  });
});





