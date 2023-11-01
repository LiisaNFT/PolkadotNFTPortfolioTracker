import * as ethers from 'ethers'
import * as Seascape from '../../../abi/moonriverSeascape';
import { ContractStandard } from '../../../model';
import * as utils from '../utils';
import {Log, Transaction} from '../../processor'


export async function handleSeascapeListings(log: Log, chain: string): Promise<void> {
  
  const operator = '';
  let e = Seascape.events['Sell'].decode(log);

  const list = await utils.entity.NftListManager.getOrCreate({
    amount: BigInt('1'),
    contractStandard: ContractStandard.ERC721,
    isBatch: false,
    chain: chain,
    tokenId: e[1],
    from: e[4],
    to: e[5],
    operator,
    contract: e[2],
    price: e[7],
    marketplace: 'Seascape',
    transactionHash: log.transactionHash,
    blockHeight: log.block.height,
    logId: log.id,
    blockTimestamp: log.block.timestamp
  });

}