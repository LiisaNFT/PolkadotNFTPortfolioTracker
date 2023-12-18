import { SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { u8aToHex } from '@polkadot/util'
import { UnknownVersionError } from '../../../src/common/errors'
import { MarketplaceListingFilledEvent } from '../../../types/generated/events'
import {
    Account,
    AccountTokenEvent,
    Event as EventModel,
    Extrinsic,
    FixedPriceState,
    Listing,
    ListingSale,
    ListingStatus,
    ListingStatusType,
    ListingType,
    MarketplaceListingFilled,
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
    const data = new MarketplaceListingFilledEvent(ctx, event)

    if (data.isMatrixEnjinV603) {
        return data.asMatrixEnjinV603
    }
    throw new UnknownVersionError(data.constructor.name)
}

function getEvent(
    item: EventItem<'Marketplace.ListingFilled', { event: { args: true; extrinsic: true } }>,
    data: ReturnType<typeof getEventData>,
    listing: Listing
): [EventModel, AccountTokenEvent] | undefined {
    const event = new EventModel({
        id: item.event.id,
        extrinsic: item.event.extrinsic?.id ? new Extrinsic({ id: item.event.extrinsic.id }) : null,
        collectionId: listing.makeAssetId.collection.id,
        tokenId: listing.makeAssetId.id,
        data: new MarketplaceListingFilled({
            listing: listing.id,
            buyer: u8aToHex(data.buyer),
            amountFilled: data.amountFilled,
            amountRemaining: data.amountRemaining,
            protocolFee: data.protocolFee,
            royalty: data.royalty,
        }),
    })

    return [
        event,
        new AccountTokenEvent({
            id: item.event.id,
            token: listing.makeAssetId,
            from: listing.seller,
            to: new Account({ id: u8aToHex(data.buyer) }),
            event,
        }),
    ]
}

export async function listingFilled(
    ctx: CommonContext,
    block: SubstrateBlock,
    item: EventItem<'Marketplace.ListingFilled', { event: { args: true; extrinsic: true } }>,
    skipSave: boolean,
    chain: string
): Promise<void> {
    const data = getEventData(ctx, item.event)
    if (!data) return undefined

    const listingId = Buffer.from(data.listingId).toString('hex')

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

    const sale = await utils.entity.NftSaleManager.getOrCreate({
        amount: data.amountFilled,
        contractStandard: ContractStandard.ERC1155,
        isBatch: false,
        chain: chain,
        tokenId: BigInt(list.nfToken.id),
        from: list.from.id,
        to: data.buyer.toString(),
        operator: '',
        contract: list.nfToken.collection.id,
        price: list.price,
        marketplace: '',
        transactionHash: '',
        blockHeight: block.height,
        logId: listingId,
        blockTimestamp: block.timestamp
      });

}
