const { request } = require('graphql-request');

// Load the GraphQL query from the file
const query = `query LastTraitSale($collectionId: String!, $attributeType: String!, $attributeValue: String!) {
    nftEvents(
    orderBy: timestamp_DESC,
    where: {
      eventType_eq: SALE,
      nfToken: {
        attributes_some: {
          attribute: {
            type_eq: $attributeType,
            value_eq: $attributeValue
          }
        },
        collection: {
          id_eq: $collectionId
        }
      }
    }
  ) {
    id
    eventType
    price
    txnHash
    timestamp
    }
  }`;

//Collection - Last Sale per trait
async function fetchLastTraitSale(host, collectionId, attributeType, attributeValue) {

    const variables = {
        collectionId: collectionId,
        attributeType: attributeType,
        attributeValue: attributeValue
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

module.exports = { fetchLastTraitSale };

//fetchLastTraitSale('http://localhost:4350', '0x51737fa634e26f5687e45c6ca07604e064076350', 'birthday', '1660734790')