const { fetchFloorPrice } = require('../src/functions');
const { request } = require('graphql-request');
const fs = require('fs');
jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
jest.mock('fs');

describe('fetchFloorPrice', () => {
  const mockQuery = 'query getSalesFloor { ... }'; // Simplified GraphQL query
  const mockFilePath = '../queries/getSalesFloor.graphql';
  fs.readFileSync.mockReturnValue(mockQuery);

  const mockSuccessfulResponse = (data) => {
    request.mockResolvedValueOnce(data); // Use mockResolvedValueOnce for async promise resolution
  };

  const mockFailedResponse = (error) => {
    request.mockRejectedValueOnce(error); // Use mockRejectedValueOnce for async promise rejection
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return current floor/sales floor successfully when the request succeeds', async () => {
    const mockData = { floorPrice: 123 }; // Adjust the mock data to match your expected response structure
    mockSuccessfulResponse(mockData);

    const host = 'http://localhost:4350';
    const collectionId = '0x51737fa634e26f5687e45c6ca07604e064076350';
    const startTime = '2024-01-01T00:00:00Z';
    const endTime = '2024-01-31T23:59:59Z';

    const result = await fetchFloorPrice(host, collectionId, startTime, endTime);

    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, {
      collectionId,
      startTime,
      endTime,
    });
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath), 'utf8');
  });

  it('should handle errors when the request fails', async () => {
    const mockError = new Error('Network error');
    mockFailedResponse(mockError);

    const host = 'http://localhost:4350';
    const collectionId = '0x51737fa634e26f5687e45c6ca07604e064076350';
    const startTime = '2024-01-01T00:00:00Z';
    const endTime = '2024-01-31T23:59:59Z';

    await expect(fetchFloorPrice(host, collectionId, startTime, endTime)).rejects.toThrow(mockError);
    expect(request).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath), 'utf8');
  });
});
