"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMetadata = exports.metadataQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const common_1 = require("./common");
exports.metadataQueue = new bull_1.default('metadataQueue', {
    defaultJobOptions: { delay: 1000, attempts: 5, removeOnComplete: true },
    redis: common_1.redisConfig,
    settings: {
        maxStalledCount: 3,
    },
});
const processMetadata = async (resourceId, type, force = false) => {
    exports.metadataQueue.add({ resourceId, type, force }, { jobId: `${type}-${resourceId}` }).catch(() => {
        // eslint-disable-next-line no-console
        console.log('Closing connection as Redis is not available');
        exports.metadataQueue.close(true);
    });
};
exports.processMetadata = processMetadata;
//# sourceMappingURL=process-metadata.js.map