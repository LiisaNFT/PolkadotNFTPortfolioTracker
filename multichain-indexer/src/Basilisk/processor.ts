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
    .addEvent("Contracts.ContractEmitted", eventOptions);

export type Item = BatchProcessorItem<typeof processor>;
export type Context = BatchContext<Store, Item>;


