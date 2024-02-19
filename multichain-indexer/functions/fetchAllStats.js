import { request, gql } from 'graphql-request';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Stats - Fetch all
export async function fetchAllStats(host) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../src/queries/getNftCollectionStats.graphql');
    const query = fs.readFileSync(queryFilePath, 'utf8');

    try {
        // No need to specify variables if the query does not require them
        const response = await request(host, gql`${query}`);
        console.log(JSON.stringify(response, null, 4));
    } catch (error) {
        console.error("Error querying GraphQL:", error.message);
        if (error.response && error.response.errors) {
            console.error("GraphQL Errors:", JSON.stringify(error.response.errors, null, 2));
        }
    }
}
