"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAccountsDetail = exports.fetchAccountQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const common_1 = require("./common");
exports.fetchAccountQueue = new bull_1.default('fetchAccountQueue', {
    defaultJobOptions: { attempts: 3, removeOnComplete: 50 },
    redis: common_1.redisConfig,
    settings: {
        maxStalledCount: 2,
    },
});
const fetchAccountsDetail = async (ids) => {
    exports.fetchAccountQueue.add({ ids }).catch(() => {
        // eslint-disable-next-line no-console
        console.log('Closing connection as Redis is not available');
        exports.fetchAccountQueue.close(true);
    });
};
exports.fetchAccountsDetail = fetchAccountsDetail;
//# sourceMappingURL=fetch-account.js.map