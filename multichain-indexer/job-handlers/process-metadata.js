"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const connection_1 = __importDefault(require("../src/enjin/connection"));
const modelEnjin_1 = require("../src/enjin/modelEnjin");
const metadata_1 = require("../src/enjin/mappings/util/metadata");
exports.default = async (job, done) => {
    if (!connection_1.default.isInitialized) {
        await connection_1.default.initialize().catch((err) => {
            throw err;
        });
    }
    const em = connection_1.default.manager;
    const jobData = job.data;
    let resource;
    let attributes = [];
    let collectionUriAttribute = null;
    if (jobData.type === 'collection') {
        ;
        [resource, attributes] = await Promise.all([
            em.findOne(modelEnjin_1.Collection, {
                where: { id: jobData.resourceId },
            }),
            em.find(modelEnjin_1.Attribute, {
                where: { collection: { id: jobData.resourceId }, token: (0, typeorm_1.IsNull)() },
            }),
        ]);
    }
    else {
        ;
        [resource, [collectionUriAttribute]] = await Promise.all([
            em.findOne(modelEnjin_1.Token, {
                where: {
                    id: jobData.resourceId,
                },
                relations: {
                    attributes: true,
                },
            }),
            em.find(modelEnjin_1.Attribute, {
                where: { collection: { id: jobData.resourceId.split('-')[0] }, key: 'uri', token: (0, typeorm_1.IsNull)() },
            }),
        ]);
        attributes = resource?.attributes ?? [];
    }
    if (!resource) {
        done(null, 'Resource not found');
        return;
    }
    let uriAttribute = attributes.find((a) => a.key === 'uri');
    if (collectionUriAttribute && collectionUriAttribute.value.includes('{id}')) {
        uriAttribute = { ...collectionUriAttribute, value: collectionUriAttribute.value.replace('{id}', resource.id) };
    }
    let externalMetadata = {};
    let metadata = new modelEnjin_1.Metadata();
    if (uriAttribute) {
        const response = await connection_1.default.query('select * from metadata.metadata where id = $1 LIMIT 1', [
            jobData.resourceId,
        ]);
        if (response.length > 0 && response[0].uri === uriAttribute.value && !jobData.force) {
            externalMetadata = response[0].metadata;
        }
        else {
            const externalResponse = await (0, metadata_1.fetchMetadata)(uriAttribute.value);
            if (externalResponse && typeof externalResponse === 'object' && !Array.isArray(externalResponse)) {
                if (response.length > 0) {
                    await connection_1.default.query('update metadata.metadata set metadata = $1, uri = $2, last_updated_at = NOW() where id = $3', [externalResponse, uriAttribute.value, jobData.resourceId]);
                }
                else {
                    await connection_1.default.query('insert into metadata.metadata (id, metadata, uri, last_updated_at) values ($1, $2, $3, NOW())', [jobData.resourceId, externalResponse, uriAttribute.value]);
                }
                externalMetadata = externalResponse;
            }
            else if (response.length > 0) {
                externalMetadata = response[0].metadata;
            }
        }
        metadata = (0, metadata_1.metadataParser)(metadata, uriAttribute, externalMetadata);
    }
    // add other attributes
    attributes
        .filter((a) => a.key !== 'uri')
        .forEach(async (a) => {
        metadata = (0, metadata_1.metadataParser)(metadata, a, null);
    });
    resource.metadata = metadata;
    await em.save(resource);
    done(null, { id: jobData.resourceId });
};
//# sourceMappingURL=process-metadata.js.map