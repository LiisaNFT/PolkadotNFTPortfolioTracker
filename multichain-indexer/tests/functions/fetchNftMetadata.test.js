const { fetchNftMetadata } = require('../../src/functions');
const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
jest.mock('fs');

describe('fetchNftMetadata', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });
  
  const mockQuery = 'query getNftMetadata { ... }'; // A valid GraphQL query
  const mockFilePath = path.join(__dirname, '../../src/queries/getNftMetadata.graphql');
  fs.readFileSync.mockReturnValue(mockQuery);

  it('should return NFT metadata successfully when the request succeeds', async () => {
    const mockData = { nfTokens: [] };
    request.mockResolvedValue(mockData);

    const host = 'http://localhost:4350';
    const nftId = '0x5173-076350-38733';
    const variables = { nftId: nftId }; 

    const result = await fetchNftMetadata(host, nftId);

    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, variables);
    expect(fs.readFileSync).toHaveBeenCalledWith(mockFilePath, 'utf8'); 
  });

  it('should handle errors when the request fails', async () => {
    const mockError = new Error('Network error');
    request.mockRejectedValue(mockError);

    const host = 'http://localhost:4350';
    const nftId = '0x5173-076350-38733';

    // The promise rejection is expected here
    await expect(fetchNftMetadata(host, nftId)).rejects.toThrow('Network error');

    expect(request).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(mockFilePath, 'utf8'); // Verify correct file read
  });
});




