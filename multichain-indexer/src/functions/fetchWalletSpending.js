const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

//Wallet - Invested value/ Total Revenue
async function fetchWalletSpending(host, userId, chain) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../queries/getRevenueSpending.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        userId: userId,
        chain: chain
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

module.exports = { fetchWalletSpending };

fetchWalletSpending('http://localhost:4350', '0x02AFA2DCE36a911741467D3cc8688Afcc9a5D3A6', 'Moonbeam');