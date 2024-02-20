const { fetchAllStats } = require('./fetchAllStats.js');


//Stats - Liquidity
async function getLiquidity(host) {
    
    // Get all collections
    const stats = fetchAllStats(host);

    // Get max and min sales count
    const maxSalesCount = Math.max(...stats.map(s => s.sales_count_24h));
    const minSalesCount = Math.min(...stats.map(s => s.sales_count_24h));

    let totalEstimatedValue = stats.reduce((sum, collection) => sum + collection.estimated_value, 0);
    let weightedSum = 0;

    for (const collection of stats) {
        const salesCount = collection.sales_count_24h;
        const score = 100 * ((salesCount - minSalesCount) / (maxSalesCount - minSalesCount));
        const weight = collection.estimated_value / totalEstimatedValue;
        weightedSum += score * weight;
    }

    return weightedSum; // This is the weighted average score
}

module.exports = { getLiquidity };

getLiquidity('http://localhost:4350');