const { nftEstimatedValue } = require('../src/functions/nftEstimatedValue');
const { fetchNftMetadata } = require('../src/functions/fetchNftMetadata');
const { fetchLastTraitSale } = require('../src/functions/fetchLastTraitSale');
const { fetchFloorPrice } = require('../src/functions/fetchFloorPrice');


describe('nftEstimatedValue', () => {
    beforeEach(() => {
        // Setup mock implementation before each test
        fetchNftMetadata.mockImplementation(() => Promise.resolve({
            nfTokens: [{
                attributes: [{
                    attribute: { type: 'Color', value: 'Blue' }
                }]
            }]
        }));

        fetchLastTraitSale.mockImplementation(() => Promise.resolve({
            nftEvents: [{
                timestamp: new Date().toISOString(),
                price: 1000
            }]
        }));

        fetchFloorPrice.mockImplementation((host, collectionId, startTime, endTime) => {
            if (startTime.includes('lastSale')) {
                return Promise.resolve({ price: 800 }); // Simulating last floor price
            }
            return Promise.resolve({ price: 1200 }); // Simulating current floor price
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should calculate the estimated value of an NFT correctly', async () => {
        const host = 'http://localhost:4350';
        const nftId = '0x5173-076350-38733';
        const collectionId = '0x51737fa634e26f5687e45c6ca07604e064076350';

        const estimatedValue = await nftEstimatedValue(host, nftId, collectionId);

        expect(fetchNftMetadata).toHaveBeenCalledWith(host, nftId);
        expect(fetchLastTraitSale).toHaveBeenCalledWith(host, collectionId, 'Color', 'Blue');
        expect(fetchFloorPrice).toHaveBeenCalledTimes(2); // Called for current and last floor prices
        expect(estimatedValue).toBeDefined();
        expect(estimatedValue).toBeGreaterThan(0);

        // Example assertion for the calculated estimated value based on mocked responses
        const lastTraitSalePrice = 1000;
        const lastFloorPrice = 800;
        const currentFloorPrice = 1200;
        const expectedEstimatedValue = (lastTraitSalePrice / lastFloorPrice) * currentFloorPrice;
        expect(estimatedValue).toEqual(expectedEstimatedValue);
    });

    // Add more tests as necessary, e.g., for handling errors or edge cases
});









