/* eslint-disable no-await-in-loop */
import { BatchContext, BatchProcessorItem, SubstrateBatchProcessor, SubstrateBlock } from '@subsquid/substrate-processor'
import { FullTypeormDatabase } from '@subsquid/typeorm-store'
import { hexStripPrefix, hexToU8a, u8aToHex } from '@polkadot/util'
import { EntityManager } from 'typeorm'
import _ from 'lodash'
import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
import config from './config'
import { AccountTokenEvent, Event, Extrinsic, Fee, FuelTank, FuelTankData, Listing } from './model'
import { createEnjToken } from './createEnjToken'
import { chainState } from './chainState'
import * as map from './mappings'
import { getOrCreateAccount } from './mappings/util/entities'
import { CommonContext } from './mappings/types/contexts'
import { populateBlock } from './populateBlock'
import { updateClaimDetails } from './mappings/claims/common'
import { syncAllCollections } from './jobs/collection-stats'
import { metadataQueue } from './jobs/process-metadata'
import { getTankDataFromCall } from './mappings/fuelTanks/common'

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

const processor = new SubstrateBatchProcessor()
    .setDataSource(config.dataSource)
    .setBlockRange(config.blockRange || { from: 0 })
    .addCall('*', {
        data: {
            call: true,
            extrinsic: true,
        },
    })  
    .addEvent('MultiTokens.CollectionCreated', eventOptionsWithCall)
    .addEvent('MultiTokens.CollectionDestroyed', eventOptions)
    .addEvent('MultiTokens.CollectionMutated', eventOptions)
    .addEvent('MultiTokens.CollectionAccountCreated', eventOptions)
    .addEvent('MultiTokens.CollectionAccountDestroyed', eventOptions)
    .addEvent('MultiTokens.TokenCreated', eventOptionsWithCall)
    .addEvent('MultiTokens.TokenDestroyed', eventOptions)
    .addEvent('MultiTokens.TokenMutated', eventOptions)
    .addEvent('MultiTokens.TokenAccountCreated', eventOptions)
    .addEvent('MultiTokens.TokenAccountDestroyed', eventOptions)
    .addEvent('MultiTokens.Minted', eventOptions)
    .addEvent('MultiTokens.Burned', eventOptions)
    .addEvent('MultiTokens.AttributeSet', eventOptions)
    .addEvent('MultiTokens.AttributeRemoved', eventOptions)
    .addEvent('MultiTokens.Frozen', eventOptions)
    .addEvent('MultiTokens.Thawed', eventOptions)
    .addEvent('MultiTokens.Approved', eventOptions)
    .addEvent('MultiTokens.Reserved', eventOptions)
    .addEvent('MultiTokens.Unapproved', eventOptions)
    .addEvent('MultiTokens.Unreserved', eventOptions)
    .addEvent('MultiTokens.Transferred', eventOptions)
    .addEvent('Marketplace.ListingCreated', eventOptions)
    .addEvent('Marketplace.ListingCancelled', eventOptions)
    .addEvent('Marketplace.ListingFilled', eventOptions)
    .addEvent('Marketplace.BidPlaced', eventOptions)
    .addEvent('Marketplace.AuctionFinalized', eventOptions)

export type Item = BatchProcessorItem<typeof processor>
export type Context = BatchContext<EntityManager, Item>

