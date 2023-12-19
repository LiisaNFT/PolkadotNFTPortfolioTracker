"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("@bull-board/api");
const bullAdapter_1 = require("@bull-board/api/bullAdapter");
const express_2 = require("@bull-board/express");
const connection_1 = __importDefault(require("../connection"));
const collection_stats_1 = require("../jobs/collection-stats");
const process_metadata_1 = require("../jobs/process-metadata");
const fetch_account_1 = require("../jobs/fetch-account");
const compute_traits_1 = require("../jobs/compute-traits");
const fetch_collection_extra_1 = require("../jobs/fetch-collection-extra");
async function main() {
    if (!connection_1.default.isInitialized) {
        await connection_1.default.initialize().catch((err) => {
            throw err;
        });
    }
    // eslint-disable-next-line no-console
    console.info('handling jobs...');
    compute_traits_1.traitsQueue.process(2, `${__dirname}/compute-traits.js`);
    process_metadata_1.metadataQueue.process(50, `${__dirname}/process-metadata.js`);
    collection_stats_1.collectionStatsQueue.process(10, `${__dirname}/collection-stats.js`);
    fetch_account_1.fetchAccountQueue.process(5, `${__dirname}/fetch-account.js`);
    fetch_collection_extra_1.fetchCollectionExtraQueue.process(5, `${__dirname}/fetch-collection-extra.js`);
    const serverAdapter = new express_2.ExpressAdapter();
    serverAdapter.setBasePath('/');
    (0, api_1.createBullBoard)({
        queues: [
            new bullAdapter_1.BullAdapter(process_metadata_1.metadataQueue),
            new bullAdapter_1.BullAdapter(collection_stats_1.collectionStatsQueue),
            new bullAdapter_1.BullAdapter(fetch_account_1.fetchAccountQueue),
            new bullAdapter_1.BullAdapter(compute_traits_1.traitsQueue),
            new bullAdapter_1.BullAdapter(fetch_collection_extra_1.fetchCollectionExtraQueue),
        ],
        serverAdapter,
        options: {
            uiConfig: {
                boardTitle: 'Indexer Queue',
                boardLogo: {
                    path: 'https://cdn.nft.io/branding/enjin.svg',
                    width: '50px',
                    height: 80,
                },
            },
        },
    });
    const app = (0, express_1.default)();
    app.use('/', serverAdapter.getRouter());
    // other configurations of your server
    app.listen(9090, () => {
        // eslint-disable-next-line no-console
        console.log('Running on 9090...');
    });
}
main();
//# sourceMappingURL=worker.js.map