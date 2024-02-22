import { u8aToHex } from '@polkadot/util'
import { SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { UnknownVersionError } from '../../../../common/errors'
import { MultiTokensTransferredEvent } from '../../../types/generated/events'
import { CommonContext } from '../../types/contexts'
import { Event } from '../../../types/generated/support'
import {
    ContractStandard
  } from '../../../../model';
import * as utils from '../../utils';

function getEventData(ctx: CommonContext, event: Event) {
    const data = new MultiTokensTransferredEvent(ctx, event)

    if (data.isMatrixEnjinV603) {
        return data.asMatrixEnjinV603
    }
    throw new UnknownVersionError(data.constructor.name)
}


export async function transferred(
    ctx: CommonContext,
    block: SubstrateBlock,
    item: EventItem<'MultiTokens.Transferred', { event: { args: true; extrinsic: true } }>,
    skipSave: boolean,
    chain: string
): Promise<void> {
    const data = getEventData(ctx, item.event)
    if (!data) return undefined


    const fromAddress = u8aToHex(data.from)
    const toAddress = u8aToHex(data.to)

    const transfer = await utils.entity.nftTransferManager.getOrCreate({
        amount: data.amount,
        isBatch: false,
        contractStandard: ContractStandard.ERC1155,
        chain,
        tokenId: data.tokenId,
        from: fromAddress,
        to: toAddress,
        contract: data.collectionId.toString(),
        price: BigInt('0'),
        marketplace: '',
        transactionHash: '',
        blockHeight: block.height,
        logId: '',
        blockTimestamp: block.timestamp
      });
}
