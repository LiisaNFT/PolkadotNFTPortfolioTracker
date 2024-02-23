const { fetchFloorPrice } = require('../../src/functions');
const { request } = require('graphql-request');
const fs = require('fs');
jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
jest.mock('fs');

describe('fetchFloorPrice', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Ensure mocks are reset before each test
  });

  it('should return current floor/sales floor successfully when the request succeeds', async () => {
    // Setup your mock response
    const mockData = {/* mock response data */};
    request.mockResolvedValueOnce(mockData);

    const host = 'http://localhost:4350';
    const collectionId = 'collection123';
    const startTime = '2021-01-01';
    const endTime = '2021-01-02';

    const result = await fetchFloorPrice(host, collectionId, startTime, endTime);

    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    // Use the actual query or ensure the mock setup is correct
  });

  it('should handle errors when the request fails', async () => {
    const mockError = new Error('Network error');
    request.mockRejectedValueOnce(mockError);

    const host = 'http://localhost:4350';
    const collectionId = 'collection123';
    const startTime = '2021-01-01';
    const endTime = '2021-01-02';

    await expect(fetchFloorPrice(host, collectionId, startTime, endTime)).rejects.toThrow('Network error');
    expect(request).toHaveBeenCalledTimes(1);
  });
});

