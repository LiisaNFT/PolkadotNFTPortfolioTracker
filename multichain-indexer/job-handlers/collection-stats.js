"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modelEnjin_1 = require("../modelEnjin");
const connection_1 = __importDefault(require("../connection"));
const floorQuery = `SELECT MIN("listing"."highest_price") AS floor_price FROM "listing" AS "listing" INNER JOIN "token" "token" ON "token"."id" = "listing"."make_asset_id_id" INNER JOIN "collection" "collection" ON "collection"."id" = "token"."collection_id" WHERE "collection"."id" = $1 AND
(SELECT count(*) FROM "listing_status" AS "listing_status" WHERE "listing_status"."type" = 'Active' AND "listing_status"."listing_id" = "listing"."id") = (SELECT count(*) FROM "listing_status" AS "listing_status_1" WHERE "listing_status_1"."listing_id" = "listing"."id")`;
exports.default = async (job, done) => {
    if (!job.data.collectionId) {
        throw new Error('Collection ID not provided.');
    }
    if (!connection_1.default.isInitialized) {
        await connection_1.default.initialize().catch((err) => {
            throw err;
        });
    }
    const { collectionId } = job.data;
    const em = connection_1.default.manager;
    // eslint-disable-next-line no-console
    console.log('collection-stats', collectionId);
    const promises = [
        em
            .createQueryBuilder()
            .addSelect('MAX(l.highest_price) AS highest_sale')
            .addSelect('MAX(l.last_sale) AS last_sale')
            .addSelect('SUM(l.volume) AS total_volume')
            .addSelect('SUM(l.count)::int AS sales')
            .from((qb) => {
            return qb
                .select('listing.id AS id')
                .addSelect('COUNT(sale.id) AS count')
                .addSelect('listing.highest_price AS highest_price')
                .addSelect('SUM(sale.amount * sale.price) AS volume')
                .addSelect('listing.amount AS amount')
                .addSelect('CASE WHEN lead(listing.id) OVER(ORDER BY listing.created_at) IS NULL THEN listing.highest_price END AS last_sale')
                .from(modelEnjin_1.ListingSale, 'sale')
                .innerJoin(modelEnjin_1.Listing, 'listing', 'listing.id = sale.listing')
                .innerJoin(modelEnjin_1.Token, 'token', 'listing.make_asset_id_id = token.id')
                .innerJoin(modelEnjin_1.Collection, 'collection', 'token.collection = collection.id')
                .leftJoin(modelEnjin_1.ListingStatus, 'status', `listing.id = status.listing AND status.type = 'Finalized'`)
                .where('collection.id = :collectionId', { collectionId })
                .groupBy('listing.id');
        }, 'l')
            .getRawOne(),
        em.query(floorQuery, [collectionId]),
        em
            .getRepository(modelEnjin_1.Token)
            .createQueryBuilder('token')
            .select('COUNT(token.id)', 'tokenCount')
            .addSelect('SUM(token.supply)', 'supply')
            .where('token.collection = :collectionId', { collectionId })
            .getRawOne(),
    ];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [sales, [{ floor_price }], { tokenCount, supply }] = await Promise.all(promises);
    const stats = new modelEnjin_1.CollectionStats({
        tokenCount: Number(tokenCount),
        supply: BigInt(supply ?? 0n),
        salesCount: sales?.sales ?? 0,
        volume: sales?.total_volume ?? 0n,
        marketCap: BigInt(sales?.last_sale ?? 0n) * BigInt(tokenCount),
        floorPrice: floor_price,
        lastSale: sales?.last_sale ?? null,
        highestSale: sales?.highest_sale ?? null,
    });
    await em.update(modelEnjin_1.Collection, { id: collectionId }, { stats });
    done(null, { id: collectionId, stats: stats.toJSON() });
};
//# sourceMappingURL=collection-stats.js.map