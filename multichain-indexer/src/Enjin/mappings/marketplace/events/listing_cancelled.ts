import { SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { UnknownVersionError } from '../../../../common/errors'
import { MarketplaceListingCancelledEvent } from '../../../types/generated/events'
import { Event } from '../../../types/generated/support'
import { CommonContext } from '../../types/contexts'
import * as utils from '../../utils';
import {
    ContractStandard
  } from '../../../../model';
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
