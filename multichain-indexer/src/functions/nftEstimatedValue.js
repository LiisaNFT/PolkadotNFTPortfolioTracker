const { fetchLastTraitSale } = require('./fetchLastTraitSale');
const { fetchFloorPrice } = require('./fetchFloorPrice');
const { fetchNftMetadata } = require('./fetchNftMetadata');

//NFT - Estimated Value
export function nftEstimatedValue(host, nftId, collectionId) {
    
    const endTime = Date.now();
    const startTime = endTime - (24 * 3600 * 1000);

    //Get nft Metadata
    const metadata = fetchNftMetadata(host, nftId);

    //Get rarest attribute
    const attribute = metadata.attributes[0].id;

    //Get last sale for rarest attribute
    const lastTraitSale = fetchLastTraitSale(host, collectionId, attribute);
    const lastTraitSaleTimestamp = lastTraitSale.saleEvents[0].timestamp;
    const lastTraitSalePrice = lastTraitSale.saleEvents[0].price;


    //Get Floor price
    const currentFloor = fetchFloorPrice(host, collectionId, startTime, endTime);

    //Get Floor price
    const lastFloor = fetchFloorPrice(host, collectionId, (lastTraitSaleTimestamp - (24 * 3600 * 1000)), lastTraitSaleTimestamp);

    const estimatedValue = (lastTraitSalePrice / lastFloor.price) * currentFloor.price;

    return estimatedValue;
}