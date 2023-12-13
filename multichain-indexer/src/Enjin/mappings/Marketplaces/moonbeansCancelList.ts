import * as ethers from 'ethers'
import {ABI_JSON} from '../../../abi/moonbeamMoonbeans.abi'
import * as Moonbeans from '../../../abi/moonbeamMoonbeans';
import { ContractStandard } from '../../../model';
import * as utils from '../utils';
import {Log, Transaction} from '../../processor'

export async function handleMoonbeansCancelList(log: Log, chain  : string): Promise<void> {
  
  const operator = '';

  let e = Moonbeans.events['TradeCancelled'].decode(log);

  const sale = await utils.entity.NftCancelListManager.getOrCreate({
    amount: BigInt('1'),
    contractStandard: ContractStandard.ERC721,
    isBatch: false,
    chain: chain,
    tokenId: e[2],
    from: e[5],
    to: '',
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