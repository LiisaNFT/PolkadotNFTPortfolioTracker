const { fetchNftActivity } = require('../../src/functions');
const { request } = require('graphql-request');
const fs = require('fs');

jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('fetchNftActivity', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it('should return NFT activity successfully when the request succeeds', async () => {
    const mockData = { transactions: [] };
    const mockQuery = 'query getNftActivity { ... }'; // Simplified GraphQL query
    fs.readFileSync.mockReturnValue(mockQuery);
    request.mockResolvedValueOnce(mockData);

    const host = 'http://localhost:4350';
    const nftId = '0x5173-076350-38733';

    const result = await fetchNftActivity(host, nftId);

    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, { nftId });
  });

  it('should handle errors when the request fails', async () => {
    const mockError = new Error('Network error');
    request.mockRejectedValueOnce(mockError); // Ensure the mock simulates a failure

    const host = 'http://localhost:4350';
    const nftId = '0x5173-076350-38733';

    await expect(fetchNftActivity(host, nftId)).rejects.toThrow('Network error');
    expect(request).toHaveBeenCalledTimes(1);
    // Ensure the fs.readFileSync mock is called with the correct parameters if needed
  });
});
