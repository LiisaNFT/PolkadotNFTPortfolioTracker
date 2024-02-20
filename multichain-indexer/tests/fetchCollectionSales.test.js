const { fetchCollectionSales } = require('../src/functions');
const { request } = require('graphql-request');
const fs = require('fs');

// Mock the 'graphql-request' and 'fs' module to prevent actual HTTP requests and file reads during testing
jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('fetchCollectionSales', () => {
  // Define a helper function to mock successful responses
  const mockSuccessfulResponse = (data) => {
    request.mockImplementationOnce(() => Promise.resolve(data));
  };

  // Define a helper function to mock failed responses
  const mockFailedResponse = (error) => {
    request.mockImplementationOnce(() => Promise.reject(error));
  };

    // Mock the GraphQL query file content
  const mockQuery = 'query getTransactions { ... }'; // Simplified GraphQL query
  fs.readFileSync.mockReturnValue(mockQuery);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return data successfully when the request succeeds', async () => {
    // Mock the successful response
    const mockData = { sales: [] }; // Adjust the mock data to match your expected response structure
    mockSuccessfulResponse(mockData);

    const host = 'http://localhost:4350';
    const userId = '';
    const nftId = '';
    const collectionId = '0x51737fa634e26f5687e45c6ca07604e064076350';
    const startTime = '';
    const endTime = '';
    const chain = 'Moonbeam';

    const result = await fetchCollectionSales(host, userId, nftId, collectionId, startTime, endTime, chain);

    // Assertions
    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, expect.any(Object));
  });

  it('should handle errors when the request fails', async () => {
    // Mock a failed response
    const mockError = new Error('Network error');
    mockFailedResponse(mockError);

    const host = 'http://localhost:4350';
    const userId = '';
    const nftId = '';
    const collectionId = '0x51737fa634e26f5687e45c6ca07604e064076350';
    const startTime = '';
    const endTime = '';
    const chain = 'Moonbeam';

    // Since the function might not explicitly handle errors, wrap the call in a try-catch to test error behavior
    let error;
    try {
      await fetchCollectionSales(host, userId, nftId, collectionId, startTime, endTime, chain);
    } catch (e) {
      error = e;
    }

    // Assertions
    expect(error).toEqual(mockError);
    expect(request).toHaveBeenCalledTimes(1);
  });
});
