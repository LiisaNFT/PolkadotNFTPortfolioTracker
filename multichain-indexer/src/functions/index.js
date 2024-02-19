const { fetchAllStats } = require('./fetchAllStats.js');
const { fetchCollectionNfts } = require('./fetchCollectionNfts.js');
const { fetchCollectionSales } = require('./fetchCollectionSales.js');
const { fetchFloorPrice } = require('./fetchFloorPrice.js');
const { fetchFloorPriceChange } = require('./fetchFloorPriceChange.js');
const { fetchLastTraitSale } = require('./fetchLastTraitSale.js');
const { fetchNftAcquisitionPrice } = require('./fetchNftAcquisitionPrice.js');
const { fetchNftActivity } = require('./fetchNftActivity.js');
const { fetchNftMetadata } = require('./fetchNftMetadata.js');
const { fetchNftUnrealizedPnL } = require('./fetchNftUnrealizedPnL.js');
const { fetchWalletActivity } = require('./fetchWalletActivity.js');
const { fetchWalletSpending } = require('./fetchWalletSpending.js');
const { getLiquidity } = require('./getLiquidity.js');
const { nftEstimatedValue } = require('./nftEstimatedValue.js');

module.exports = {  
    fetchAllStats, 
    fetchCollectionNfts, 
    fetchCollectionSales, 
    fetchFloorPrice, 
    fetchFloorPriceChange, 
    fetchLastTraitSale, 
    fetchNftAcquisitionPrice, 
    fetchNftActivity, 
    fetchNftMetadata, 
    fetchNftUnrealizedPnL, 
    fetchWalletActivity, 
    fetchWalletSpending, 
    getLiquidity, 
    nftEstimatedValue 
};  