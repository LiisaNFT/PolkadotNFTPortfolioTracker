import * as ethers from 'ethers'
import {ABI_JSON} from '../../../abi/moonbeamSeascape.abi'
import * as Seascape from '../../../abi/moonbeamSeascape';
import { ContractStandard } from '../../../model';
import * as utils from '../utils';
import {Log, Transaction} from '../../processor'

export async function handleSeascapeCancelList(transaction: Transaction, chain  : string): Promise<void> {
  
  const operator = '';
  let f = Seascape.functions['cancelSell'].decode(transaction.input);

  const cancelList = await utils.entity.NftCancelListManager.getOrCreate({
    amount: BigInt('1'),
    contractStandard: ContractStandard.ERC721,
    isBatch: false,
    chain: chain,
    tokenId: f[0],
    from: '',
    to: transaction.from,
    operator,
    contract: f[1],
    price: BigInt('0'),
    marketplace: 'Seascape',
    transactionHash: transaction.hash,
    blockHeight: transaction.block.height,
    logId: transaction.id,
    blockTimestamp: transaction.block.timestamp
  });

}