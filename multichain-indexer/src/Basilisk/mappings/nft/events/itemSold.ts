import { SubstrateBlock } from '@subsquid/substrate-processor'
import { unwrap } from '../utils/extract';
import {
    ContractStandard
  } from '../../../../model';
import {
  Context,
} from '../utils/types';
import {
  getBuyTokenEvent,
} from '../getters';
import * as utils from '../../utils';



export async function itemSold(
  ctx: Context,
  block: SubstrateBlock,
  chain: string
): Promise<void> {

  const event = unwrap(ctx, getBuyTokenEvent);
  if (!event) return undefined

  const sale = await utils.entity.NftSaleManager.getOrCreate({
      amount: BigInt(1),
      contractStandard: ContractStandard.UNIQUES,
      isBatch: false,
      chain: chain,
      tokenId: BigInt(event.sn),
      from: event.currentOwner.toString(),
      to: event.caller.toString(),
      operator: '',
      contract: event.collectionId.toString(),
      price: event.price !== undefined ? event.price : 0n,
      marketplace: 'KodaDot',
      transactionHash: '',
      blockHeight: block.height,
      logId: '',
      blockTimestamp: block.timestamp
    });

}