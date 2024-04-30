const { request } = require('graphql-request');

// Load the GraphQL query from the file
const query = `query NftMetadata($nftId: String!) {
    nfTokens(where: {id_eq: $nftId}) {
      id
      nativeId
      name
      symbol
      uri
      collection {
        id
        name
      }
      attributes {
        attribute {
          type
          value
          rarity
          id
        }
      }
    }
  }`;

//NFT - Metadata
async function fetchNftMetadata(host, nftId) {

    const variables = {
        nftId: nftId
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

module.exports = { fetchNftMetadata };

//fetchNftMetadata('http://localhost:4350', '0x5173-076350-38733');