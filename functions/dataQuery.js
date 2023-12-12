import { fetchAstarTofuSales, fetchMoonbeamMoonbeansSales, fetchMoonbeamSeascapeSales, fetchMoonbeamSeascapeListings, fetchMoonbeamTofuSales, fetchMoonriverMoonbeansSales, fetchMoonriverMoonbeansListings, fetchMoonriverSeascapeListings, fetchMoonriverSeascapeSales, fetchBasiliskSales, fetchBasiliskListings } from './getSales/getSalesAstar.js';

// Variables for queiring graphql

const hostAstarTofuNFT = "http://localhost:4350/graphql";
const hostMoonbeamMoonbeans = "http://localhost:4351/graphql";
const hostMoonbeamSeascape = "http://localhost:4353/graphql"; 
const hostMoonbeamTofu = "http://localhost:4354/graphql";
const hostMoonriverMoonbeans = "http://localhost:4355/graphql"; 
const hostMoonriverSeascape = "http://localhost:4356/graphql"; 
const hostBasilisk = "http://localhost:4358/graphql"; 
 



const blockNumber_gte = 10000;
const limit = 10;

//Functions

//fetchAstarTofuSales(hostAstarTofuNFT, blockNumber_gte, limit);

//fetchMoonbeamMoonbeansSales(hostMoonbeamMoonbeans, blockNumber_gte, limit);

//fetchMoonbeamSeascapeSales(hostMoonbeamSeascape, blockNumber_gte, limit);

//fetchMoonbeamSeascapeListings(hostMoonbeamSeascape, blockNumber_gte, limit);

//fetchMoonbeamTofuSales(hostMoonbeamTofu, blockNumber_gte, limit);

//fetchMoonriverMoonbeansSales(hostMoonriverMoonbeans, blockNumber_gte, limit);

//fetchMoonriverMoonbeansListings(hostMoonriverMoonbeans, blockNumber_gte, limit);

//fetchMoonriverSeascapeListings(hostMoonriverSeascape, blockNumber_gte, limit);

//fetchMoonriverSeascapeSales(hostMoonriverSeascape, blockNumber_gte, limit);

fetchBasiliskListings(hostBasilisk, blockNumber_gte, limit);

fetchBasiliskSales(hostBasilisk, blockNumber_gte, limit);


