const { request } = require('graphql-request');

// Load the GraphQL query from the file
const query = `query FetchNftCollectionStats {
    collectionStats(orderBy: date_DESC) {
      floorPrice
      date
    }
  }
`;

//Stats - Fetch all
async function fetchAllStats(host) {
    
    try {
        const endpoint = `${host}/graphql`

        const response = await request(endpoint, query);
        console.log(JSON.stringify(response, null, 4));
        return response;
    } catch (error) {
        console.error("Error querying GraphQL:", error.message);
        if (error.response && error.response.errors) {
            console.error("GraphQL Errors:", JSON.stringify(error.response.errors, null, 2));
        }
        throw new Error(error.message);
    }
}

module.exports = { fetchAllStats };

//fetchAllStats('http://localhost:4350');