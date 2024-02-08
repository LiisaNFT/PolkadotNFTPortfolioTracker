import { TypeormDatabase } from '@subsquid/typeorm-store';
import { processor } from './processor';
import * as utils from './mappings/utils'
import * as map from './mappings'
import { Context } from './mappings/nft/utils/types';


// Chain
const chain = 'Basilisk';

processor.run(new TypeormDatabase(), async (ctx) => {

    utils.entity.initAllEntityManagers(ctx);

    for (const block of ctx.blocks) {
        for (const item of block.items) {
            console.log('item:', item);
            switch (item.name) {
                case 'NFT.ItemTransferred':
                    return map.nft.events.nftTransferred(ctx as unknown as Context, block.header, chain)
                case 'NFT.InstanceTransferred':
                    return map.nft.events.nftTransferred(ctx as unknown as Context, block.header, chain)
                case 'Marketplace.TokenSold':
                    return map.nft.events.itemSold(ctx as unknown as Context, block.header, chain)
                case 'Marketplace.TokenPriceUpdated':
                    return map.nft.events.itemList(ctx as unknown as Context, block.header, chain)
                default: {
                    ctx.log.error(`Event not handled: ${item.name}`)
                    return undefined
                }
            }
        }
    }

    await utils.entity.saveAllEntities();
});


