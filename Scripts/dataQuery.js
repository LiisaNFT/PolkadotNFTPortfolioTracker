const axios = require('axios');

// Protocol graphql urls

const Moonbeam_Moonbeans = "http://localhost:4350/graphql";


function fetchcontractFunctionRuns() {
    const query = `
    {
      contractFunctionRuns(orderBy: blockNumber_DESC, limit: 10, where: {blockNumber_gte: 4567266}) {
        blockNumber
        blockTimestamp
        contract
        detail
        functionName
        functionSuccess
        functionValue
        id
        intent
        sigDetail
        sigIntent
        transactionHash
      }
    }
    `;
    // Make the request to receive data from 
    axios.post(Moonbeam_Moonbeans, { query: query })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error);
        });
}

function fetchContractEventTradeAccepteds() {
  const query = `
  {
      contractEventTradeAccepteds(where: {timestamp_lt: "1694025660"}) {
        blockNumber
        blockTimestamp
        contract
        eventName
        id
        expiry
        newOwner
        oldOwner
        price
        quantity
        timestamp
        token
        tradeId
        tokenId
        tradeType
        transactionHash
      }
    }
  `;
  // Make the request to receive data from 
  axios.post(Moonbeam_Moonbeans, { query: query })
      .then(response => {
          console.log(JSON.stringify(response.data, null, 4));
      })
      .catch(error => {
          console.error("Error querying GraphQL:", error);
      });
}

fetchcontractFunctionRuns();
