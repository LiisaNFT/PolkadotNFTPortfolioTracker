const { fetchAllStats } = require('../src/functions');


describe('fetchData', () => {
    it('should return data successfully', async () => {
      const data = await fetchAllStats('http://localhost:4350');
      expect(data).not.toBe(null);
      // Add more assertions as necessary
    });
  });