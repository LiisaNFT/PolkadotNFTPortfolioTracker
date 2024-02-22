import * as tofu from '../../../abi/moonbeamTofu';
import { ContractStandard } from '../../../model';
import * as utils from '../utils';
import { Transaction } from '../../processor'


export async function handleTofuSales(transaction: Transaction, chain: string): Promise<void> {
  
  const operator = '';
  let f = tofu.functions['run'].decode(transaction.input);
  
  if (f) {
    const sale = await utils.entity.NftSaleManager.getOrCreate({
      amount: BigInt('1'),
      contractStandard: ContractStandard.ERC721,
      isBatch: false,
      chain: chain,
      tokenId: f[0].bundle[0].tokenId,
      from: f[0].user,
      to: transaction.from,
      operator,
      contract: f[0].bundle[0].token,
      price: f[0].price,
      marketplace: 'Tofu',
      transactionHash: transaction.hash,
      blockHeight: transaction.block.height,
      logId: transaction.id,
      blockTimestamp: transaction.block.timestamp
    });
  } else {
  }

}