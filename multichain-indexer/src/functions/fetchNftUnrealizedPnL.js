const { fetchNftAcquisitionPrice } = require('./fetchNftAcquisitionPrice.js');
const { nftEstimatedValue } = require('./nftEstimatedValue.js');

//NFT - Unrealized P&L
async function fetchNftUnrealizedPnL(host, nftId, collectionId) {
    
    //Last Acquisition price
    const acquisitionPrice = fetchNftAcquisitionPrice(host, nftId);

    //Estimated price
    const estimatedPrice = nftEstimatedValue(host, nftId, collectionId);

    //Unrealized P&L
    const unrealizedPnL = estimatedPrice - acquisitionPrice;

    return unrealizedPnL;
}

module.exports = { fetchNftUnrealizedPnL };

fetchNftUnrealizedPnL('http://localhost:4350', '0x5173-076350-38733', '0x51737fa634e26f5687e45c6ca07604e064076350');