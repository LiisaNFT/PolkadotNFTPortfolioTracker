import { SubstrateBlock } from '@subsquid/substrate-processor'
import { unwrap } from '../utils/extract';
import {
    ContractStandard
  } from '../../../../model';
import {
  Context,
} from '../utils/types';
import {
  getListTokenEvent
} from '../getters';
import * as utils from '../../utils';



export async function itemList(
  ctx: Context,
  block: SubstrateBlock,
  chain: string
): Promise<void> {
  console.log('itemList ctx:', ctx);
  const event = unwrap(ctx, getListTokenEvent);
  if (!event) return undefined

  const listing = await utils.entity.NftListManager.getOrCreate({
    id: '',
    amount: BigInt(1),
    contractStandard: ContractStandard.UNIQUES,
    isBatch: false,
    chain: chain,
    tokenId: BigInt(event.sn),
    from: event.caller.toString(),
    to: '',
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
