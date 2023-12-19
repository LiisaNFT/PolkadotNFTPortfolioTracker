"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncAllCollections = exports.syncCollectionStats = exports.collectionStatsQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const common_1 = require("./common");
const connection_1 = __importDefault(require("../connection"));
const modelEnjin_1 = require("../modelEnjin");
const compute_traits_1 = require("./compute-traits");
exports.collectionStatsQueue = new bull_1.default('collectionStatsQueue', {
    defaultJobOptions: { delay: 2000, attempts: 3, removeOnComplete: 500 },
    redis: common_1.redisConfig,
    settings: {
        maxStalledCount: 3,
    },
});
const syncCollectionStats = async (collectionId) => {
    if (!collectionId) {
        throw new Error('Collection ID not provided.');
    }
    if (collectionId === '0') {
        return;
    }
    exports.collectionStatsQueue.add({ collectionId }).catch(() => {
        // eslint-disable-next-line no-console
        console.log('Closing connection as Redis is not available');
        exports.collectionStatsQueue.close(true);
    });
};
exports.syncCollectionStats = syncCollectionStats;
async function syncAllCollections() {
    if (!connection_1.default.isInitialized) {
        await connection_1.default.initialize().catch((err) => {
            throw err;
        });
    }
    const em = connection_1.default.manager;
    const collections = await em.find(modelEnjin_1.Collection, {
        select: ['id'],
    });
    collections.forEach((collection) => {
        (0, exports.syncCollectionStats)(collection.id);
        (0, compute_traits_1.computeTraits)(collection.id);
    });
}
exports.syncAllCollections = syncAllCollections;
//# sourceMappingURL=collection-stats.js.map