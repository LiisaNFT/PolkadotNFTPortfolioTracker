const { fetchNftAcquisitionPrice } = require('../../src/functions');
const { request } = require('graphql-request');
const fs = require('fs');
jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
jest.mock('fs');

describe('fetchNftAcquisitionPrice', () => {
  const mockQuery = 'query getNftAcquisitionPrice { ... }'; // Simplified GraphQL query
  const mockFilePath = '../queries/lastNftTransaction.graphql';
  fs.readFileSync.mockReturnValue(mockQuery);

  const mockSuccessfulResponse = (data) => {
    request.mockResolvedValueOnce(data);
  };

  const mockFailedResponse = (error) => {
    request.mockRejectedValueOnce(error);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return NFT acquisition price successfully when the request succeeds', async () => {
    const mockData = { acquisitionPrice: { amount: 100, currency: 'ETH' } };
    mockSuccessfulResponse(mockData);

    const host = 'http://localhost:4350';
    const nftId = '0x5173-076350-38733';

    const result = await fetchNftAcquisitionPrice(host, nftId);

    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, {
      nftId,
    });
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath), 'utf8');
  });

  it('should handle errors when the request fails', async () => {
    const mockError = new Error('Network error');
    mockFailedResponse(mockError);

    const host = 'http://localhost:4350';
    const nftId = '0x5173-076350-38733';

    await expect(fetchNftAcquisitionPrice(host, nftId)).rejects.toThrow(mockError);
    expect(request).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath), 'utf8');
  });
});


