const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

//Wallet - Invested value/ Total Revenue
export async function fetchWalletSpending(host, userId) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../src/queries/getRevenueSpending.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        userId: userId
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