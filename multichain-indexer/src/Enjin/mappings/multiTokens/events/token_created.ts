import { SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { u8aToHex } from '@polkadot/util'
import { IsNull } from 'typeorm'
import { UnknownVersionError } from '../../../../common/errors'
import { MultiTokensTokenCreatedEvent } from '../../../types/generated/events'
import {
    Attribute,
    CapType,
    Event as EventModel,
    Extrinsic,
    FreezeState,
    Metadata,
    MultiTokensTokenCreated,
    Royalty,
    Token,
    TokenBehaviorHasRoyalty,
    TokenBehaviorIsCurrency,
    TokenBehaviorType,
    TokenCapSingleMint,
    TokenCapSupply,
} from '../../../modelEnjin'
import { Call, Event } from '../../../types/generated/support'
import {
    DefaultMintParams_CreateToken as DefaultMintParamsCreateToken_v500,
    FreezeState as FreezeState_v500,
    MultiTokensCall_mint as MultiTokensCall_mint_v500,
    SufficiencyParam_Sufficient,
    TokenMarketBehavior,
} from '../../../types/generated/v500'
import { DefaultMintParams_CreateToken as DefaultMintParamsCreateToken_v600 } from '../../../types/generated/v600'
import {
    TokenCap,
    DefaultMintParams_CreateToken as DefaultMintParamsCreateToken_Enjin_v603,
} from '../../../types/generated/matrixEnjinV603'
import { CommonContext } from '../../types/contexts'
import { getOrCreateAccount } from '../../util/entities'
import {
    EfinityUtilityBatchCall,
    FuelTanksDispatchAndTouchCall,
    FuelTanksDispatchCall,
    MultiTokensBatchMintCall,
    MultiTokensForceMintCall,
    MultiTokensMintCall,
} from '../../../types/generated/calls'
import { accountsManager, nfTokenManager, collectionManager, attributeManager, nfTokenAttributeManager } from '../../utils/entityUtils';

import {
    Collection,
    ContractStandard
  } from '../../../../model';
  import {
    getNftTransferEntityId,
    getTokenTotalSupply,
    getTokenBurnedStatus,
    getEventType,
    getNftMetadata,
    nftMetadata
  } from '../../utils/common';


export function getCapType(cap: TokenCap) {
    if (cap.__kind === CapType.Supply) {
        return new TokenCapSupply({
            type: CapType.Supply,
            supply: cap.value,
        })
    }

    // TODO: add collapsing
    return new TokenCapSingleMint({
        type: CapType.SingleMint,
    })
}

export function getFreezeState(state: FreezeState_v500): FreezeState | null {
    switch (state.__kind) {
        case 'Permanent':
            return FreezeState.Permanent
        case 'Temporary':
            return FreezeState.Temporary
        case 'Never':
            return FreezeState.Never
        default:
            return null
    }
}

export function isTokenFrozen(freezeState: FreezeState | null | undefined): boolean {
    return freezeState === FreezeState.Permanent || freezeState === FreezeState.Temporary
}

async function getBehavior(
    ctx: CommonContext,
    behavior: TokenMarketBehavior
): Promise<TokenBehaviorIsCurrency | TokenBehaviorHasRoyalty> {
    if (behavior.__kind === TokenBehaviorType.IsCurrency) {
        return new TokenBehaviorIsCurrency({
            type: TokenBehaviorType.IsCurrency,
        })
    }

    const account = await getOrCreateAccount(ctx, behavior.value.beneficiary)
    return new TokenBehaviorHasRoyalty({
        type: TokenBehaviorType.HasRoyalty,
        royalty: new Royalty({
            beneficiary: account.id,
            percentage: behavior.value.percentage,
        }),
    })
}

// eslint-disable-next-line sonarjs/cognitive-complexity
async function getCallData(ctx: CommonContext, call: Call, event: ReturnType<typeof getEventData>) {
    if (call.name === 'EfinityUtility.batch') {
        const data = new EfinityUtilityBatchCall(ctx, call)

        if (data.isV601) {
            const { calls } = data.asV601
            const recipientCall = calls.find(
                (r) =>
                    r.__kind === 'MultiTokens' &&
                    r.value.__kind === 'mint' &&
                    r.value.collectionId === event.collectionId &&
                    r.value.params.tokenId === event.tokenId &&
                    r.value.params.__kind === 'CreateToken'
            )

            if (recipientCall) {
                const mintCall = recipientCall.value as MultiTokensCall_mint_v500
                const recipient = mintCall.recipient.value as Uint8Array
                const params = mintCall.params as DefaultMintParamsCreateToken_v500
                const cap = params.cap ? getCapType(params.cap) : null
                const behavior = params.behavior ? await getBehavior(ctx, params.behavior) : null
                const freezeState = params.freezeState ? getFreezeState(params.freezeState) : null
                let unitPrice: bigint | null = 10_000_000_000_000_000n
                let minimumBalance = 1n

                if (params.sufficiency.__kind === 'Sufficient') {
                    minimumBalance = (params.sufficiency as SufficiencyParam_Sufficient).minimumBalance
                    unitPrice = null
                }

                return {
                    recipient,
                    collectionId: mintCall.collectionId,
                    tokenId: params.tokenId,
                    initialSupply: params.initialSupply,
                    minimumBalance,
                    unitPrice,
                    cap,
                    behavior,
                    freezeState,
                    listingForbidden: params.listingForbidden ?? false,
                }
            }
        }

        if (data.isV600) {
            const { calls } = data.asV600
            const recipientCall = calls.find(
                (r) =>
                    r.__kind === 'MultiTokens' &&
                    r.value.__kind === 'mint' &&
                    r.value.collectionId === event.collectionId &&
                    r.value.params.tokenId === event.tokenId &&
                    r.value.params.__kind === 'CreateToken'
            )

            if (recipientCall) {
                const mintCall = recipientCall.value as MultiTokensCall_mint_v500
                const recipient = mintCall.recipient.value as Uint8Array
                const params = mintCall.params as DefaultMintParamsCreateToken_v500
                const cap = params.cap ? getCapType(params.cap) : null
                const behavior = params.behavior ? await getBehavior(ctx, params.behavior) : null
                const freezeState = params.freezeState ? getFreezeState(params.freezeState) : null
                let unitPrice: bigint | null = 10_000_000_000_000_000n
                let minimumBalance = 1n

                if (params.sufficiency.__kind === 'Sufficient') {
                    minimumBalance = (params.sufficiency as SufficiencyParam_Sufficient).minimumBalance
                    unitPrice = null
                }

                return {
                    recipient,
                    collectionId: mintCall.collectionId,
                    tokenId: params.tokenId,
                    initialSupply: params.initialSupply,
                    minimumBalance,
                    unitPrice,
                    cap,
                    behavior,
                    freezeState,
                    listingForbidden: params.listingForbidden ?? false,
                }
            }
        }

        if (data.isV500) {
            const { calls } = data.asV500
            const recipientCall = calls.find(
                (r) =>
                    r.__kind === 'MultiTokens' &&
                    r.value.__kind === 'mint' &&
                    r.value.collectionId === event.collectionId &&
                    r.value.params.tokenId === event.tokenId &&
                    r.value.params.__kind === 'CreateToken'
            )

            if (recipientCall) {
                const mintCall = recipientCall.value as MultiTokensCall_mint_v500
                const recipient = mintCall.recipient.value as Uint8Array
                const params = mintCall.params as DefaultMintParamsCreateToken_v500
                const cap = params.cap ? getCapType(params.cap) : null
                const behavior = params.behavior ? await getBehavior(ctx, params.behavior) : null
                const freezeState = params.freezeState ? getFreezeState(params.freezeState) : null
                let unitPrice: bigint | null = 10_000_000_000_000_000n
                let minimumBalance = 1n

                if (params.sufficiency.__kind === 'Sufficient') {
                    minimumBalance = (params.sufficiency as SufficiencyParam_Sufficient).minimumBalance
                    unitPrice = null
                }

                return {
                    recipient,
                    collectionId: mintCall.collectionId,
                    tokenId: params.tokenId,
                    initialSupply: params.initialSupply,
                    minimumBalance,
                    unitPrice,
                    cap,
                    behavior,
                    freezeState,
                    listingForbidden: params.listingForbidden ?? false,
                }
            }
        }
    }

    if (call.name === 'MultiTokens.batch_mint') {
        const data = new MultiTokensBatchMintCall(ctx, call)

        if (data.isMatrixEnjinV603) {
            const { collectionId, recipients } = data.asMatrixEnjinV603
            const recipientCall = recipients.find((r) => r.params.tokenId === event.tokenId && r.params.__kind === 'CreateToken')

            if (recipientCall) {
                const recipient = recipientCall.accountId
                const params = recipientCall.params as DefaultMintParamsCreateToken_Enjin_v603
                const cap = params.cap ? getCapType(params.cap) : null
                const behavior = params.behavior ? await getBehavior(ctx, params.behavior) : null
                const freezeState = params.freezeState ? getFreezeState(params.freezeState) : null
                let unitPrice: bigint | null = 10_000_000_000_000_000n
                let minimumBalance = 1n

                if (params.sufficiency.__kind === 'Sufficient') {
                    minimumBalance = (params.sufficiency as SufficiencyParam_Sufficient).minimumBalance
                    unitPrice = null
                }

                return {
                    recipient,
                    collectionId,
                    tokenId: params.tokenId,
                    initialSupply: params.initialSupply,
                    minimumBalance,
                    unitPrice,
                    cap,
                    behavior,
                    freezeState,
                    listingForbidden: params.listingForbidden ?? false,
                }
            }
        }

        if (data.isV600) {
            const { collectionId, recipients } = data.asV600
            const recipientCall = recipients.find((r) => r.params.tokenId === event.tokenId && r.params.__kind === 'CreateToken')

            if (recipientCall) {
                const recipient = recipientCall.accountId
                const params = recipientCall.params as DefaultMintParamsCreateToken_v600
                const cap = params.cap ? getCapType(params.cap) : null
                const behavior = params.behavior ? await getBehavior(ctx, params.behavior) : null
                const freezeState = params.freezeState ? getFreezeState(params.freezeState) : null
                let unitPrice: bigint | null = 10_000_000_000_000_000n
                let minimumBalance = 1n

                if (params.sufficiency.__kind === 'Sufficient') {
                    minimumBalance = (params.sufficiency as SufficiencyParam_Sufficient).minimumBalance
                    unitPrice = null
                }

                return {
                    recipient,
                    collectionId,
                    tokenId: params.tokenId,
                    initialSupply: params.initialSupply,
                    minimumBalance,
                    unitPrice,
                    cap,
                    behavior,
                    freezeState,
                    listingForbidden: params.listingForbidden ?? false,
                }
            }
        }

        if (data.isV500) {
            const { collectionId, recipients } = data.asV500
            const recipientCall = recipients.find((r) => r.params.tokenId === event.tokenId && r.params.__kind === 'CreateToken')

            if (recipientCall) {
                const recipient = recipientCall.accountId
                const params = recipientCall.params as DefaultMintParamsCreateToken_v500
                const cap = params.cap ? getCapType(params.cap) : null
                const behavior = params.behavior ? await getBehavior(ctx, params.behavior) : null
                const freezeState = params.freezeState ? getFreezeState(params.freezeState) : null
                let unitPrice: bigint | null = 10_000_000_000_000_000n
                let minimumBalance = 1n

                if (params.sufficiency.__kind === 'Sufficient') {
                    minimumBalance = (params.sufficiency as SufficiencyParam_Sufficient).minimumBalance
                    unitPrice = null
                }

                return {
                    recipient,
                    collectionId,
                    tokenId: params.tokenId,
                    initialSupply: params.initialSupply,
                    minimumBalance,
                    unitPrice,
                    cap,
                    behavior,
                    freezeState,
                    listingForbidden: params.listingForbidden ?? false,
                }
            }
        }

        throw new UnknownVersionError(data.constructor.name)
    }

    if (call.name === 'FuelTanks.dispatch_and_touch' || call.name === 'FuelTanks.dispatch') {
        let data: FuelTanksDispatchCall | FuelTanksDispatchAndTouchCall
        if (call.name === 'FuelTanks.dispatch') {
            data = new FuelTanksDispatchCall(ctx, call)
        } else {
            data = new FuelTanksDispatchAndTouchCall(ctx, call)
        }

        if (
            data.isMatrixEnjinV603 &&
            data.asMatrixEnjinV603.call.__kind === 'MultiTokens' &&
            (data.asMatrixEnjinV603.call.value.__kind === 'mint' || data.asMatrixEnjinV603.call.value.__kind === 'force_mint')
        ) {
            const { collectionId } = data.asMatrixEnjinV603.call.value
            const recipient = data.asMatrixEnjinV603.call.value.recipient.value as Uint8Array
            const params = data.asMatrixEnjinV603.call.value.params as DefaultMintParamsCreateToken_v500
            const cap = params.cap ? getCapType(params.cap) : null
            const behavior = params.behavior ? await getBehavior(ctx, params.behavior) : null
            const freezeState = params.freezeState ? getFreezeState(params.freezeState) : null
            let unitPrice: bigint | null = 10_000_000_000_000_000n
            let minimumBalance = 1n

            if (params.sufficiency.__kind === 'Sufficient') {
                minimumBalance = (params.sufficiency as SufficiencyParam_Sufficient).minimumBalance
                unitPrice = null
            }

            return {
                recipient,
                collectionId,
                tokenId: params.tokenId,
                initialSupply: params.initialSupply,
                minimumBalance,
                unitPrice,
                cap,
                behavior,
                freezeState,
                listingForbidden: params.listingForbidden ?? false,
            }
        }

        if (
            data.isMatrixEnjinV603 &&
            data.asMatrixEnjinV603.call.__kind === 'MultiTokens' &&
            data.asMatrixEnjinV603.call.value.__kind === 'batch_mint'
        ) {
            const { collectionId, recipients } = data.asMatrixEnjinV603.call.value
            const recipientCall = recipients.find((r) => r.params.tokenId === event.tokenId && r.params.__kind === 'CreateToken')

            if (recipientCall) {
                const recipient = recipientCall.accountId
                const params = recipientCall.params as DefaultMintParamsCreateToken_Enjin_v603
                const cap = params.cap ? getCapType(params.cap) : null
                const behavior = params.behavior ? await getBehavior(ctx, params.behavior) : null
                const freezeState = params.freezeState ? getFreezeState(params.freezeState) : null
                let unitPrice: bigint | null = 10_000_000_000_000_000n
                let minimumBalance = 1n

                if (params.sufficiency.__kind === 'Sufficient') {
                    minimumBalance = (params.sufficiency as SufficiencyParam_Sufficient).minimumBalance
                    unitPrice = null
                }

                return {
                    recipient,
                    collectionId,
                    tokenId: params.tokenId,
                    initialSupply: params.initialSupply,
                    minimumBalance,
                    unitPrice,
                    cap,
                    behavior,
                    freezeState,
                    listingForbidden: params.listingForbidden ?? false,
                }
            }
        }

        throw new UnknownVersionError(data.constructor.name)
    }

    let data: MultiTokensMintCall | MultiTokensForceMintCall
    if (call.name === 'MultiTokens.force_mint') {
        data = new MultiTokensForceMintCall(ctx, call)
    } else {
        data = new MultiTokensMintCall(ctx, call)

        if (data.isV600) {
            const { collectionId } = data.asV600
            const recipient = data.asV600.recipient.value as Uint8Array
            const params = data.asV600.params as DefaultMintParamsCreateToken_v500
            const cap = params.cap ? getCapType(params.cap) : null
            const behavior = params.behavior ? await getBehavior(ctx, params.behavior) : null
            const freezeState = params.freezeState ? getFreezeState(params.freezeState) : null
            let unitPrice: bigint | null = 10_000_000_000_000_000n
            let minimumBalance = 1n

            if (params.sufficiency.__kind === 'Sufficient') {
                minimumBalance = (params.sufficiency as SufficiencyParam_Sufficient).minimumBalance
                unitPrice = null
            }

            return {
                recipient,
                collectionId,
                tokenId: params.tokenId,
                initialSupply: params.initialSupply,
                minimumBalance,
                unitPrice,
                cap,
                behavior,
                freezeState,
                listingForbidden: params.listingForbidden ?? false,
            }
        }

        if (data.isV500) {
            const { collectionId } = data.asV500
            const recipient = data.asV500.recipient.value as Uint8Array
            const params = data.asV500.params as DefaultMintParamsCreateToken_v500
            const cap = params.cap ? getCapType(params.cap) : null
            const behavior = params.behavior ? await getBehavior(ctx, params.behavior) : null
            const freezeState = params.freezeState ? getFreezeState(params.freezeState) : null
            let unitPrice: bigint | null = 10_000_000_000_000_000n
            let minimumBalance = 1n

            if (params.sufficiency.__kind === 'Sufficient') {
                minimumBalance = (params.sufficiency as SufficiencyParam_Sufficient).minimumBalance
                unitPrice = null
            }

            return {
                recipient,
                collectionId,
                tokenId: params.tokenId,
                initialSupply: params.initialSupply,
                minimumBalance,
                unitPrice,
                cap,
                behavior,
                freezeState,
                listingForbidden: params.listingForbidden ?? false,
            }
        }
    }

    if (data.isMatrixEnjinV603) {
        const { collectionId } = data.asMatrixEnjinV603
        const recipient = data.asMatrixEnjinV603.recipient.value as Uint8Array
        const params = data.asMatrixEnjinV603.params as DefaultMintParamsCreateToken_v500
        const cap = params.cap ? getCapType(params.cap) : null
        const behavior = params.behavior ? await getBehavior(ctx, params.behavior) : null
        const freezeState = params.freezeState ? getFreezeState(params.freezeState) : null
        let unitPrice: bigint | null = 10_000_000_000_000_000n
        let minimumBalance = 1n

        if (params.sufficiency.__kind === 'Sufficient') {
            minimumBalance = (params.sufficiency as SufficiencyParam_Sufficient).minimumBalance
            unitPrice = null
        }

        return {
            recipient,
            collectionId,
            tokenId: params.tokenId,
            initialSupply: params.initialSupply,
            minimumBalance,
            unitPrice,
            cap,
            behavior,
            freezeState,
            listingForbidden: params.listingForbidden ?? false,
        }
    }

    throw new UnknownVersionError(data.constructor.name)
}

function getEventData(ctx: CommonContext, event: Event) {
    const data = new MultiTokensTokenCreatedEvent(ctx, event)

    if (data.isMatrixEnjinV603) {
        const { collectionId, tokenId, issuer, initialSupply } = data.asMatrixEnjinV603
        if (issuer.__kind === 'Signed') {
            return { collectionId, tokenId, issuer: issuer.value, initialSupply }
        }
        return { collectionId, tokenId, issuer: new Uint8Array(32).fill(0), initialSupply }
    }
    throw new UnknownVersionError(data.constructor.name)
}

function getEvent(
    item: EventItem<'MultiTokens.TokenCreated', { event: { args: true; call: true; extrinsic: true } }>,
    data: ReturnType<typeof getEventData>
) {
    return new EventModel({
        id: item.event.id,
        extrinsic: item.event.extrinsic?.id ? new Extrinsic({ id: item.event.extrinsic.id }) : null,
        collectionId: data.collectionId.toString(),
        tokenId: `${data.collectionId}-${data.tokenId}`,
        data: new MultiTokensTokenCreated({
            collectionId: data.collectionId,
            tokenId: data.tokenId,
            issuer: u8aToHex(data.issuer),
            initialSupply: data.initialSupply,
        }),
    })
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export async function tokenCreated(
    ctx: CommonContext,
    block: SubstrateBlock,
    item: EventItem<'MultiTokens.TokenCreated', { event: { args: true; call: true; extrinsic: true } }>,
    skipSave: boolean,
    chain: String
): Promise<EventModel | undefined> {
    const eventData = getEventData(ctx, item.event)

    if (item.event.call) {
        const [callData, collection, collectionUri] = await Promise.all([
            getCallData(ctx, item.event.call, eventData),
            ctx.store.findOneOrFail(Collection, {
                where: { id: eventData.collectionId.toString() },
            }),
            ctx.store.findOne(Attribute, {
                where: { key: 'uri', token: IsNull(), collection: { id: eventData.collectionId.toString() } },
            }),
        ])

        if (!eventData || !callData) return undefined

        // TODO: Far from ideal but we will do this only until we don't have the metadata processor
        let metadata: Metadata | null | undefined = null
        if (collectionUri && (collectionUri.value.includes('{id}.json') || collectionUri.value.includes('%7Bid%7D.json'))) {
            metadata = await new Metadata()
            if (metadata) {
                const collectionWithTokens = await ctx.store.findOneOrFail<Collection>(Collection, {
                    where: { id: eventData.collectionId.toString() },
                    relations: {
                        tokens: true,
                    },
                })

                const otherTokens: Token[] = collectionWithTokens.tokens.map((e) => {
                    e.metadata = metadata
                    return e
                })

                if (otherTokens.length > 0) {
                    ctx.store.save(otherTokens)
                }
            }
        }


        // Fetch or create accounts
        const to = '';
        const toAccount = await accountsManager.getOrCreate(to);

        // Fetch or create the collection
        const collection = await collectionManager.getOrCreate({
            id: eventData.collectionId.toString(),
            contractStandard: ContractStandard.ERC1155,
            blockHeight: block.height,
            blockTimestamp: block.timestamp
          });

        // Fetch or create the token
        const token = await nfTokenManager.getOrCreate({
            id: eventData.tokenId,
            image: '',
            contractAddress: eventData.collectionId.toString(), 
            owner: toAccount,
            contractStandard: ContractStandard.ERC1155,
            collection,
            blockHeight: block.height
        });

        if (!token.image) {
            // Update token amount and burned status
            token.amount = getTokenTotalSupply(
              token.amount,
              BigInt(amount.toString()),
              transferType
            );
            token.isBurned = false;
            
            const metadata = await getNftMetadata(token);
            token.name = metadata.name;
            token.image = metadata.image;
            
            if (metadata.attributes) {
              for (const a of metadata.attributes) {
                const attribute = await attributeManager.getOrCreate({
                  id: '',
                  collection,
                  type: a.trait_type,
                  value: a.value,
                  rarity: 0
                })
      
                const NfTokenAttribute = await nfTokenAttributeManager.getOrCreate({
                  id: '',
                  nftoken: token,
                  attribute: attribute
                })
      
                if (!token.attributes) {
                  token.attributes = [];
                }
      
                token.attributes.push(NfTokenAttribute)
              }
            }
        }

        nfTokenManager.add(token);

    }
    
    return undefined
}
