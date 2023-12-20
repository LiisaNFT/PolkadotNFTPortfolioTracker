import { BatchContext, BatchProcessorItem, SubstrateBatchProcessor, SubstrateBlock } from '@subsquid/substrate-processor'
import { EntityManager } from 'typeorm'
import _ from 'lodash'
import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
import config from './config'

Sentry.init({
    dsn: config.sentryDsn,
    tracesSampleRate: 1.0,
    integrations: [
        new RewriteFrames({
            root: global.__dirname,
        }),
    ],
})

const eventOptions = {  
    data: {
        event: {
            args: true,
            extrinsic: true,
        },
    } as const,
} as const

const eventOptionsWithCall = {
    data: {
        event: {
            args: true,
            call: true,
            extrinsic: true,
        },
    } as const,
} as const

export const processor = new SubstrateBatchProcessor()
    .setDataSource(config.dataSource)
    .setBlockRange(config.blockRange || { from: 0 })
    .addCall('*', {
        data: {
            call: true,
            extrinsic: true,
        },
    })
    .addEvent('MultiTokens.AttributeSet', eventOptions)
    .addEvent('MultiTokens.Transferred', eventOptions)
    .addEvent('Marketplace.ListingCreated', eventOptions)
    .addEvent('Marketplace.ListingCancelled', eventOptions)
    .addEvent('Marketplace.ListingFilled', eventOptions)
    .addEvent('Marketplace.AuctionFinalized', eventOptions)

export type Item = BatchProcessorItem<typeof processor>
export type Context = BatchContext<EntityManager, Item>
