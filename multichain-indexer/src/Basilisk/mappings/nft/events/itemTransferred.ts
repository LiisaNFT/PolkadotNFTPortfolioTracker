import { SubstrateBlock } from '@subsquid/substrate-processor'
import { unwrap } from '../utils/extract';
import {
  getTransferTokenEvent
} from '../getters';
import {
    ContractStandard
  } from '../../../../model';
import {
  Context,
} from '../utils/types';
import * as utils from '../../utils';



export async function nftTransferred(
    ctx: Context,
    block: SubstrateBlock,
    chain: string
): Promise<void> {
    const event = unwrap(ctx, getTransferTokenEvent);

    if (!event) return undefined

    const transfer = await utils.entity.nftTransferManager.getOrCreate({
        amount: BigInt('1'),
        isBatch: false,
        contractStandard: ContractStandard.UNIQUES,
        chain,
        tokenId: BigInt(`${event.sn}`),
        from: event.caller,
        to: event.to,
        contract: event.collectionId.toString(),
        price: BigInt('0'),
        marketplace: '',
        transactionHash: '',
        blockHeight: block.height,
        logId: '',
        blockTimestamp: block.timestamp
      });
}