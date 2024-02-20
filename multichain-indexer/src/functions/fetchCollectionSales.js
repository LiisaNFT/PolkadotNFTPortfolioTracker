const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

//NFT - 24h collection trades
async function fetchCollectionSales(host, userId, nftId, collectionId, startTime, endTime, chain) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../queries/getTransactions.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');

    // Prepare variables based on filters provided
    const variables = {
        userId: userId, // Optional: only include if you want to filter by user ID
        collectionId: collectionId, // Required: the ID of the collection to filter by
        nftId: nftId, // Optional: only include if you want to filter by specific NFT ID
        startTimestamp: startTime, // Optional: only include if you want to filter by start date/time
        endTimestamp: endTime, // Optional: only include if you want to filter by end date/time
        chain: chain, // Optional: only include if you want to filter by blockchain
        eventType: 'SALE' // Assuming you always want to filter by sales events
    };

    try {
        const endpoint = `${host}/graphql`;
        
        const response = await request(endpoint, query, variables);
        console.log(JSON.stringify(response, null, 4));
        return response;
    } catch (error) {
        console.error("Error querying GraphQL:", error.message);
        if (error.response && error.response.errors) {
            console.error("GraphQL Errors:", JSON.stringify(error.response.errors, null, 2));
        }
    }
}

module.exports = { fetchCollectionSales };


// Example usage
//fetchCollectionSales('http://localhost:4350', '', '', '0x51737fa634e26f5687e45c6ca07604e064076350','','', 'Moonbeam');

