import { fetchcontractFunctionRuns, fetchcontractEventTradeAccepteds } from '../functions/getSales/getSalesAstar.js';

// Variables for queiring graphql

const hostAstarTofuNFT = "http://localhost:4350/graphql";
const hostMoonbeamMoonbeans = "http://localhost:4350/graphql";
const blockNumber_gte = 45672;
const limit = 10;

//Functions

fetchcontractFunctionRuns(hostAstarTofuNFT, blockNumber_gte, limit);

fetchcontractEventTradeAccepteds(hostMoonbeamMoonbeans, blockNumber_gte, limit);