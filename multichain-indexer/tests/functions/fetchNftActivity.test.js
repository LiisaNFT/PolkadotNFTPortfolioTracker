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
    request.mockRejectedValueOnce(mockError); // Simulate error for this test case
  
    const host = 'http://localhost:4350';
    const nftId = '0x5173-076350-38733';
  
    // The function under test should throw an error, leading to the test passing
    await expect(fetchNftActivity(host, nftId)).rejects.toThrow('Network error');
    
    expect(request).toHaveBeenCalledTimes(1);
    // No need to check fs.readFileSync if not relevant for the error scenario
  });
});
