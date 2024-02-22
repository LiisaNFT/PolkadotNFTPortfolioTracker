const { fetchWalletActivity } = require('../../src/functions/fetchWalletActivity');

// Mocking the graphql-request and fs modules
jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('fetchWalletActivity', () => {
  // Define a helper function for mocking successful responses
  const mockSuccessfulResponse = (data) => {
    const { request } = require('graphql-request');
    request.mockImplementationOnce(() => Promise.resolve(data));
  };

  // Define a helper function for mocking failed responses
  const mockFailedResponse = (error) => {
    const { request } = require('graphql-request');
    request.mockImplementationOnce(() => Promise.reject(error));
  };

  // Define a helper function to mock the readFileSync method
  const mockReadFileSync = (query) => {
    const fs = require('fs');
    fs.readFileSync.mockReturnValue(query);
  };

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  it('should return data successfully when the request succeeds', async () => {
    // Mocking the query file content and the GraphQL request
    const mockQuery = 'query getWalletActivity { ... }'; // Simplified GraphQL query
    mockReadFileSync(mockQuery);
    const mockData = { transactions: [] }; // Example response data
    mockSuccessfulResponse(mockData);

    const host = 'http://localhost:4350';
    const userId = '0x02AFA2DCE36a911741467D3cc8688Afcc9a5D3A6';

    // Calling the function to test
    const result = await fetchWalletActivity(host, userId);

    // Assertions to verify the behavior
    expect(result).toEqual(mockData);
    expect(require('graphql-request').request).toHaveBeenCalledTimes(1);
    expect(require('graphql-request').request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, { userId });
  });

  it('should handle errors when the request fails', async () => {
    // Mocking the query file content and a failed GraphQL request
    const mockQuery = 'query getWalletActivity { ... }'; // Simplified GraphQL query
    mockReadFileSync(mockQuery);
    const mockError = new Error('Network error');
    mockFailedResponse(mockError);

    const host = 'http://localhost:4350';
    const userId = '0x02AFA2DCE36a911741467D3cc8688Afcc9a5D3A6';

    // Since the function might throw, we use try-catch to test the error handling
    await expect(fetchWalletActivity(host, userId)).rejects.toThrow('Network error');
    expect(require('graphql-request').request).toHaveBeenCalledTimes(1);
  });
});






