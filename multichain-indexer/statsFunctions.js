import { fetchAstarTofuSales, fetchMoonbeamMoonbeansSales, fetchMoonbeamSeascapeSales, fetchMoonbeamSeascapeListings, fetchMoonbeamTofuSales, fetchMoonriverMoonbeansSales, fetchMoonriverMoonbeansListings, fetchMoonriverSeascapeListings, fetchMoonriverSeascapeSales, fetchBasiliskSales, fetchBasiliskListings } from './functions/dataQueries.js';

// Variables for queiring graphql

const host = "http://localhost:4350/graphql";



const blockNumber_gte = 10000;
const limit = 10;

//Functions

fetchBasiliskListings(hostBasilisk, blockNumber_gte, limit);

fetchBasiliskSales(hostBasilisk, blockNumber_gte, limit);







