const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

// Load the GraphQL query from the file
const query = `query LowestSalePrice($collectionId: String!, $startTime: DateTime!, $endTime: DateTime!) {
    nftEvents(
      where: { 
        AND: [
          { nfToken: { collection: { id_eq: $collectionId } } },
          { eventType_eq: SALE },
          { timestamp_gte: $startTime },
          { timestamp_lte: $endTime }
        ]
      },
      orderBy: price_ASC,
      limit: 1
    ) {
      price
      nfToken {
        id
        collection {
          id
          name
        }
      }
      timestamp
      txnHash
    }
  }`;

//Stats - Current Floor/Sales floor
async function fetchFloorPrice(host, collectionId, startTime, endTime) {

    const variables = {
        collectionId: collectionId,
        startTime: startTime,
        endTime: endTime
    };

    try {
        const endpoint = `${host}/graphql`;
        
        const response =  request(endpoint, query, variables);
        console.log(JSON.stringify(response, null, 4));
        return response;
    } catch (error) {
        console.error("Error querying GraphQL:", error.message);
        if (error.response && error.response.errors) {
            console.error("GraphQL Errors:", JSON.stringify(error.response.errors, null, 2));
        }
    }
}

module.exports = { fetchFloorPrice };

// Example usage
//fetchFloorPrice('http://localhost:4350', '0x51737fa634e26f5687e45c6ca07604e064076350', '2024-01-01T00:00:00Z', '2024-01-31T23:59:59Z');