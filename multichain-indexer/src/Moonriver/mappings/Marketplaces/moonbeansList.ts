import * as ethers from 'ethers'
import {ABI_JSON} from '../../../abi/moonbeamSeascape.abi'
import * as Moonbeans from '../../../abi/moonriverMoonbeans';
import { ContractStandard } from '../../../model';
import * as utils from '../utils';
import {Log, Transaction} from '../../processor'


export async function handleMoonbeansListings(transaction: Transaction, chain: string): Promise<void> {
  
  const operator = '';
  let f = Moonbeans.functions['listToken'].decode(transaction.input);

  const sale = await utils.entity.NftListManager.getOrCreate({
    amount: BigInt('1'),
    contractStandard: ContractStandard.ERC721,
    isBatch: false,
    chain: chain,
    tokenId: f[1],
    from: transaction.from,
    to: '',
    operator,
    contract: f[0],
    price: f[2],
    marketplace: 'Moonbeans',
    transactionHash: transaction.hash,
    blockHeight: transaction.block.height,
    logId: transaction.id,
    blockTimestamp: transaction.block.timestamp
  });

}