const { fetchLastTraitSale } = require('../../src/functions');
const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
jest.mock('fs');

describe('fetchLastTraitSale', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  const mockQuery = 'query getLastTraitSale { ... }'; // Simplified GraphQL query
  const mockFilePath = path.join(__dirname, '../../src/queries/getLastTraitSale.graphql');
  fs.readFileSync.mockReturnValue(mockQuery);

  it('should return last trait sale successfully when the request succeeds', async () => {
    const mockData = { lastTraitSale: { salePrice: 100, saleDate: '2024-01-01T00:00:00Z' } };
    request.mockResolvedValue(mockData);

    const host = 'http://localhost:4350';
    const collectionId = '0x51737fa634e26f5687e45c6ca07604e064076350';
    const attributeType = 'birthday';
    const attributeValue = '1660734790';

    const result = await fetchLastTraitSale(host, collectionId, attributeType, attributeValue);

    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, {
      collectionId,
      attributeType,
      attributeValue,
    });
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath), 'utf8');
  });

  it('should handle errors when the request fails', async () => {
    const mockError = new Error('Network error');
    request.mockRejectedValue(mockError);

    const host = 'http://localhost:4350';
    const collectionId = '0x51737fa634e26f5687e45c6ca07604e064076350';
    const attributeType = 'birthday';
    const attributeValue = '1660734790';

    await expect(fetchLastTraitSale(host, collectionId, attributeType, attributeValue)).rejects.toThrow(mockError);
    expect(request).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath), 'utf8');
  });
});

