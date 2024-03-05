const { fetchLastTraitSale } = require('./fetchLastTraitSale');
const { fetchFloorPrice } = require('./fetchFloorPrice');
const { fetchNftMetadata } = require('./fetchNftMetadata');

//NFT - Estimated Value
async function nftEstimatedValue(host, nftId, collectionId) {
    const endTime = new Date(); // Now
    const startTime = new Date(endTime.getTime() - (24 * 3600 * 1000)); // 24 hours before now

    // Format dates to ISO 8601 string
    const startTimeISO = startTime.toISOString();
    const endTimeISO = endTime.toISOString();
    console.log('startTimeISO: ', startTimeISO);
    console.log('endTimeISO: ', endTimeISO);

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

        if (!lastTraitSale || !lastTraitSale.nftEvents || lastTraitSale.nftEvents.length === 0) {
            throw new Error('No last trait sale found');
        }
        
        const lastTraitSaleTimestamp = lastTraitSale.nftEvents[0].timestamp;
        console.log('lastTraitSaleTimestamp: ', lastTraitSaleTimestamp);
        const lastTraitSalePrice = lastTraitSale.nftEvents[0].price;
        console.log('lastTraitSalePrice: ', lastTraitSalePrice);

        // Convert string to Date object
        const lastTraitSaleDate = new Date(lastTraitSaleTimestamp);

        // Now you can use .getTime() on lastTraitSaleDate
        const lastSaleStartTime = new Date(lastTraitSaleDate.getTime() - (24 * 3600 * 1000));

        // Convert to ISO string for your GraphQL query
        const lastSaleStartTimeISO = lastSaleStartTime.toISOString();
        const lastTraitSaleTimestampISO = lastTraitSaleDate.toISOString();

        // Continue with your existing logic...
        const currentFloor = await fetchFloorPrice(host, collectionId, startTimeISO, endTimeISO); 
        console.log('currentFloor: ', currentFloor);

        const lastFloor = await fetchFloorPrice(host, collectionId, lastSaleStartTimeISO, lastTraitSaleTimestampISO);
        console.log('lastFloor: ', lastFloor); 
        

        // Ensure floor prices are fetched successfully
        if (!currentFloor || !lastFloor) {
            throw new Error('Failed to fetch floor prices');
        }

        const estimatedValue = (lastTraitSalePrice / lastFloor.nftEvents[0].price) * currentFloor.nftEvents[0].price;
        console.log('Estimated Value: ', estimatedValue);
        return estimatedValue;
    } catch (error) {
        console.error('Error calculating NFT estimated value:', error);
    }
}

module.exports = { nftEstimatedValue };

nftEstimatedValue('http://localhost:4350', '0xcB13-ac49cA-1700', '0xcB13945Ca8104f813992e4315F8fFeFE64ac49cA');