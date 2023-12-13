import {processor} from './processor'
import { BatchContext, BatchProcessorItem, SubstrateBatchProcessor, SubstrateBlock } from '@subsquid/substrate-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { hexStripPrefix, hexToU8a, u8aToHex } from '@polkadot/util'
import { EntityManager } from 'typeorm'
import _ from 'lodash'
import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
import config from './src/config'
import { AccountTokenEvent, Event, Extrinsic, Fee, FuelTank, FuelTankData, Listing } from './src/modelEnjin'
import { createEnjToken } from './src/createEnjToken'
import { chainState } from './src/chainState'
import * as map from './mappings'
import { getOrCreateAccount } from './mappings/util/entities'
import { CommonContext } from './mappings/types/contexts'
import { populateBlock } from './src/populateBlock'
import { updateClaimDetails } from './mappings/claims/common'
import { syncAllCollections } from '../../jobs/collection-stats'
import { metadataQueue } from '../../jobs/process-metadata'
import { getTankDataFromCall } from './mappings/fuelTanks/common'
import { Item, Context } from './processor'
// Chain
const chain = 'Enjin';

async function handleEvents(
    ctx: CommonContext,
    block: SubstrateBlock,
    item: Item,
    skipSave = false
): Promise<Event | [Event, AccountTokenEvent] | undefined> {
    switch (item.name) {
        case 'MultiTokens.AttributeSet':
            return map.multiTokens.events.attributeSet(ctx, block, item, skipSave, chain)
        case 'MultiTokens.Burned':
            return map.multiTokens.events.burned(ctx, block, item, skipSave, chain)
        case 'MultiTokens.CollectionCreated':
            return map.multiTokens.events.collectionCreated(ctx, block, item, skipSave, chain)
        case 'MultiTokens.Minted':
            return map.multiTokens.events.minted(ctx, block, item, skipSave, chain)
        case 'MultiTokens.TokenCreated':
            return map.multiTokens. events.tokenCreated(ctx, block, item, skipSave, chain)
        case 'MultiTokens.TokenDestroyed':
            return map.multiTokens.events.tokenDestroyed(ctx, block, item, skipSave, chain)
        case 'MultiTokens.TokenMutated':
            return map.multiTokens.events.tokenMutated(ctx, block, item, skipSave, chain)
        case 'MultiTokens.Transferred':
            return map.multiTokens.events.transferred(ctx, block, item, skipSave, chain)
        case 'Marketplace.ListingCreated':
            return map.marketplace.events.listingCreated(ctx, block, item, skipSave, chain)
        case 'Marketplace.ListingCancelled':
            return map.marketplace.events.listingCancelled(ctx, block, item, skipSave, chain)
        case 'Marketplace.ListingFilled':
            return map.marketplace.events.listingFilled(ctx, block, item, skipSave, chain)
        case 'Marketplace.BidPlaced':
            return map.marketplace.events.bidPlaced(ctx, block, item, skipSave, chain)
        case 'Marketplace.AuctionFinalized':
            return map.marketplace.events.auctionFinalized(ctx, block, item, skipSave, chain)
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
    new TypeormDatabase({
        stateSchema: 'eth_processor'
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
