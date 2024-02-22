import { Buffer } from 'buffer'
import { SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { u8aToHex } from '@polkadot/util'
import { UnknownVersionError } from '../../../../common/errors'
import { MarketplaceListingCreatedEvent } from '../../../types/generated/events'
import {
    Account,
    AccountTokenEvent,
    Event as EventModel,
    Extrinsic,
    MarketplaceListingCreated,
    Token,
} from '../../../modelEnjin'
import { Event } from '../../../types/generated/support'
import { CommonContext } from '../../types/contexts'
import * as utils from '../../utils';
import {
    ContractStandard
  } from '../../../../model';
import { encodeId, isAddressSS58 } from '../../../../common/tools'

function getEventData(ctx: CommonContext, event: Event) {
    const data = new MarketplaceListingCreatedEvent(ctx, event)

    if (data.isMatrixEnjinV603) {
        return data.asMatrixEnjinV603
    }
    throw new UnknownVersionError(data.constructor.name)
}

function getEvent(
    item: EventItem<'Marketplace.ListingCreated', { event: { args: true; extrinsic: true } }>,
    data: ReturnType<typeof getEventData>
): [EventModel, AccountTokenEvent] | undefined {
    const event = new EventModel({
        id: item.event.id,
        extrinsic: item.event.extrinsic?.id ? new Extrinsic({ id: item.event.extrinsic.id }) : null,
        collectionId: data.listing.makeAssetId.collectionId.toString(),
        tokenId: `${data.listing.makeAssetId.collectionId}-${data.listing.makeAssetId.tokenId}`,
        data: new MarketplaceListingCreated({
            listing: Buffer.from(data.listingId).toString('hex'),
        }),
    })

    return [
        event,
        new AccountTokenEvent({
            id: item.event.id,
            token: new Token({ id: `${data.listing.makeAssetId.collectionId}-${data.listing.makeAssetId.tokenId}` }),
            from: new Account({ id: u8aToHex(data.listing.seller) }),
            event,
        }),
    ]
}

export async function listingCreated(
    ctx: CommonContext,
    block: SubstrateBlock,
    item: EventItem<'Marketplace.ListingCreated', { event: { args: true; extrinsic: true } }>,
    skipSave = false,
    chain: string
): Promise<void> {
    const data = getEventData(ctx, item.event)
    if (!data) return undefined


    const listing = await utils.entity.NftListManager.getOrCreate({
        id: '',
        amount: data.listing.amount,
        contractStandard: ContractStandard.ERC1155,
        isBatch: false,
        chain: chain,
        tokenId: data.listing.makeAssetId.collectionId,
        from: isAddressSS58(data.listing.seller) ? encodeId(data.listing.seller) : '',
        to: '',
        operator: '',
        contract: data.listing.makeAssetId.collectionId.toString(),
        price: data.listing.price,
        marketplace: '',
        transactionHash: '',
        blockHeight: block.height,
        logId: data.listingId.toString(),
        blockTimestamp: block.timestamp
      });
}
