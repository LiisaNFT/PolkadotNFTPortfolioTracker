const { request } = require('graphql-request');

// Load the GraphQL query from the file
const query = `query ActivityQuery($userId: String, $collectionId: String, $nftId: String, $startTimestamp: DateTime, $endTimestamp: DateTime, $chain: String, $eventType: EventType) {
    nftEvents(
      orderBy: timestamp_DESC,
      where: {
        AND: [
          {
            OR: [
              { from: { id_eq: $userId } },
              { to: { id_eq: $userId } },
              { nfToken: { id_eq: $nftId } },
              { nfToken: { collection: { id_eq: $collectionId } } }
            ]
          },
          { timestamp_gte: $startTimestamp },
          { timestamp_lte: $endTimestamp },
          { chain_eq: $chain },
          { eventType_eq: $eventType } 
        ]
      }
    ) {
      id
      blockNumber
      timestamp
      txnHash
      eventType
      from { id }
      to { id }
      nfToken {
        id
        uri
        collection {
          id
          name
        }
      }
      marketplace
      price
      chain
    }
  }`;

//NFT - Activity
async function fetchNftActivity(host, nftId) {

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

module.exports = { fetchNftActivity };

//fetchNftActivity('http://localhost:4350', '0xcB13-ac49cA-1700');