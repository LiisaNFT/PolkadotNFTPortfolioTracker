import { NfToken, UriUpdateAction } from '../../../model';
import * as utils from '../utils';
import * as erc1155 from '../../../abi/erc1155';
import { getTokenEntityId } from '../utils/common';

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

export function createUriUpdateActions({
  id,
  token,
  newValue,
  oldValue,
  log
}: {
  id: string;
  token: NfToken;
  newValue: string | null;
  oldValue: string | null;
  log: LogType;
}): UriUpdateAction {

  return new UriUpdateAction({
    id,
    token,
    newValue,
    oldValue,
    timestamp: new Date(log.block.timestamp),
    blockNumber: BigInt(log.block.height),
    txnHash: log.transactionHash 
  });
}

export async function handleErc1155UriChanged(log: LogType,): Promise<void> {

  const { id, value } = erc1155.events['URI'].decode(
    log
  );

  const token = await utils.entity.nfTokenManager.get(
    getTokenEntityId(log.address, id.toString()),
    {
      currentOwner: true,
      collection: true
    }
  );

  if (!token) throw new Error('Token is not existing.');

  const oldUriVal = token.uri || null;
  token.uri = value;

  await utils.entity.uriUpdateActionsManager.getOrCreate(
    id.toString(),
    token,
    value,
    oldUriVal,
    log
  );

  utils.entity.nfTokenManager.add(token);
}
