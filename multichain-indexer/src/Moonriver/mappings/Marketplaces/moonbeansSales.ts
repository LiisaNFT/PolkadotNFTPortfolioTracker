import * as Moonbeans from '../../../abi/moonriverMoonbeans';
import { ContractStandard } from '../../../model';
import * as utils from '../utils';
import { Log } from '../../processor'


export async function handleMoonbeansSales(log: Log, chain  : string): Promise<void> {
  
  const operator = '';

  let e = Moonbeans.events['TokenPurchased'].decode(log);

  const sale = await utils.entity.NftSaleManager.getOrCreate({
    amount: BigInt('1'),
    contractStandard: ContractStandard.ERC721,
    isBatch: false,
    chain: chain,
    tokenId: e[4],
    from: e[0],
    to: e[1],
    operator,
    contract: e[3],
    price: e[4],
    marketplace: 'Moonbeans',
    transactionHash: log.transactionHash,
    blockHeight: log.block.height,
    logId: log.id,
    blockTimestamp: log.block.timestamp
  });

}