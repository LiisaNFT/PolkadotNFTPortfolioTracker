"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeTraits = exports.traitsQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const common_1 = require("./common");
exports.traitsQueue = new bull_1.default('traitsQueue', {
    defaultJobOptions: { delay: 5000, attempts: 3, removeOnComplete: 500 },
    redis: common_1.redisConfig,
    settings: {
        maxStalledCount: 3,
    },
});
const computeTraits = async (collectionId) => {
    if (!collectionId) {
        throw new Error('Collection ID not provided.');
    }
    if (collectionId === '0') {
        return;
    }
    exports.traitsQueue.add({ collectionId }).catch(() => {
        // eslint-disable-next-line no-console
        console.log('Closing connection as Redis is not available');
        exports.traitsQueue.close(true);
    });
};
exports.computeTraits = computeTraits;
//# sourceMappingURL=compute-traits.js.map