import {processor, Context} from './processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import _ from 'lodash'
import * as map from './mappings'
import * as utils from './mappings/utils'
import { CommonContext } from './mappings/types/contexts'

// Chain
const chain = 'Enjin';

processor.run(new TypeormDatabase({stateSchema: 'eth_processor'}), async (ctx) => {
        
        utils.entity.initAllEntityManagers(ctx as Context);
        
        for (const block of ctx.blocks) {
            for (const item of block.items) {
                    
                switch (item.name) {
                    //case 'MultiTokens.AttributeSet':
                        //return map.multiTokens.events.attributeSet(ctx, block, item, false, chain)
                    case 'MultiTokens.Transferred':
                        return map.multiTokens.events.transferred(ctx as unknown as CommonContext, block.header, item, false, chain)
                    case 'Marketplace.ListingCreated':
                        return map.marketplace.events.listingCreated(ctx as unknown as CommonContext, block.header, item, false, chain)
                    case 'Marketplace.ListingCancelled':
                        return map.marketplace.events.listingCancelled(ctx as unknown as CommonContext, block.header, item, false, chain)
                    case 'Marketplace.ListingFilled':
                        return map.marketplace.events.listingFilled(ctx as unknown as CommonContext, block.header, item, false, chain)
                    case 'Marketplace.AuctionFinalized':
                        return map.marketplace.events.auctionFinalized(ctx as unknown as CommonContext, block.header, item, false, chain)
                    default: {
                        ctx.log.error(`Event not handled: ${item.name}`)
                        return undefined
                    }
                }
                    
            }
            
        }
        await utils.entity.saveAllEntities();
    }
)
