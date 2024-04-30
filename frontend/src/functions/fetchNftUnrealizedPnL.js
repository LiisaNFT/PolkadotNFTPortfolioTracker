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
        console.log('acquisitionPriceResponse, estimatedPriceResponse: ', {acquisitionPriceResponse, estimatedPriceResponse});

        // Check if both functions returned valid data
        if (typeof acquisitionPriceResponse !== 'number' || typeof estimatedPriceResponse !== 'number') {
            throw new Error('Failed to retrieve valid data for acquisition price or estimated value');
        }

        // Calculate Unrealized P&L
        const unrealizedPnL = estimatedPriceResponse - acquisitionPriceResponse;
        
        return unrealizedPnL;
    } catch (error) {
        console.error(`Error calculating unrealized P&L: `, error);
        return 0;
    }
}

module.exports = { fetchNftUnrealizedPnL };

//fetchNftUnrealizedPnL('http://localhost:4350', '0xcB13-ac49cA-1700', '0xcB13945Ca8104f813992e4315F8fFeFE64ac49cA');
