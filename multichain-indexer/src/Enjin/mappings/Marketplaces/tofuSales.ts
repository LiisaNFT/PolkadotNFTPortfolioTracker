import * as ethers from 'ethers'
import {ABI_JSON} from '../../../abi/moonbeamSeascape.abi'
import * as tofu from '../../../abi/astarTofu';
import { ContractStandard } from '../../../model';
import * as utils from '../utils';
import {Log, Transaction} from '../../processor'


export async function handleTofuSales(transaction: Transaction, chain: string): Promise<void> {
  
  const operator = '';
  let f = tofu.functions['run'].decode(transaction.input);
  
  if (f) {
    const sale = await utils.entity.NftSaleManager.getOrCreate({
      amount: f[0].bundle[0].amount,
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