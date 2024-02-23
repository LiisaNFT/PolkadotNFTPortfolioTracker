const { fetchNftAcquisitionPrice } = require('../../src/functions/fetchNftAcquisitionPrice');
const { request } = require('graphql-request');
const fs = require('fs');

jest.mock('graphql-request');
jest.mock('fs');

describe('fetchNftAcquisitionPrice', () => {
  const host = 'http://localhost:4350';
  const nftId = '0x5173-076350-38733';
  const mockFilePath = '../../src/queries/lastNftTransaction.graphql';
  const mockData = { acquisitionPrice: { amount: 100, currency: 'ETH' } };
  const mockQuery = `
    query LastNftTransaction($nftId: String!) {
      nftEvents(
        where: { nfToken: { id_eq: $nftId }, eventType_eq: SALE },
        orderBy: timestamp_DESC,
        limit: 1
      ) {
        eventType
        price
        from { id }
        to { id }
        timestamp
        txnHash
      }
    }
  `;

  beforeEach(() => {
    jest.clearAllMocks();
    fs.readFileSync.mockReturnValue(mockQuery);
    request.mockClear();
  });

  it('should return NFT acquisition price successfully when the request succeeds', async () => {
    request.mockResolvedValue(mockData);

    const result = await fetchNftAcquisitionPrice(host, nftId);

    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, { nftId });
  });

  it('should handle errors when the request fails', async () => {
    const mockError = new Error('Network error');
    request.mockRejectedValue(mockError);

    await expect(fetchNftAcquisitionPrice(host, nftId)).rejects.toThrow('Network error');
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, { nftId });
  });
});
