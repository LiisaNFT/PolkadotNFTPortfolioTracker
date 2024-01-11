import * as erc1155 from '../../../../abi/erc1155';
import * as utils from '../../utils';
import { ContractStandard} from '../../../../model';
import {Log, Transaction} from '../../../processor'


export async function handleErc1155TransferSingle(log: Log, chain: string): Promise<void> {

  const {
    operator,
    from,
    to,
    id: tokenId,
    value: amount
  } = erc1155.events['TransferSingle'].decode({data: log.data, topics: log.topics});

  const transfer = await utils.entity.nftTransferManager.getOrCreate({
    amount,
    isBatch: false,
    contractStandard: ContractStandard.ERC1155,
    chain,
    tokenId,
    from,
    to,
    contract: log.address,
    price: BigInt('0'),
    marketplace: '',
    transactionHash: log.transactionHash,
    blockHeight: log.block.height,
    logId: log.id,
    blockTimestamp: log.block.timestamp
  });
}

export async function handleErc1155TransferBatch(log: Log, chain: string): Promise<void> {

  const [operator, from, to, ids, values] = erc1155.events['TransferBatch'].decode({data: log.data, topics: log.topics});

  for (let i = 0; i < ids.length; i++) {
    const transfer = await utils.entity.nftTransferManager.getOrCreate({
      amount: values[i],
      isBatch: true,
      contractStandard: ContractStandard.ERC1155,
      chain,
      tokenId: ids[i],
      from,
      to,
      contract: log.address,
      price: BigInt('0'),
      marketplace: '',
      transactionHash: log.transactionHash,
      blockHeight: log.block.height,
      logId: log.id,
      blockTimestamp: log.block.timestamp
    });
  }
}
