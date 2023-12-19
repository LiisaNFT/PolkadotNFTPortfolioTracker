"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const crypto_1 = require("crypto");
const connection_1 = __importDefault(require("../connection"));
const modelEnjin_1 = require("../modelEnjin");
const hash = (str) => {
    return (0, crypto_1.createHash)('sha1').update(str).digest('hex');
};
// eslint-disable-next-line sonarjs/cognitive-complexity
exports.default = async (job, done) => {
    if (!job.data.collectionId) {
        throw new Error('Collection ID not provided.');
    }
    console.log(`Processing traits job ${job.id} for collection ${job.data.collectionId}`);
    if (!connection_1.default.isInitialized) {
        await connection_1.default.initialize().catch((err) => {
            throw err;
        });
    }
    const em = connection_1.default.manager;
    const traitTypeMap = new Map();
    const tokenTraitMap = new Map();
    const start = new Date();
    const { collectionId } = job.data;
    const tokens = await em
        .getRepository(modelEnjin_1.Token)
        .createQueryBuilder('token')
        .select('token.id')
        .addSelect('token.metadata')
        .addSelect('token.supply')
        .where('token.collection = :collectionId', { collectionId })
        .getMany();
    await em.query(`DELETE FROM trait_token USING trait WHERE trait.id = trait_token.trait_id AND trait.collection_id = $1`, [
        collectionId,
    ]);
    await em.query(`DELETE FROM trait WHERE collection_id = $1`, [collectionId]);
    tokens.forEach((token) => {
        if (!token.metadata || !token.metadata.attributes || !(0, isPlainObject_1.default)(token.metadata.attributes))
            return;
        const attributes = token.metadata.attributes;
        Object.entries(attributes).forEach(([traitType, { value }]) => {
            if (!value)
                return;
            if (!traitTypeMap.has(traitType)) {
                traitTypeMap.set(traitType, new Map());
            }
            const tType = traitTypeMap.get(traitType);
            if (tType.has(value)) {
                tType.set(value, tType.get(value) + token.supply);
            }
            else {
                tType.set(value, token.supply);
            }
            tokenTraitMap.set(token.id, [...(tokenTraitMap.get(token.id) || []), `${collectionId}-${traitType}-${value}`]);
        });
    });
    if (!traitTypeMap.size) {
        console.log(`No traits found for collection ${collectionId}`);
        done();
        return;
    }
    const traitsToSave = [];
    traitTypeMap.forEach((traitValueMap, traitType) => {
        traitValueMap.forEach((count, value) => {
            traitsToSave.push(new modelEnjin_1.Trait({
                id: hash(`${collectionId}-${traitType}-${value}`),
                collection: new modelEnjin_1.Collection({ id: collectionId }),
                traitType,
                value,
                count,
            }));
        });
    });
    await em.insert(modelEnjin_1.Trait, traitsToSave);
    const traitTokensToSave = [];
    tokenTraitMap.forEach((traits, tokenId) => {
        if (!traits.length)
            return;
        traits.forEach((trait) => {
            traitTokensToSave.push(new modelEnjin_1.TraitToken({
                id: hash(`${trait}-${tokenId}`),
                trait: new modelEnjin_1.Trait({ id: hash(trait) }),
                token: new modelEnjin_1.Token({ id: tokenId }),
            }));
        });
    });
    if (traitTokensToSave.length) {
        await em.insert(modelEnjin_1.TraitToken, traitTokensToSave);
    }
    done(null, { timeElapsed: new Date().getTime() - start.getTime(), traits: traitsToSave.length });
};
//# sourceMappingURL=compute-traits.js.map