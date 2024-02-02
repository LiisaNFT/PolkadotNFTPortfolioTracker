import { lookupArchive } from "@subsquid/archive-registry";
import {
    BatchContext,
    BatchProcessorItem,
    SubstrateBatchProcessor,
  } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";

const eventOptions = {  
    data: {
        event: {
            args: true,
            extrinsic: true,
        },
    } as const,
} as const

export const processor = new SubstrateBatchProcessor()
    .setDataSource({
        archive: lookupArchive('basilisk', {type: 'Substrate', release: 'FireSquid'}),
        chain: 'wss://rpc.basilisk.cloud',
        
    })
    .setBlockRange({ from: 1790000 })
    .addEvent('NFT.InstanceTransferred', eventOptions)
    .addEvent('NFT.ItemTransferred', eventOptions)
    .addEvent('Marketplace.TokenSold', eventOptions)
    .addEvent('Marketplace.TokenPriceUpdated', eventOptions)

export type Item = BatchProcessorItem<typeof processor>;
export type Context = BatchContext<Store, Item>;

