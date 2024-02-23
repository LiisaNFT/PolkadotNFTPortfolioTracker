const { fetchCollectionSales } = require('../../src/functions');
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
  const mockQuery = `query ActivityQuery(...) {...}`; // Your actual query string
  const host = 'http://localhost:4350'; // Example host, adjust as necessary
  const userId = 'testUserId'; // Example userId, adjust as necessary
  const nftId = 'testNftId'; // Example nftId, adjust as necessary
  const collectionId = '0x51737fa634e26f5687e45c6ca07604e064076350'; // Example collectionId
  const startTime = '2022-01-01T00:00:00Z'; // Example startTime
  const endTime = '2024-01-02T00:00:00Z'; // Example endTime
  const chain = 'Moonbeam'; // Example chain, adjust as necessary
  
  fs.readFileSync.mockReturnValue(mockQuery);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return data successfully when the request succeeds', async () => {
      const mockData = {
        nftEvents: []
      };
      request.mockResolvedValue(mockData);

      const result = await fetchCollectionSales(host, userId, nftId, collectionId, startTime, endTime, chain);

      expect(result).toEqual(mockData);
      expect(request).toHaveBeenCalledTimes(1);
      expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, {
        userId: "testUserId",
        collectionId: "0x51737fa634e26f5687e45c6ca07604e064076350",
        nftId: "testNftId",
        startTimestamp: "2022-01-01T00:00:00Z",
        endTimestamp: "2024-01-02T00:00:00Z",
        chain: "Moonbeam",
        eventType: "SALE", 
      });
  });

  it('should handle errors when the request fails', async () => {
    const mockError = new Error('Network error');
    request.mockRejectedValue(mockError);
  
    // Using variables defined at the describe level within this test case
    await expect(fetchCollectionSales(host, userId, nftId, collectionId, startTime, endTime, chain)).rejects.toThrow('Network error');
    expect(request).toHaveBeenCalledTimes(1);
  });
  
});

