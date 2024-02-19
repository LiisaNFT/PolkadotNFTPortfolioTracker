const { request, gql } = require('graphql-request');
const BigInteger = require('big-integer');

// GraphQL endpoint
const endpoint = 'http://localhost:4350/graphql';

// Function to fetch collection data
async function fetchCollectionData() {
    const query = gql`
        {
            collections {
                id
                nfts {
                    id
                }
                stats {
                    totalVolume
                    floorPrice
                    tokenCount
                    marketCap
                    highestSale
                    lastSaleDate
                    supply
                }
            }
        }
    `;
    return request(endpoint, query);
}

// Function to compute metrics (example: computing market cap as totalVolume * floorPrice)
async function computeMetrics(collections) {
    return collections.map(collection => {
        const { totalVolume, floorPrice } = collection.stats;
        const marketCap = BigInteger(totalVolume).multiply(floorPrice);
        // Update other metrics as necessary
        return {
            ...collection,
            stats: {
                ...collection.stats,
                marketCap: marketCap.toString(),
                // other updated metrics
            },
        };
    });
}

module.exports = { fetchCollectionData, computeMetrics };
