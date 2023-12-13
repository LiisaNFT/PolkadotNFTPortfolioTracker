import * as ethers from 'ethers'
import {ABI_JSON} from '../../../abi/moonbeamSeascape.abi'
import * as Seascape from '../../../abi/moonbeamSeascape';
import { ContractStandard } from '../../../model';
import * as utils from '../utils';
import {Log, Transaction} from '../../processor'


export async function handleSeascapeListings(transaction: Transaction, chain: string): Promise<void> {
  
  const operator = '';
  let f = Seascape.functions['sell'].decode(transaction.input);

  const sale = await utils.entity.NftListManager.getOrCreate({
    amount: BigInt('1'),
    contractStandard: ContractStandard.ERC721,
    isBatch: false,
    chain: chain,
    tokenId: f[0],
    from: transaction.from,
    to: '',
    operator,
    contract: f[2],
    price: f[1],
    marketplace: 'Seascape',
    transactionHash: transaction.hash,
    blockHeight: transaction.block.height,
    logId: transaction.id,
    blockTimestamp: transaction.block.timestamp
  });

}