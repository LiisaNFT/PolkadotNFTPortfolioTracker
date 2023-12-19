"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
const config_1 = __importDefault(require("../src/enjin/config"));
exports.redisConfig = {
    port: config_1.default.redisPort,
    host: config_1.default.redisHost,
    db: config_1.default.redisDb,
    tls: config_1.default.redisSupportsTls ? {} : undefined,
};
//# sourceMappingURL=common.js.map