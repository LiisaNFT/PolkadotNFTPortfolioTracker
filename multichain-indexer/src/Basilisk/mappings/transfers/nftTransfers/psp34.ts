
import {
    ContractStandard
  } from '../../../../model';
import * as utils from '../../utils';


export async function handlePsp34Transfer(
    contract: string,
    blockHeight: number,
    tokenId: bigint,
    from: string,
    to: string,
    timestamp: number,
    chain: string
): Promise<void> {

    const transfer = await utils.entity.nftTransferManager.getOrCreate({
        amount: BigInt('1'),
        isBatch: false,
        contractStandard: ContractStandard.PSP34,
        chain,
        tokenId: tokenId,
        from: from,
        to: to,
        contract: contract,
        price: BigInt('0'),
        marketplace: '',
        transactionHash: '',
        blockHeight: blockHeight,
        logId: '',
        blockTimestamp: timestamp
      });
}
