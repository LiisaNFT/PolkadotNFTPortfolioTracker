"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const marketplace_1 = require("../mappings/util/marketplace");
const modelEnjin_1 = require("../modelEnjin");
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
    const data = await (0, marketplace_1.fetchCollectionsExtra)(ids);
    const collectionsPromise = data.filter(isNotNull).map(async (_c) => {
        const collection = new modelEnjin_1.Collection({});
        collection.hidden = _c.hidden;
        collection.flags = new modelEnjin_1.CollectionFlags({
            featured: _c.featured,
            hiddenForLegalReasons: _c.hiddenForLegalReasons,
            verified: false,
        });
        collection.socials = new modelEnjin_1.CollectionSocials({
            discord: _c.discord,
            twitter: _c.twitter,
            instagram: _c.instagram,
            medium: _c.medium,
            tiktok: _c.tiktok,
            website: _c.website,
        });
        await em.update(modelEnjin_1.Collection, { id: _c.collectionId }, collection).catch((err) => {
            // eslint-disable-next-line no-console
            console.error('Error: Updating collection', _c.collectionId, err);
        });
    });
    await Promise.all(collectionsPromise);
    done(null, data);
};
//# sourceMappingURL=fetch-collection-extra.js.map