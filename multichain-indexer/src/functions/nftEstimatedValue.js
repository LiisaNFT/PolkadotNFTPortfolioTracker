const { fetchLastTraitSale } = require('./fetchLastTraitSale');
const { fetchFloorPrice } = require('./fetchFloorPrice');
const { fetchNftMetadata } = require('./fetchNftMetadata');

//NFT - Estimated Value
async function nftEstimatedValue(host, nftId, collectionId) {
    const endTime = Date.now();
    const startTime = endTime - (24 * 3600 * 1000);

    try {
        // Get nft Metadata
        const metadata = await fetchNftMetadata(host, nftId);
        console.log('metadata: ', metadata);

        if (!metadata || !metadata.nfTokens || metadata.nfTokens.length === 0) {
            throw new Error('No NFT metadata found');
        }

        // Get rarest attribute
        const attribute = metadata.nfTokens[0].attributes[0].attribute;

        // Get last sale for rarest attribute
        const lastTraitSale = await fetchLastTraitSale(host, collectionId, attribute.type, attribute.value); 
        console.log('last trait sale: ', lastTraitSale);

        if (!lastTraitSale || !lastTraitSale.saleEvents || lastTraitSale.saleEvents.length === 0) {
            throw new Error('No last trait sale found');
        }
        const lastTraitSaleTimestamp = new Date(lastTraitSale.saleEvents[0].timestamp).getTime();
        const lastTraitSalePrice = lastTraitSale.saleEvents[0].price;

        // Get Floor price now and at the time of last sale
        const currentFloor = await fetchFloorPrice(host, collectionId, startTime, endTime); // Make sure to await
        const lastFloor = await fetchFloorPrice(host, collectionId, (lastTraitSaleTimestamp - (24 * 3600 * 1000)), lastTraitSaleTimestamp); // Make sure to await

        // Ensure floor prices are fetched successfully
        if (!currentFloor || !lastFloor) {
            throw new Error('Failed to fetch floor prices');
        }

        const estimatedValue = (lastTraitSalePrice / lastFloor.price) * currentFloor.price;
        console.log('Estimated Value: ', estimatedValue);
        return estimatedValue;
    } catch (error) {
        console.error('Error calculating NFT estimated value:', error);
    }
}

// Example usage with async wrapper if necessary
(async () => {
    await nftEstimatedValue('http://localhost:4350', '0x5173-076350-2168', '0x51737fa634e26f5687e45c6ca07604e064076350');
})();


module.exports = { nftEstimatedValue };

//nftEstimatedValue('http://localhost:4350', '0x5173-076350-38733', '0x51737fa634e26f5687e45c6ca07604e064076350');