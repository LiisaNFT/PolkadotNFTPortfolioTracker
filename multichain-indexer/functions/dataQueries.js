import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const host = 'http://localhost:4350/graphql';

//NFT - Activity
export function fetchNftActivity(host, nftId) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../multichain-indexer/queries/getTransactions.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        nftId: nftId
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

//Collection - Sales
export function fetchCollectionSales(host, collectionId, startTime, endTime) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../multichain-indexer/queries/getTransactions.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        collectionId: collectionId,
        startTimestamp: startTime,
        endTimestamp: endTime,
        eventType: 'SALE'
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

//NFT - Acquisition price
export function fetchNftAcquisitionPrice(host, nftId) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../multichain-indexer/queries/LastNftTransaction.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        nftId: nftId
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

//NFT - Metadata
export function fetchNftMetadata(host, nftId, chain) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../multichain-indexer/queries/getNftMetadata.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        nftId: nftId,
        chain: chain
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

//Wallet - Activity
export function fetchWalletActivity(host, userId) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../multichain-indexer/queries/getTransactions.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        userId: userId
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

//NFT - 24h collection trades
export function fetch24hSales(host, collectionId) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../multichain-indexer/queries/getTransactions.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        collectionId: collectionId,
        eventType: 'SALE'
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

//Wallet - NFTs owned per collection
export function fetchCollectionNfts(host, userId) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../multichain-indexer/queries/getPortfolio.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        userId: userId,
        responseType: 'BOTH'
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

//Wallet - Invested value/ Total Revenue
export function fetchWalletSpending(host, userId) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../multichain-indexer/queries/getRevenueSpending.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        userId: userId
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

//Collection - Last Sale per trait
export function fetchLastTraitSale(host, collectionId, attributeType) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../multichain-indexer/queries/getLastTraitSale.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        collectionId: collectionId,
        attributeType: attributeType
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

//Stats - Current Floor/Sales floor
export function fetchFloorPrice(host, collectionId, startTime, endTime) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../multichain-indexer/queries/getSalesFloor.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        collectionId: collectionId,
        startTime: startTime,
        endTime: endTime
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

//Collection - Volume
export function fetchCollectionVolume(host, collectionId, startTime, endTime) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../multichain-indexer/queries/getTransactions.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        collectionId: collectionId,
        startTimestamp: startTime,
        endTimestamp: endTime,
        eventType: 'SALE'
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

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

//NFT - Unrealized P&L
export function fetchNftUnrealizedPnL(host, nftId, collectionId) {
    
    //Last Acquisition price
    const acquisitionPrice = fetchNftAcquisitionPrice(host, nftId);

    //Estimated price
    const estimatedPrice = nftEstimatedValue(host, nftId, collectionId);

    //Unrealized P&L
    const unrealizedPnL = estimatedPrice - acquisitionPrice;

    return unrealizedPnL;
}

//Collection - FP change 
export function fetchFloorPriceChange(host, collectionId, include1h, include24h, include7d, include30d, inUSD) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../multichain-indexer/queries/getFloorChanges.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        collectionId: collectionId,
        include1h: include1h,
        include24h: include24h,
        include7d: include7d,
        include30d: include30d,
        inUSD: inUSD
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

//Stats - Fetxh all
export function fetchAllStats(host) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../multichain-indexer/queries/getNftCollectionStats.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');


    // Make the request to receive data from 
    axios.post(host, { query: query})
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

//Stats - Liquidity
export function getLiquidity(host) {
    
    // Get all collections
    const stats = fetchAllStats(host);

    // Get max and min sales count
    const maxSalesCount = Math.max(...stats.map(s => s.sales_count_24h));
    const minSalesCount = Math.min(...stats.map(s => s.sales_count_24h));

    let totalEstimatedValue = stats.reduce((sum, collection) => sum + collection.estimated_value, 0);
    let weightedSum = 0;

    for (const collection of stats) {
        const salesCount = collection.sales_count_24h;
        const score = 100 * ((salesCount - minSalesCount) / (maxSalesCount - minSalesCount));
        const weight = collection.estimated_value / totalEstimatedValue;
        weightedSum += score * weight;
    }

    return weightedSum; // This is the weighted average score
}

