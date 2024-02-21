const { fetchNftAcquisitionPrice } = require('./fetchNftAcquisitionPrice.js');
const { nftEstimatedValue } = require('./nftEstimatedValue.js');

//NFT - Unrealized P&L
async function fetchNftUnrealizedPnL(host, nftId, collectionId) {
    try {
        // Await for both promises to resolve
        const [acquisitionPriceResponse, estimatedPriceResponse] = await Promise.all([
            fetchNftAcquisitionPrice(host, nftId),
            nftEstimatedValue(host, nftId, collectionId)
        ]);

        // Check if both functions returned valid data
        if (typeof acquisitionPriceResponse !== 'number' || typeof estimatedPriceResponse !== 'number') {
            throw new Error('Failed to retrieve valid data for acquisition price or estimated value');
        }

        // Calculate Unrealized P&L
        const unrealizedPnL = estimatedPriceResponse - acquisitionPriceResponse;
        
        return unrealizedPnL;
    } catch (error) {
        console.error(`Error calculating unrealized P&L: ${error.message}`);
        // Depending on your error handling strategy, you could return a default value, null, or rethrow the error
        // For example, return null to indicate that the calculation could not be completed
        return 0;
    }
}

module.exports = { fetchNftUnrealizedPnL };

// Example usage (uncomment to test)
// fetchNftUnrealizedPnL('http://localhost:4350', '0x5173-076350-38733', '0x51737fa634e26f5687e45c6ca07604e064076350').then(console.log).catch(console.error);
