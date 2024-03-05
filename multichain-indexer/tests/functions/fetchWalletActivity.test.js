const { fetchWalletActivity } = require('../../src/functions/fetchWalletActivity');
const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

// Mocking the graphql-request and fs modules
jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
jest.mock('fs');

describe('fetchWalletActivity', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  const mockQuery = 'query getWalletActivitya { ... }'; // A valid GraphQL query
  const mockFilePath = path.join(__dirname, '../../src/queries/getTransactions.graphql');
  fs.readFileSync.mockReturnValue(mockQuery);

  it('should return data successfully when the request succeeds', async () => {
    const mockData = { nftEvents: [] }; // Example response data
    request.mockResolvedValue(mockData);

    const host = 'http://localhost:4350';
    const userId = '0x02AFA2DCE36a911741467D3cc8688Afcc9a5D3A6';

    // Calling the function to test
    const result = await fetchWalletActivity(host, userId);

    // Assertions to verify the behavior
    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, { userId });
    expect(fs.readFileSync).toHaveBeenCalledWith(mockFilePath, 'utf8'); 
  });

  it('should handle errors when the request fails', async () => {

    const mockError = new Error('Network error');
    request.mockRejectedValue(mockError);

    const host = 'http://localhost:4350';
    const userId = '0x02AFA2DCE36a911741467D3cc8688Afcc9a5D3A6';
    
    // The promise rejection is expected here
    await expect(fetchWalletActivity(host, userId)).rejects.toThrow('Network error');
    expect(request).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(mockFilePath, 'utf8'); // Verify correct file read
  });
});






