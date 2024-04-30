const { request } = require('graphql-request');
const fs = require('fs');
const path = require('path');

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

//NFT - 24h collection trades
async function fetchCollectionSales(host, userId, nftId, collectionId, startTime, endTime, chain) {

    // Prepare variables based on filters provided
    const variables = {
        userId: userId, // Optional: only include if you want to filter by user ID
        collectionId: collectionId, // Required: the ID of the collection to filter by
        nftId: nftId, // Optional: only include if you want to filter by specific NFT ID
        startTimestamp: startTime, // Optional: only include if you want to filter by start date/time
        endTimestamp: endTime, // Optional: only include if you want to filter by end date/time
        chain: chain, // Optional: only include if you want to filter by blockchain
        eventType: 'SALE' // Assuming you always want to filter by sales events
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

module.exports = { fetchCollectionSales };


// Example usage
//fetchCollectionSales('http://localhost:4350', '', '', '0x51737fa634e26f5687e45c6ca07604e064076350','2023-01-01T00:00:00Z','2024-01-01T00:00:00Z', 'Moonbeam');

