import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Collection - FP change 
export function fetchFloorPriceChange(host, collectionId, include1h, include24h, include7d, include30d, inUSD) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../src/queries/getFloorChanges.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');
    
    const variables = {
        collectionId: collectionId,
        include1h: include1h,
        include24h: include24h,
        include7d: include7d,
        include30d: include30d,
        inUSD: inUSD
    };

    // Make the request to receive data from 
    axios.post(host, { query: query, variables: variables })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(error => {
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}