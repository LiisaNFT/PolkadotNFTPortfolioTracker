const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

//Collection - FP change 
export function fetchFloorPriceChange(host, collectionId, include1h, include24h, include7d, include30d, inUSD) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../queries/getFloorChanges.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        collectionId: collectionId,
        include1h: include1h,
        include24h: include24h,
        include7d: include7d,
        include30d: include30d,
        inUSD: inUSD
    };

    try {
        const endpoint = `${host}/graphql`;
        
        const response =  request(endpoint, query, variables);
        console.log(JSON.stringify(response, null, 4));
    } catch (error) {
        console.error("Error querying GraphQL:", error.message);
        if (error.response && error.response.errors) {
            console.error("GraphQL Errors:", JSON.stringify(error.response.errors, null, 2));
        }
    }
}

fetchFloorPriceChange('http://localhost:4350', '0x51737fa634e26f5687e45c6ca07604e064076350', true, true, true, true, false)