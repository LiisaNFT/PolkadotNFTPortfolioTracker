import {  BatchContext, SubstrateBatchProcessor, BatchProcessorItem } from '@subsquid/substrate-processor'
import { lookupArchive } from "@subsquid/archive-registry";
import _ from 'lodash'
import config from './config'
import { Store } from "@subsquid/typeorm-store";


export const fields = {
    call: {
      args: true,
      origin: true,
      success: true
    },
    event: {
      args: true
    },
    block: { timestamp: true }
  }

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
        archive: lookupArchive('enjin-matrix'),
        chain: 'wss://archive.matrix.blockchain.enjin.io',
    })
    .setBlockRange({ from: 0 })
    .addEvent('MultiTokens.AttributeSet', eventOptions)   
    .addEvent('MultiTokens.Transferred', eventOptions)
    .addEvent('Marketplace.ListingCreated', eventOptions)
    .addEvent('Marketplace.ListingCancelled', eventOptions)
    .addEvent('Marketplace.ListingFilled', eventOptions)
    .addEvent('Marketplace.AuctionFinalized', eventOptions)

export type Item = BatchProcessorItem<typeof processor>;
export type Context = BatchContext<Store, Item>;