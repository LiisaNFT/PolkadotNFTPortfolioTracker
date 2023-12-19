import {processor} from './processor'
import { BatchContext, BatchProcessorItem, SubstrateBatchProcessor, SubstrateBlock } from '@subsquid/substrate-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { hexStripPrefix, hexToU8a, u8aToHex } from '@polkadot/util'
import { EntityManager } from 'typeorm'
import _ from 'lodash'
import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
import config from './config'
import { AccountTokenEvent, Event, Extrinsic, Fee, FuelTank, FuelTankData, Listing } from './modelEnjin'
import { createEnjToken } from './createEnjToken'
import { chainState } from './chainState'
import * as map from './mappings'
import { getOrCreateAccount } from './mappings/util/entities'
import { CommonContext } from './mappings/types/contexts'
import { populateBlock } from './populateBlock'
import { updateClaimDetails } from './mappings/claims/common'
import { syncAllCollections } from '../../jobs/collection-stats'
import { metadataQueue } from '../../jobs/process-metadata'
import { getTankDataFromCall } from './mappings/fuelTanks/common'
import { Item, Context } from './processor'
import * as utils from './mappings/utils'
// Chain
const chain = 'Enjin';

processor.run(new TypeormDatabase({supportHotBlocks: false, stateSchema: 'eth_processor'}), async (ctx) => {
        
        utils.entity.initAllEntityManagers(ctx);
        await utils.entity.prefetchEntities(ctx);
        
        for (const block of ctx.blocks) {
            for (const item of block.items) {
                if (item.kind === 'event') {
                    
                    switch (item.name) {
                        case 'MultiTokens.AttributeSet':
                            return map.multiTokens.events.attributeSet(ctx, block, item, false, chain)
                        case 'MultiTokens.Transferred':
                            return map.multiTokens.events.transferred(ctx, block, item, false, chain)
                        case 'Marketplace.ListingCreated':
                            return map.marketplace.events.listingCreated(ctx, block, item, false, chain)
                        case 'Marketplace.ListingCancelled':
                            return map.marketplace.events.listingCancelled(ctx, block, item, false, chain)
                        case 'Marketplace.ListingFilled':
                            return map.marketplace.events.listingFilled(ctx, block, item, false, chain)
                        case 'Marketplace.AuctionFinalized':
                            return map.marketplace.events.auctionFinalized(ctx, block, item, false, chain)
                        default: {
                            ctx.log.error(`Event not handled: ${item.name}`)
                            return undefined
                        }
                    }
                    
                }
            }
            
        }
        await utils.entity.saveAllEntities();
    }
)
