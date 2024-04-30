const { request } = require('graphql-request');

// Load the GraphQL query from the file
const query = `query WalletSalesStats($userId: String!, $breakdownByCollection: Boolean = true, $chain: String!) {
    # Fetch sales where the wallet was the buyer
    bought: nftEvents(
      where: { 
        to: { id_eq: $userId },
        eventType_eq: SALE,
        chain_eq: $chain
      }
    ) {
      price
      collection: nfToken {
        collection @include(if: $breakdownByCollection) {
          id
          name
        }
      }
    }
    
    # Fetch sales where the wallet was the seller
    sold: nftEvents(
      where: { 
        from: { id_eq: $userId },
        eventType_eq: SALE,
        chain_eq: $chain
      }
    ) {
      price
      collection: nfToken {
        collection @include(if: $breakdownByCollection) {
          id
          name
        }
      }
    }
  }`;

//Wallet - Invested value/ Total Revenue
async function fetchWalletSpending(host, userId, chain) {

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
        throw error;
    }
}

module.exports = { fetchWalletSpending };

//fetchWalletSpending('http://localhost:4350', '0x85b03CA16a7B59B392e54bbe4dEF189F6bF6F16b', 'Moonbeam');