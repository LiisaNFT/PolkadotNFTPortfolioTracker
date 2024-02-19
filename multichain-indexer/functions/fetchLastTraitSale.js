const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

//Collection - Last Sale per trait
export async function fetchLastTraitSale(host, collectionId, attributeType) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../src/queries/getLastTraitSale.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        collectionId: collectionId,
        attributeType: attributeType
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