const { request } = require('graphql-request');

// Load the GraphQL query from the file
const query = `query FetchFloorPriceDifferences(
    $collectionId: String!,
    $include1h: Boolean!,
    $include24h: Boolean!,
    $include7d: Boolean!,
    $include30d: Boolean!,
    $inUSD: Boolean!
  ) {
    collectionStats(
      where: {
        nft_collection_id: $collectionId
      }, 
      first: 1
    ) {
      floor_1h_dif @include(if: $include1h) @skip(if: $inUSD)
      floor_1h_dif_usd @include(if: $include1h) @include(if: $inUSD)
      
      floor_24h_dif @include(if: $include24h) @skip(if: $inUSD)
      floor_24h_dif_usd @include(if: $include24h) @include(if: $inUSD)
      
      floor_7d_dif @include(if: $include7d) @skip(if: $inUSD)
      floor_7d_dif_usd @include(if: $include7d) @include(if: $inUSD)
      
      floor_30d_dif @include(if: $include30d) @skip(if: $inUSD)
      floor_30d_dif_usd @include(if: $include30d) @include(if: $inUSD)
    }
  }`;

//Collection - FP change 
async function fetchFloorPriceChange(host, collectionId, include1h, include24h, include7d, include30d, inUSD) {

    const variables = {
        collectionId: collectionId,
        include1h: include1h,
        include24h: include24h,
        include7d: include7d,
        include30d: include30d,
        inUSD: inUSD
    };

    try {
        const endpoint = `${host}/graphql`;
        
        const response = request(endpoint, query, variables);
        console.log(JSON.stringify(response, null, 4));
        return response;
    } catch (error) {
        console.error("Error querying GraphQL:", error.message);
        if (error.response && error.response.errors) {
            console.error("GraphQL Errors:", JSON.stringify(error.response.errors, null, 2));
        }
    }
}

module.exports = { fetchFloorPriceChange };

//fetchFloorPriceChange('http://localhost:4350', '0x51737fa634e26f5687e45c6ca07604e064076350', true, true, true, true, false)