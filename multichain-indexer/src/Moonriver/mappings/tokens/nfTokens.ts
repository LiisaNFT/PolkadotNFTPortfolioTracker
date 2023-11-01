import { ContractStandard, NfToken, Account, Collection } from '../../../model';
import { Context } from '../../processor';
import { getTokenDetails } from './utils';


export async function createNfToken({
  id,
  image,
  nativeId,
  contractAddress,
  contractStandard,
  owner,
  ctx,
  collection,
  blockHeight
}: {
  id: string;
  image: string;
  nativeId: bigint;
  contractAddress: string;
  contractStandard: ContractStandard;
  owner: Account;
  ctx: Context;
  collection: Collection;
  blockHeight: number;
}): Promise<NfToken> {
  const { name, symbol, uri } = await getTokenDetails({
    tokenId: nativeId,
    contractAddress,
    contractStandard,
    ctx,
    blockHeight
  });

  return new NfToken({
    nativeId: nativeId.toString(),
    image: image,
    currentOwner: owner,
    isBurned: false,
    amount: BigInt(0),
    id,
    name,
    symbol,
    uri,
    collection
  });
}


