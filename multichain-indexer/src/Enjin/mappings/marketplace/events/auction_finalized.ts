import { SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { u8aToHex } from '@polkadot/util'
import { UnknownVersionError } from '../../../../common/errors'
import { MarketplaceAuctionFinalizedEvent } from '../../../types/generated/events'
import {
    Account,
    AccountTokenEvent,
    Event as EventModel,
    Extrinsic,
    Listing,
    MarketplaceAuctionFinalized,
} from '../../../modelEnjin'
import { CommonContext } from '../../types/contexts'
import { Event } from '../../../types/generated/support'
import * as utils from '../../utils';
import {
    Collection,
    ContractStandard
  } from '../../../../model';
import {
    getNftTransferEntityId
  } from '../../utils/common';

function getEventData(ctx: CommonContext, event: Event) {
    const data = new MarketplaceAuctionFinalizedEvent(ctx, event)

    if (data.isMatrixEnjinV603) {
        const { listingId, winningBid, protocolFee, royalty } = data.asMatrixEnjinV603
        return { listingId, winningBid, protocolFee, royalty }
    }
    throw new UnknownVersionError(data.constructor.name)
}

function getEvent(
    item: EventItem<'Marketplace.AuctionFinalized', { event: { args: true; extrinsic: true } }>,
    data: ReturnType<typeof getEventData>,
    listing: Listing
): [EventModel, AccountTokenEvent] | undefined {
    const event = new EventModel({
        id: item.event.id,
        extrinsic: item.event.extrinsic?.id ? new Extrinsic({ id: item.event.extrinsic.id }) : null,
        collectionId: listing.makeAssetId.collection.id,
        tokenId: listing.makeAssetId.id,
        data: new MarketplaceAuctionFinalized({
            listing: listing.id,
            winningBid: data.winningBid ? `${listing.id}-${u8aToHex(data.winningBid.bidder)}-${data.winningBid.price}` : null,
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
            to: data.winningBid?.bidder ? new Account({ id: u8aToHex(data.winningBid.bidder) }) : null,
            event,
        }),
    ]
}

export async function auctionFinalized(
    ctx: CommonContext,
    block: SubstrateBlock,
    item: EventItem<'Marketplace.AuctionFinalized', { event: { args: true; extrinsic: true } }>,
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
    
    if (data.winningBid) {
        const sale = await utils.entity.NftSaleManager.getOrCreate({
            amount: BigInt('1'),
            contractStandard: ContractStandard.ERC1155,
            isBatch: false,
            chain: chain,
            tokenId: BigInt(list.nfToken.id),
            from: list.from.id,
            to: data.winningBid.bidder.toString(),
            operator: '',
            contract: list.nfToken.collection.id,
            price: data.winningBid.price,
            marketplace: '',
            transactionHash: '',
            blockHeight: block.height,
            logId: listingId,
            blockTimestamp: block.timestamp
          });
    }
}
