import { Contract as Erc721Contract } from '../../../abi/erc721';
import { Context } from '../../processor';

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
