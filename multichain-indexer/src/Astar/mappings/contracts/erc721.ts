import { Contract as Erc721Contract } from '../../../abi/erc721';
import { Context } from '../../processor';
import * as utils from '../utils';

type LogType = {
  id: string;
  logIndex: number;
  transactionIndex: number;
  address: string;
  data: string;
  transactionHash: string;
  topics: string[];
  block: {
      id: string; 
      hash: string;
      height: number;
      parentHash: string;
      timestamp: number;
  };
  transaction?: {
      //... whatever properties this has
  } | undefined;
}

export function getContractErc721({
  ctx,
  contractAddress,
  blockHeight
}: {
  ctx: Context;
  contractAddress: string;
  blockHeight: number;
}): Erc721Contract {
  return new Erc721Contract(
    { _chain: ctx._chain, block: { height: blockHeight } },
    contractAddress
  );
}
