const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

//Collection - Last Sale per trait
async function fetchLastTraitSale(host, collectionId, attributeType, attributeValue) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../queries/getLastTraitSale.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        collectionId: collectionId,
        attributeType: attributeType,
        attributeValue: attributeValue
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
        throw error;
    }
}

module.exports = { fetchLastTraitSale };

//fetchLastTraitSale('http://localhost:4350', '0x51737fa634e26f5687e45c6ca07604e064076350', 'birthday', '1660734790')