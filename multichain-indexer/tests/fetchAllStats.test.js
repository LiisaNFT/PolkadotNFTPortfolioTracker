const { fetchAllStats } = require('../src/functions');
const { request } = require('graphql-request');

// Mock the 'graphql-request' module to prevent actual HTTP requests during testing
jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));

describe('fetchAllStats', () => {
  // Define a helper function to mock successful responses
  const mockSuccessfulResponse = (data) => {
    request.mockImplementationOnce(() => Promise.resolve(data));
  };

  // Define a helper function to mock failed responses
  const mockFailedResponse = (error) => {
    request.mockImplementationOnce(() => Promise.reject(error));
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return data successfully when the request succeeds', async () => {
    // Mock the successful response
    const mockData = { stats: [] }; // Adjust the mock data to match your expected response structure
    mockSuccessfulResponse(mockData);

    const result = await fetchAllStats('http://localhost:4350');

    // Assertions
    expect(result).toEqual(mockData);
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('should handle errors when the request fails', async () => {
    // Mock a failed response
    const mockError = new Error('Network error');
    mockFailedResponse(mockError);

    // Since the function might not explicitly handle errors, wrap the call in a try-catch to test error behavior
    let error;
    try {
      await fetchAllStats('http://localhost:4350');
    } catch (e) {
      error = e;
    }

    // Assertions
    expect(error).toEqual(mockError);
    expect(request).toHaveBeenCalledTimes(1);
  });
});