async function handleEvents(
    ctx: CommonContext,
    block: SubstrateBlock,
    item: Item,
    skipSave = false
): Promise<Event | [Event, AccountTokenEvent] | undefined> {
    switch (item.name) {
        case 'MultiTokens.AttributeRemoved':
            return map.multiTokens.events.attributeRemoved(ctx, block, item, skipSave)
        case 'MultiTokens.AttributeSet':
            return map.multiTokens.events.attributeSet(ctx, block, item, skipSave)
        case 'MultiTokens.Burned':
            return map.multiTokens.events.burned(ctx, block, item, skipSave)
        case 'MultiTokens.CollectionAccountCreated':
            return map.multiTokens.events.collectionAccountCreated(ctx, block, item, skipSave)
        case 'MultiTokens.CollectionAccountDestroyed':
            return map.multiTokens.events.collectionAccountDestroyed(ctx, block, item, skipSave)
        case 'MultiTokens.CollectionCreated':
            return map.multiTokens.events.collectionCreated(ctx, block, item, skipSave)
        case 'MultiTokens.CollectionDestroyed':
            return map.multiTokens.events.collectionDestroyed(ctx, block, item, skipSave)
        case 'MultiTokens.CollectionMutated':
            return map.multiTokens.events.collectionMutated(ctx, block, item, skipSave)
        case 'MultiTokens.Frozen':
            return map.multiTokens.events.frozen(ctx, block, item, skipSave)
        case 'MultiTokens.Minted':
            return map.multiTokens.events.minted(ctx, block, item, skipSave)
        case 'MultiTokens.Reserved':
            return map.multiTokens.events.reserved(ctx, block, item, skipSave)
        case 'MultiTokens.TokenCreated':
            return map.multiTokens.events.tokenCreated(ctx, block, item, skipSave)
        case 'MultiTokens.TokenDestroyed':
            return map.multiTokens.events.tokenDestroyed(ctx, block, item, skipSave)
        case 'MultiTokens.TokenMutated':
            return map.multiTokens.events.tokenMutated(ctx, block, item, skipSave)
        case 'MultiTokens.Transferred':
            return map.multiTokens.events.transferred(ctx, block, item, skipSave)
        case 'MultiTokens.Unreserved':
            return map.multiTokens.events.unreserved(ctx, block, item, skipSave)
        case 'Marketplace.ListingCreated':
            return map.marketplace.events.listingCreated(ctx, block, item, skipSave)
        case 'Marketplace.ListingCancelled':
            return map.marketplace.events.listingCancelled(ctx, block, item, skipSave)
        case 'Marketplace.ListingFilled':
            return map.marketplace.events.listingFilled(ctx, block, item, skipSave)
        case 'Marketplace.BidPlaced':
            return map.marketplace.events.bidPlaced(ctx, block, item, skipSave)
        case 'Marketplace.AuctionFinalized':
            return map.marketplace.events.auctionFinalized(ctx, block, item, skipSave)
        default: {
            ctx.log.error(`Event not handled: ${item.name}`)
            return undefined
        }
    }
}

function getParticipants(args: any, signer: string): string[] {
    const accountsFromArgs = JSON.stringify(args).match(/\b0x[0-9a-fA-F]{64}\b/g)
    if (accountsFromArgs) {
        const accounts = new Set<string>(accountsFromArgs)
        return Array.from(accounts.add(signer))
    }

    return [signer]
}

