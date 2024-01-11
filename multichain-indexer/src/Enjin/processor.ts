import { SubstrateBatchProcessor, BatchProcessorItem } from '@subsquid/substrate-processor'
import { EntityManager } from 'typeorm'
import { Store} from '@subsquid/typeorm-store'
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
        archive: process.env.ARCHIVE_ENDPOINT || 'https://matrixchain.archive.subsquid.io/graphql',
        chain: process.env.CHAIN_ENDPOINT || 'wss://archive.matrix.blockchain.enjin.io',
    })
    .setBlockRange({ from: 0 })
    .addEvent('MultiTokens.AttributeSet', eventOptions)   
    .addEvent('MultiTokens.Transferred', eventOptions)
    .addEvent('Marketplace.ListingCreated', eventOptions)
    .addEvent('Marketplace.ListingCancelled', eventOptions)
    .addEvent('Marketplace.ListingFilled', eventOptions)
    .addEvent('Marketplace.AuctionFinalized', eventOptions)

export type Item = BatchProcessorItem<typeof processor>
//export type Context = DataHandlerContext<Store, typeof fields>
