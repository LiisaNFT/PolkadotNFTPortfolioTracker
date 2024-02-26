const { fetchAllStats } = require('../../src/functions');
const { request } = require('graphql-request');
const fs = require('fs');

jest.mock('graphql-request');
jest.mock('fs');


describe('fetchAllStats', () => {
  const mockData = { stats: [] }; // Adjust as per actual expected data
  const mockQuery = 'query GetStats { ... }'; // Adjust with your actual query
  const mockError = new Error('Network error');

  beforeEach(() => {
    fs.readFileSync.mockReturnValue(mockQuery);
    request.mockClear();
  });

  it('should return data successfully when the request succeeds', async () => {
    request.mockResolvedValue(mockData);

    const host = 'http://localhost:4350';
    const result = await fetchAllStats(host); // Adjust function call as necessary

    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(`${host}/graphql`, mockQuery, expect.any(Object)); // Adjust if your function uses variables
  });

  it('should handle errors when the request fails', async () => {
    request.mockRejectedValue(new Error('Network error'));


    const host = 'http://localhost:4350';
    await expect(fetchAllStats(host)).rejects.toThrow('Network error'); // Adjust function call as necessary

    expect(request).toHaveBeenCalledTimes(1);
  });
});


