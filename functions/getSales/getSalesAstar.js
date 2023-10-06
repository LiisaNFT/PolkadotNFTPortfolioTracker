import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main functions

export function fetchcontractFunctionRuns(host, blockNumber_gte, limit) {
    // Load the GraphQL query from the file
    console.log('Hello World');
    const queryFilePath = path.join(__dirname, '../../queries/Astar/getTofuSales.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        blockNumber_gte: blockNumber_gte,
        limit: limit
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error);
        });
}

export function fetchcontractEventTradeAccepteds(host, blockNumber_gte, limit) {
    // Load the GraphQL query from the file
    console.log('Hello World');
    const queryFilePath = path.join(__dirname, '../../queries/Moonbeam/getMoonbeansSales.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        blockNumber_gte: blockNumber_gte,
        limit: limit
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error);
        });
}
