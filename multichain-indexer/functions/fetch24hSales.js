const { request, gql } = require('graphql-request');
const fs = require('fs');
const path = require('path');

//NFT - 24h collection trades
export function fetch24hSales(host, filters) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../src/queries/getTransactions.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');

    // Prepare variables based on filters provided
    const variables = {
        userId: filters.userId, // Optional: only include if you want to filter by user ID
        collectionId: filters.collectionId, // Required: the ID of the collection to filter by
        nftId: filters.nftId, // Optional: only include if you want to filter by specific NFT ID
        startTimestamp: filters.startTimestamp, // Optional: only include if you want to filter by start date/time
        endTimestamp: filters.endTimestamp, // Optional: only include if you want to filter by end date/time
        chain: filters.chain, // Optional: only include if you want to filter by blockchain
        eventType: 'SALE' 
    };

    try {
        const endpoint = `${host}/graphql`;
        
        const response = request(endpoint, query, variables);
        console.log(JSON.stringify(response, null, 4));
    } catch (error) {
        console.error("Error querying GraphQL:", error.message);
        if (error.response && error.response.errors) {
            console.error("GraphQL Errors:", JSON.stringify(error.response.errors, null, 2));
        }
    }
}

// Example usage
fetch24hSales('http://localhost:4350', {
    collectionId: '0x51737fa634e26f5687e45c6ca07604e064076350',
    chain: 'Moonbeam', 
});

