import { fetchAstarTofuSales, fetchMoonbeamMoonbeansSales, fetchMoonbeamSeascapeSales, fetchMoonbeamSeascapeListings, fetchMoonbeamTofuSales, fetchMoonriverMoonbeansSales, fetchMoonriverMoonbeansListings, fetchMoonriverSeascapeListings, fetchMoonriverSeascapeSales, fetchBasiliskSales, fetchBasiliskListings } from './dataQueries.js';

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

fetchBasiliskListings(hostBasilisk, blockNumber_gte, limit);

fetchBasiliskSales(hostBasilisk, blockNumber_gte, limit);

'Create metrics below'

// - Individual item activity

// - Nft Acquisition price

// - Nft Metadata

// - Wallet history

// - 24H Collection trades : 
//To be used to build collection stats
//Use attached query
//Specify collection ID only
//Filter for "Sales" and "last 24h"
//Count events

// - User Collections - NFTs owned per collection

// - Rarity Rank

// - Unrealized P&L (individual) : 
//Unrealized PNL = Estimated value - Acquisition price

// - Sales Floors per collection
//The attached query returns the lowest sale given:
//Collection ID
//Start Time
//End time

// - NFTs page - Estimated value
//Query for last sale by specified trait in annex
//query current floor price from collection stats
//query floor for time of last sale with specified trate

// - FP change per collection
//use sales floor on collection stats (see other task with query script)

// - Invested value per collection

// - Estimated value per collection

//  - User Collections Unrealized P&L per collection

// - Volume per collection

// - Estimated value total
//Sum of estimated values of all NFTs owned

// - Revenue total

// - Spending total 

// - Realized P&L 

// - Unrealized P&L 

// - Liquidity

// - Estimated Value evolution

// - Volatility

// - Diversification

// - Inventory

// - Top gainers

// - Top Losers

// - Recently bought








