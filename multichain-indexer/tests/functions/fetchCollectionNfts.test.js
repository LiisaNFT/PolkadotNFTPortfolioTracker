const { fetchCollectionNfts } = require('../../src/functions');
const { request } = require('graphql-request');
const fs = require('fs');
jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
jest.mock('fs');

describe('fetchCollectionNfts', () => {
  const realQuery = fs.readFileSync('../queries/PortfolioDetails.graphql', 'utf8');

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
    const mockData = { /* Adjust based on the expected structure from the real query */ };
    mockSuccessfulResponse(mockData);

    const host = 'http://localhost:4350';
    const userId = '0x026fc0D0b90Ea52A992db2a4536e5C378d977c63';

    const result = await fetchCollectionNfts(host, userId);

    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    // Ensure the actual query and variables are correctly passed
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, realQuery, { userId });
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