// eslint-disable-next-line sonarjs/cognitive-complexity
processor.run(
    new FullTypeormDatabase({
        isolationLevel: 'READ COMMITTED',
    }),
    async (ctx) => {
        try {
            // eslint-disable-next-line no-restricted-syntax
            for (const block of ctx.blocks) {
                const extrinsics: Extrinsic[] = []
                const events: Event[] = []
                const accountTokenEvents: AccountTokenEvent[] = []

                if (block.header.height === 1) {
                    await createEnjToken(ctx as unknown as CommonContext, block.header)
                    await chainState(ctx as unknown as CommonContext, block.header)

                    if (Number(config.prefix) === 1110) {
                        await updateClaimDetails(ctx as unknown as CommonContext, block.header)
                    }

                    await metadataQueue.pause().catch(() => {})

                    await populateBlock(ctx as unknown as CommonContext, config.lastBlockHeight)
                }

                if (block.header.height === config.lastBlockHeight) {
                    metadataQueue.resume().catch(() => {})
                    syncAllCollections()
                }

                // eslint-disable-next-line no-restricted-syntax
                for (const item of block.items) {
                    if (item.kind === 'event') {
                        // eslint-disable-next-line no-await-in-loop
                        const event = await handleEvents(
                            ctx as unknown as CommonContext,
                            block.header,
                            item,
                            block.header.height <= config.lastBlockHeight
                        )

                        if (event) {
                            if (Array.isArray(event)) {
                                events.push(event[0])
                                accountTokenEvents.push(event[1])
                            } else {
                                events.push(event)
                            }
                        }
                    } else if (item.kind === 'call') {
                        if (
                            item.call.parent != null ||
                            ((item.call.name as any) !== 'Claims.claim' && item.extrinsic.signature?.address == null)
                        ) {
                            // eslint-disable-next-line no-continue
                            continue
                        }
                        const { id, fee, hash, call, signature, success, tip, error } = item.extrinsic

                        let publicKey = ''
                        let extrinsicSignature: any = {}
                        let fuelTank = null

                        if (!signature) {
                            publicKey = item.call.args.dest
                            extrinsicSignature = {
                                address: item.call.args.dest,
                                signature: item.call.args.ethereumSignature,
                            }
                        } else {
                            publicKey = (
                                signature.address.__kind === 'Id' || signature.address.__kind === 'AccountId'
                                    ? signature.address.value
                                    : signature.address
                            ) as string
                            extrinsicSignature = signature
                        }

                        if (call.name === 'FuelTanks.dispatch' || call.name === 'FuelTanks.dispatch_and_touch') {
                            const tankData = getTankDataFromCall(ctx as unknown as CommonContext, call)
                            const tank = await ctx.store.findOneByOrFail(FuelTank, { id: u8aToHex(tankData.tankId.value) })

                            fuelTank = new FuelTankData({
                                id: tank.id,
                                name: tank.name,
                                feePaid: 0n,
                                ruleSetId: tankData.ruleSetId,
                                paysRemainingFee:
                                    'settings' in tankData && tankData.settings !== undefined
                                        ? tankData.settings.paysRemainingFee
                                        : null,
                                useNoneOrigin:
                                    'settings' in tankData && tankData.settings !== undefined
                                        ? tankData.settings.useNoneOrigin
                                        : null,
                            })

                            // eslint-disable-next-line no-restricted-syntax
                            for (const eventItem of block.items) {
                                if (eventItem.name !== 'Balances.Withdraw' || eventItem.event.extrinsic?.id !== id) {
                                    // eslint-disable-next-line no-continue
                                    continue
                                }

                                // eslint-disable-next-line no-await-in-loop
                                const transfer = await map.balances.events.withdraw(
                                    ctx as unknown as CommonContext,
                                    block.header,
                                    eventItem
                                )

                                if (transfer && u8aToHex(transfer.who) === tank.id) {
                                    fuelTank.feePaid = transfer.amount
                                }
                            }
                        }

                        // eslint-disable-next-line no-await-in-loop
                        const signer = await getOrCreateAccount(ctx as unknown as CommonContext, hexToU8a(publicKey)) // TODO: Get or create accounts on batches
                        const callName = call.name.split('.')
                        const txFee = (fee ?? 0n) + (fuelTank?.feePaid ?? 0n)

                        const extrinsic = new Extrinsic({
                            id,
                            hash,
                            blockNumber: block.header.height,
                            blockHash: block.header.hash,
                            success,
                            pallet: callName[0],
                            method: callName[1],
                            args: call.args,
                            signature: extrinsicSignature,
                            signer,
                            nonce: signer.nonce,
                            tip,
                            error,
                            fee: new Fee({
                                amount: txFee,
                                who: signer.id,
                            }),
                            fuelTank,
                            createdAt: new Date(block.header.timestamp),
                            participants: getParticipants(call.args, publicKey),
                        })

                        

                        // Hotfix for adding listing seller to participant
                        if (call.name === 'Marketplace.fill_listing' || call.name === 'Marketplace.finalize_auction') {
                            const listingId = call.args.listingId.toString()
                            // eslint-disable-next-line no-await-in-loop
                            const listing = await ctx.store.findOne(Listing, {
                                where: { id: hexStripPrefix(listingId) },
                                relations: { seller: true },
                            })
                            if (listing?.seller && !extrinsic.participants.includes(listing.seller.id)) {
                                extrinsic.participants.push(listing.seller.id)
                            }
                        }

                        extrinsics.push(extrinsic)
                    }
                }

                await map.balances.processor.saveAccounts(ctx as unknown as CommonContext, block.header)
                _.chunk(extrinsics, 2000).forEach((chunk) => ctx.store.insert(Extrinsic, chunk as any))
                _.chunk(events, 2000).forEach((chunk) => ctx.store.insert(Event, chunk as any))
                _.chunk(accountTokenEvents, 2000).forEach((chunk) => ctx.store.insert(AccountTokenEvent, chunk as any))
            }

            const lastBlock = ctx.blocks[ctx.blocks.length - 1].header
            if (lastBlock.height > config.lastBlockHeight - 200) {
                await chainState(ctx as unknown as CommonContext, lastBlock)
            }
        } catch (error) {
            metadataQueue.resume()
            Sentry.captureException(error)
            throw error
        }
    }
)
