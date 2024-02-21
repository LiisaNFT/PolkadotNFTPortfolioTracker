const { getLiquidity } = require('../src/functions/getLiquidity');

// Mocking the fetchAllStats function dependency
jest.mock('../src/functions/fetchAllStats', () => ({
  fetchAllStats: jest.fn(),
}));

describe('getLiquidity', () => {
  // Helper function for mocking fetchAllStats responses
  const mockFetchAllStatsResponse = (data) => {
    const { fetchAllStats } = require('../src/functions/fetchAllStats');
    fetchAllStats.mockImplementation(() => Promise.resolve(data));
  };

  afterEach(() => {
    // Clear all mocks after each test to ensure a clean state
    jest.clearAllMocks();
  });

  it('should calculate liquidity correctly based on stats data', async () => {
    // Mocking stats data
    const mockStatsData = [
      { sales_count_24h: 10, estimated_value: 1000 },
      { sales_count_24h: 20, estimated_value: 2000 },
      { sales_count_24h: 5, estimated_value: 500 },
    ];
    mockFetchAllStatsResponse(mockStatsData);

    const host = 'http://localhost:4350';
    // Calling the function with mocked data
    const liquidity = await getLiquidity(host);

    // Expected calculations based on mock data
    const expectedMaxSalesCount = 20;
    const expectedMinSalesCount = 5;
    const expectedTotalEstimatedValue = 3500; // 1000 + 2000 + 500
    const expectedWeightedSum = ((100 * ((10 - 5) / (20 - 5)) * (1000 / 3500)) +
                                 (100 * ((20 - 5) / (20 - 5)) * (2000 / 3500)) +
                                 (100 * ((5 - 5) / (20 - 5)) * (500 / 3500)));

    // Verifying the function's behavior
    expect(liquidity).toEqual(expectedWeightedSum);
    expect(require('../src/functions/fetchAllStats').fetchAllStats).toHaveBeenCalledTimes(1);
    expect(require('../src/functions/fetchAllStats').fetchAllStats).toHaveBeenCalledWith(host);
  });

  it('should handle empty stats data gracefully', async () => {
    // Mocking empty stats data
    mockFetchAllStatsResponse([]);

    const host = 'http://localhost:4350';
    // Calling the function with mocked data
    const liquidity = await getLiquidity(host);

    // Verifying the function's behavior for empty data
    expect(liquidity).toEqual(0); // Expected liquidity is 0 when there are no stats
    expect(require('../src/functions/fetchAllStats').fetchAllStats).toHaveBeenCalledTimes(1);
  });
});








