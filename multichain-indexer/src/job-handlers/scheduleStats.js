const cron = require('node-cron');
const { fetchCollectionData, computeMetrics } = require('../jobs/statsGenerator');

// Schedule the job to run every day at midnight (00:00)
cron.schedule('0 0 * * *', async () => {
    console.log('Running metrics generation job...');
    try {
        const data = await fetchCollectionData();
        const updatedMetrics = await computeMetrics(data.collections);
        console.log('Updated metrics:', updatedMetrics);
        // Here, you'd typically update your database with the new metrics
    } catch (error) {
        console.error('Failed to generate metrics:', error);
    }
});

console.log('Metrics generation job scheduled.');
