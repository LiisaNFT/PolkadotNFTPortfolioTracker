import * as erc721 from '../../../../abi/erc721';
import { ContractStandard } from '../../../../model';
import * as utils from '../../utils';
import { Log } from '../../../processor'


export async function handleErc721Transfer(log: Log, chain  : string): Promise<void> {
  
  const operator = '';

  const { from, to, tokenId } = erc721.events['Transfer'].decode({data: log.data, topics: log.topics});

  const transfer = await utils.entity.nftTransferManager.getOrCreate({
    amount: BigInt('1'),
    isBatch: false,
    contractStandard: ContractStandard.ERC721,
    chain: chain,
    tokenId,
    from,
    to,
    operator,
    contract: log.address,
    price: BigInt('0'),
    marketplace: '',
    transactionHash: log.transactionHash,
    blockHeight: log.block.height,
    logId: log.id,
    blockTimestamp: log.block.timestamp
  });

}