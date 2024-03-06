const { fetchWalletSpending } = require('../../src/functions/fetchWalletSpending');

// Mocking necessary modules
jest.mock('graphql-request', () => ({
  request: jest.fn().mockRejectedValue(new Error('Network error')),
}));

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('fetchWalletSpending', () => {
  // Helper function for mocking successful GraphQL responses
  const mockSuccessfulResponse = (data) => {
    const { request } = require('graphql-request');
    request.mockImplementationOnce(() => Promise.resolve(data));
  };

  // Helper function for mocking failed GraphQL responses
  const mockFailedResponse = (error) => {
    const { request } = require('graphql-request');
    request.mockImplementationOnce(() => Promise.reject(error));
  };

  // Helper function for mocking the content of the GraphQL query file
  const mockReadFileSync = (query) => {
    const fs = require('fs');
    fs.readFileSync.mockReturnValue(query);
  };

  afterEach(() => {
    // Clear all mocks after each test to ensure a clean state
    jest.clearAllMocks();
  });

  it('should return data successfully when the request succeeds', async () => {
    // Mocking the query content and GraphQL response
    const mockQuery = 'query getRevenueSpending { ... }'; // Simplified GraphQL query
    mockReadFileSync(mockQuery);
    const mockData = { spending: [], revenue: [] }; 
    mockSuccessfulResponse(mockData);

    const host = 'http://localhost:4350';
    const userId = '0x85b03CA16a7B59B392e54bbe4dEF189F6bF6F16b';
    const chain = 'Moonbeam';

    // Calling the function with mocked data
    const result = await fetchWalletSpending(host, userId, chain);

    // Verifying the function's behavior
    expect(result).toEqual(mockData);
    expect(require('graphql-request').request).toHaveBeenCalledTimes(1);
    expect(require('graphql-request').request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, { userId: userId, chain: chain });
  });

  it('should handle errors when the request fails', async () => {
    // Mocking the query content and a failure scenario
    const mockQuery = 'query getRevenueSpending { ... }'; // Simplified GraphQL query
    mockReadFileSync(mockQuery);
    const mockError = new Error('Network error');
    mockFailedResponse(mockError);

    const host = 'http://localhost:4350';
    const userId = '0x02AFA2DCE36a911741467D3cc8688Afcc9a5D3A6';
    const chain = 'Moonbeam';

    // Attempting to call the function and catch any thrown errors
    await expect(fetchWalletSpending(host, userId, chain)).rejects.toThrow('Network error');
    expect(require('graphql-request').request).toHaveBeenCalledTimes(1);
  });
});







