const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

//Stats - Fetch all
async function fetchAllStats(host) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../queries/getNftCollectionStats.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');

    try {
        const endpoint = `${host}/graphql`

        const response = await request(endpoint, query);
        console.log(JSON.stringify(response, null, 4));
    } catch (error) {
        console.error("Error querying GraphQL:", error.message);
        if (error.response && error.response.errors) {
            console.error("GraphQL Errors:", JSON.stringify(error.response.errors, null, 2));
        }
    }
}

module.exports = { fetchAllStats };