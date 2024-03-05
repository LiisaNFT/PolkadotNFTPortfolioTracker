const { fetchCollectionNfts } = require('../../src/functions');
const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
jest.mock('fs');

describe('fetchCollectionNfts', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  const mockQuery = 'query PortfolioDetails { ... }'; // Simplified GraphQL query
  const mockFilePath = path.join(__dirname, '../../src/queries/getPortfolio.graphql');
  fs.readFileSync.mockReturnValue(mockQuery);

  it('should return NFTs owned per collection successfully when the request succeeds', async () => {
    const mockData = { /* Adjust based on the expected structure from the real query */ };
    request.mockResolvedValue(mockData);

    const host = 'http://localhost:4350';
    const userId = '0x026fc0D0b90Ea52A992db2a4536e5C378d977c63';

    const result = await fetchCollectionNfts(host, userId);

    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, { userId });
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath), 'utf8');
  });

  it('should handle errors when the request fails', async () => {
    const mockError = new Error('Network error');
    request.mockRejectedValue(mockError);

    const host = 'http://localhost:4350';
    const userId = '0x026fc0D0b90Ea52A992db2a4536e5C378d977c63';

    await expect(fetchCollectionNfts(host, userId)).rejects.toThrow(mockError);
    expect(request).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath), 'utf8');
  });
});

