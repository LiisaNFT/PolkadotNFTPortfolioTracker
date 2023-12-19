"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCollectionExtra = exports.fetchCollectionExtraQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const common_1 = require("./common");
exports.fetchCollectionExtraQueue = new bull_1.default('fetchCollectionExtraQueue', {
    defaultJobOptions: { attempts: 3, removeOnComplete: 50 },
    redis: common_1.redisConfig,
    settings: {
        maxStalledCount: 3,
    },
});
const fetchCollectionExtra = async (ids) => {
    exports.fetchCollectionExtraQueue.add({ ids }).catch(() => {
        // eslint-disable-next-line no-console
        console.log('Closing connection as Redis is not available');
        exports.fetchCollectionExtraQueue.close(true);
    });
};
exports.fetchCollectionExtra = fetchCollectionExtra;
//# sourceMappingURL=fetch-collection-extra.js.map