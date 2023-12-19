import { SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { UnknownVersionError } from '../../../../common/errors'
import { MarketplaceListingCancelledEvent } from '../../../types/generated/events'
import {
    AccountTokenEvent,
    Event as EventModel,
    Extrinsic,
    Listing,
    ListingStatus,
    ListingStatusType,
    MarketplaceListingCancelled,
} from '../../../modelEnjin'
import { Event } from '../../../types/generated/support'
import { CommonContext } from '../../types/contexts'
import { getBestListing } from '../../util/entities'
import { syncCollectionStats } from '../../../../../jobs/collection-stats'
import * as utils from '../../utils';
import {
    Collection,
    ContractStandard
  } from '../../../../model';
import { encodeId, isAddressSS58 } from '../../../../common/tools'
import {
    getNftTransferEntityId
  } from '../../utils/common';

function getEventData(ctx: CommonContext, event: Event) {
    const data = new MarketplaceListingCancelledEvent(ctx, event)

    if (data.isMatrixEnjinV603) {
        return data.asMatrixEnjinV603
    }
    throw new UnknownVersionError(data.constructor.name)
}

function getEvent(
    item: EventItem<'Marketplace.ListingCancelled', { event: { args: true; extrinsic: true } }>,
    listing: Listing
): [EventModel, AccountTokenEvent] | undefined {
    const event = new EventModel({
        id: item.event.id,
        extrinsic: item.event.extrinsic?.id ? new Extrinsic({ id: item.event.extrinsic.id }) : null,
        collectionId: listing.makeAssetId.collection.id,
        tokenId: listing.makeAssetId.id,
        data: new MarketplaceListingCancelled({
            listing: listing.id,
        }),
    })

    return [
        event,
        new AccountTokenEvent({
            id: item.event.id,
            token: listing.makeAssetId,
            from: listing.seller,
            event,
        }),
    ]
}

export async function listingCancelled(
    ctx: CommonContext,
    block: SubstrateBlock,
    item: EventItem<'Marketplace.ListingCancelled', { event: { args: true; extrinsic: true } }>,
    skipSave: boolean,
    chain: string
): Promise<void> {
    const data = getEventData(ctx, item.event)
    if (!data) return undefined

    const listingId = Buffer.from(data.listingId).toString('hex')

    //return getEvent(item, listing)
    const list = await utils.entity.NftListManager.getOrCreate({
        id: getNftTransferEntityId(listingId, chain),
        amount: BigInt('0'),
        contractStandard: ContractStandard.ERC1155,
        isBatch: false,
        chain: chain,
        tokenId: BigInt('0'),    
        from: '',
        to: '',
        operator: '',
        contract: '',
        price: BigInt('0'),
        marketplace: '',
        transactionHash: '',
        blockHeight: 0,
        logId: '',
        blockTimestamp: 0
      });

    const cancelList = await utils.entity.NftCancelListManager.getOrCreate({
        amount: list.nfToken.amount,
        contractStandard: ContractStandard.ERC1155,
        isBatch: false,
        chain: chain,
        tokenId: BigInt(list.nfToken.id),
        from: list.from.id,
        to: '',
        operator: '',
        contract: list.nfToken.collection.id,
        price: list.price,
        marketplace: '',
        transactionHash: '',
        blockHeight: block.height,
        logId: block.id,
        blockTimestamp: block.timestamp
    });
}
