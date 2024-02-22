const { fetchFloorPriceChange } = require('../../src/functions');
const { request } = require('graphql-request');
const fs = require('fs');
jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
jest.mock('fs');

describe('fetchFloorPriceChange', () => {
  const mockQuery = 'query getFloorChanges { ... }'; // Simplified GraphQL query
  const mockFilePath = '../queries/getFloorChanges.graphql';
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

  it('should return floor price changes successfully when the request succeeds', async () => {
    const mockData = { floorPriceChanges: { include1h: 1, include24h: 2, include7d: 3, include30d: 4, inUSD: false } };
    mockSuccessfulResponse(mockData);

    const host = 'http://localhost:4350';
    const collectionId = '0x51737fa634e26f5687e45c6ca07604e064076350';
    const include1h = true;
    const include24h = true;
    const include7d = true;
    const include30d = true;
    const inUSD = false;

    const result = await fetchFloorPriceChange(host, collectionId, include1h, include24h, include7d, include30d, inUSD);

    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, {
      collectionId,
      include1h,
      include24h,
      include7d,
      include30d,
      inUSD,
    });
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath), 'utf8');
  });

  it('should handle errors when the request fails', async () => {
    const mockError = new Error('Network error');
    mockFailedResponse(mockError);

    const host = 'http://localhost:4350';
    const collectionId = '0x51737fa634e26f5687e45c6ca07604e064076350';
    const include1h = true;
    const include24h = true;
    const include7d = true;
    const include30d = true;
    const inUSD = false;

    await expect(fetchFloorPriceChange(host, collectionId, include1h, include24h, include7d, include30d, inUSD)).rejects.toThrow(mockError);
    expect(request).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath), 'utf8');
  });
});
