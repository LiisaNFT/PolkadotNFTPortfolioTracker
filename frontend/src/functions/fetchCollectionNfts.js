const { request } = require('graphql-request');

// Load the GraphQL query from the file
const query = `query PortfolioDetails($userId: String!) {
    accounts(where: {id_eq: $userId}) {
      id
      ownedTokens {
        id
        collection {
          id
          name
          stats {
            floorPrice
            totalVolume
            tokenCount
            marketCap
            highestSale
            lastSaleDate
            supply
            date
            salesCount24h
            floorPriceChange
          }
        }
        attributes {
          attribute {
            id
            value
          }
        }
      }
    }
    
    # Adjusted to remove direct chain filtering if not supported
    collections {
      id
      name
      stats {
        floorPrice
        totalVolume
        tokenCount
        marketCap
        highestSale
        lastSaleDate
        supply
        date
        salesCount24h
        floorPriceChange
      }
      nfts {
        id
        name
        image
      }
    }
  }`;

//Wallet - NFTs owned per collection
async function fetchCollectionNfts(host, userId) {

    const variables = {
        userId: userId
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

module.exports = { fetchCollectionNfts };

//fetchCollectionNfts('http://localhost:4350', '0x026fc0D0b90Ea52A992db2a4536e5C378d977c63');