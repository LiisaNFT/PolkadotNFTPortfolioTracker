"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_crypto_1 = require("@polkadot/util-crypto");
const connection_1 = __importDefault(require("../connection"));
const entities_1 = require("../mappings/util/entities");
const marketplace_1 = require("../mappings/util/marketplace");
function isNotNull(input) {
    return input != null;
}
exports.default = async (job, done) => {
    if (!connection_1.default.isInitialized) {
        await connection_1.default.initialize().catch((err) => {
            throw err;
        });
    }
    const em = connection_1.default.manager;
    const { ids } = job.data;
    const data = await (0, marketplace_1.fetchAccountsDetail)(ids);
    const accounts = await Promise.all(data.filter(isNotNull).map(async (_d) => {
        const account = await (0, entities_1.getOrCreateAccount)({ store: em }, (0, util_crypto_1.decodeAddress)(_d.publicKey));
        account.username = _d.username;
        account.image = _d.image;
        account.verifiedAt = _d.verifiedAt;
        return account;
    }));
    await em.save(accounts);
    done(null, data);
};
//# sourceMappingURL=fetch-account.js.map