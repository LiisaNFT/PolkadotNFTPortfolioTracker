const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

//NFT - Activity
async function fetchNftActivity(host, nftId) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../queries/getTransactions.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        nftId: nftId
    };

    try {
        const endpoint = `${host}/graphql`;
        
        const response = await request(endpoint, query, variables);
        console.log(JSON.stringify(response, null, 4));
    } catch (error) {
        console.error("Error querying GraphQL:", error.message);
        if (error.response && error.response.errors) {
            console.error("GraphQL Errors:", JSON.stringify(error.response.errors, null, 2));
        }
    }
}

module.exports = { fetchNftActivity };

fetchNftActivity('http://localhost:4350', '0x5173-076350-38733');