const { fetchFloorPrice } = require('./fetchFloorPrice');
const { fetchFloorPriceChange } = require('./fetchFloorPriceChange');
const { fetchCollectionNfts } = require('./fetchCollectionNfts');
const { fetchCollectionSales } = require('./fetchCollectionSales');
const { fetchLastTraitSale } = require('./fetchLastTraitSale');
// Other imports as necessary

// Function to generate CollectionStats
async function generateCollectionStats(host, collectionId) {
    const dateNow = new Date();
    const startTime = dateNow.toISOString();
    const endTime = new Date(dateNow.getTime() - (24 * 3600 * 1000)).toISOString(); // 24 hours ago

    try {
        // Fetch current floor price and related metrics
        const currentFloorPrice = await fetchFloorPrice(host, collectionId, startTime, endTime);
        const floorPriceChangeMetrics = await fetchFloorPriceChange(host, collectionId, true, true, true, true, true);

        // Fetch collection NFTs and sales data
        const nfts = await fetchCollectionNfts(host, collectionId);
        const salesData = await fetchCollectionSales(host, collectionId, startTime, endTime);

        // Calculate additional metrics as necessary
        const totalVolume = salesData.reduce((acc, sale) => acc + sale.price, 0);
        const highestSale = Math.max(...salesData.map(sale => sale.price));
        const lastSaleDate = salesData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0].timestamp;

        // Compile the CollectionStats object
        const collectionStats = {
            id: collectionId,
            totalVolume,
            floorPrice: currentFloorPrice.floorPrice,
            floorPriceUSD: currentFloorPrice.floorPriceUSD,
            tokenCount: nfts.length,
            marketCap: totalVolume * nfts.length, // Simplified calculation; adjust as needed
            highestSale,
            lastSaleDate,
            supply: nfts.length, // Assuming supply is the count of NFTs
            date: dateNow,
            salesCount24h: salesData.length,
            floorPriceChange: floorPriceChangeMetrics.floorPriceChange,
            ...floorPriceChangeMetrics, // Spread the remaining floor price change metrics
        };

        // Store or process the generated CollectionStats as needed
        console.log('Generated CollectionStats:', collectionStats);
        return collectionStats;
    } catch (error) {
        console.error('Failed to generate CollectionStats:', error);
        throw error; // Rethrow or handle as appropriate
    }
}

module.exports = { generateCollectionStats };

// Example usage: generateCollectionStats('http://localhost:4350', '0xCollectionId123');

