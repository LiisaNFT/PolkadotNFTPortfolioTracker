import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main functions

export function fetchAstarTofuSales(host, blockNumber_gte, limit) {
    // Load the GraphQL query from the file
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
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

export function fetchMoonbeamMoonbeansSales(host, blockNumber_gte, limit) {
    // Load the GraphQL query from the file
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
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

export function fetchMoonbeamSeascapeSales(host, blockNumber_gte, limit) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../queries/Moonbeam/getSeascapeSales.graphql');
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
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

export function fetchMoonbeamSeascapeListings(host, blockNumber_gte, limit) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../queries/Moonbeam/getSeascapeListings.graphql');
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
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

export function fetchMoonbeamTofuSales(host, blockNumber_gte, limit) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../queries/Moonbeam/getTofuSales.graphql');
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
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

export function fetchMoonriverMoonbeansSales(host, blockNumber_gte, limit) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../queries/Moonriver/getMoonbeansSales.graphql');
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
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

export function fetchMoonriverMoonbeansListings(host, blockNumber_gte, limit) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../queries/Moonriver/getMoonbeansListings.graphql');
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
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

export function fetchMoonriverSeascapeListings(host, blockNumber_gte, limit) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../queries/Moonriver/getSeascapeListings.graphql');
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
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

export function fetchMoonriverSeascapeSales(host, blockNumber_gte, limit) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../queries/Moonriver/getSeascapeSales.graphql');
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
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

export function fetchBasiliskSales(host, blockNumber_gte, limit) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../queries/Basilisk/getBasiliskSales.graphql');
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
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}

export function fetchBasiliskListings(host, blockNumber_gte, limit) {
    // Load the GraphQL query from the file
    const queryFilePath = path.join(__dirname, '../../queries/Basilisk/getBasiliskListings.graphql');
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
            console.error("Error querying GraphQL:", error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error("GraphQL Errors:", JSON.stringify(error.response.data.errors, null, 2));
            }
        });
}
