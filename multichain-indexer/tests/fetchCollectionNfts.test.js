const { fetchCollectionNfts } = require('../src/functions');
const { request } = require('graphql-request');
const fs = require('fs');
jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
jest.mock('fs');

describe('fetchCollectionNfts', () => {
  const mockQuery = 'query getPortfolio { ... }'; // Simplified GraphQL query
  const mockFilePath = '../queries/getPortfolio.graphql';
  fs.readFileSync.mockReturnValue(mockQuery);

  const mockSuccessfulResponse = (data) => {
    request.mockImplementationOnce(() => Promise.resolve(data));
  };

  const mockFailedResponse = (error) => {
    request.mockImplementationOnce(() => Promise.reject(error));
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return NFTs owned per collection successfully when the request succeeds', async () => {
    const mockData = { nfts: [] }; // Adjust the mock data to match your expected response structure
    mockSuccessfulResponse(mockData);

    const host = 'http://localhost:4350';
    const userId = '0x026fc0D0b90Ea52A992db2a4536e5C378d977c63';

    const result = await fetchCollectionNfts(host, userId);

    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, { userId });
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath), 'utf8');
  });

  it('should handle errors when the request fails', async () => {
    const mockError = new Error('Network error');
    mockFailedResponse(mockError);

    const host = 'http://localhost:4350';
    const userId = '0x026fc0D0b90Ea52A992db2a4536e5C378d977c63';

    let error;
    try {
      await fetchCollectionNfts(host, userId);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(mockError);
    expect(request).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining(mockFilePath), 'utf8');
  });
});

