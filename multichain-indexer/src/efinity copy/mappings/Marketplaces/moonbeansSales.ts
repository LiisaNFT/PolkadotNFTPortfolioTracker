import * as ethers from 'ethers'
import {ABI_JSON} from '../../../abi/moonbeamMoonbeans.abi'
import * as Moonbeans from '../../../abi/moonbeamMoonbeans';
import { ContractStandard } from '../../../model';
import * as utils from '../utils';
import {Log, Transaction} from '../../processor'


export async function handleMoonbeansSales(log: Log, chain  : string): Promise<void> {
  
  const operator = '';

  let e = Moonbeans.events['TradeAccepted'].decode(log);

  const sale = await utils.entity.NftSaleManager.getOrCreate({
    amount: BigInt('1'),
    contractStandard: ContractStandard.ERC721,
    isBatch: false,
    chain: chain,
    tokenId: e[2],
    from: e[5],
    to: e[6],
    operator,
    contract: e[1],
    price: e[4],
    marketplace: 'Moonbeans',
    transactionHash: log.transactionHash,
    blockHeight: log.block.height,
    logId: log.id,
    blockTimestamp: log.block.timestamp
  });

}