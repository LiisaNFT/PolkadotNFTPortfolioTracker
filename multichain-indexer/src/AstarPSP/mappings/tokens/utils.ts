import { ContractStandard } from '../../../model';
import { Context } from '../../processor';
import { addTimeout } from '@subsquid/util-timeout';
import { TokenDetails } from '../../../common/types';
import * as contracts from '../contracts';

function clearNullBytes(rawStr: string): string {
  /**
   * We need replace null byte in string value to prevent error:
   * "QueryFailedError: invalid byte sequence for encoding \"UTF8\": 0x00\n    at PostgresQueryRunner.query ..."
   */
  return rawStr ? rawStr.replace(/\0/g, '') : rawStr;
}

function getDecoratedCallResult(rawValue: string | null): string | null {
  const decoratedValue: string | null = rawValue;

  if (!rawValue || typeof rawValue !== 'string') return null;

  const regex = new RegExp(/^\d{10}\.[\d|\w]{4}$/);

  /**
   * This test is required for contract call results
   * like this - "0006648936.1ec7" which must be saved as null
   */
  if (regex.test(rawValue)) return null;

  return decoratedValue ? clearNullBytes(decoratedValue) : decoratedValue;
}

export async function getTokenDetails({
  tokenId = null,
  contractAddress,
  contractStandard,
  ctx,
  blockHeight
}: {
  tokenId?: bigint | null;
  contractAddress: string;
  contractStandard: ContractStandard;
  ctx: Context;
  blockHeight: number;
}): Promise<TokenDetails> {
  let contractInst = null;
  switch (contractStandard) {
    case ContractStandard.ERC721:
      contractInst = contracts.getContractErc721({
        contractAddress,
        ctx,
        blockHeight
      });
      break;
    case ContractStandard.ERC1155:
      contractInst = contracts.getContractErc1155({
        contractAddress,
        ctx,
        blockHeight
      });
      break;
    // potentially handle PSP34 or other standards here
    default:
  }

  let name: string | null = null;
  let symbol: string | null = null;
  let decimals: number | null = null;
  let uri: string | null = null;

  // Proceed only if contractInst is not null
  if (contractInst) {
    try {
      name = 'name' in contractInst ? await addTimeout(contractInst.name(), 2000) : null;
    } catch (e) {
      console.log(e);
    }
    try {
      symbol = 'symbol' in contractInst ? await addTimeout(contractInst.symbol(), 2000) : null;
    } catch (e) {
      console.log(e);
    }
    try {
      if ('uri' in contractInst && tokenId) {
        uri = clearNullBytes(await addTimeout(contractInst.uri(tokenId), 2000));
      } else if ('tokenURI' in contractInst && tokenId) {
        uri = clearNullBytes(await addTimeout(contractInst.tokenURI(tokenId), 2000));
      }
    } catch (e) {
      console.log(e);
    }
    // Additional logic for handling other properties if contractInst is not null
  } else {
    // contractInst is null, so name, symbol, decimals, and uri remain null
    console.log("contractInst is null, unable to retrieve token details.");
  }

  return {
    symbol: getDecoratedCallResult(symbol),
    name: getDecoratedCallResult(name),
    decimals,
    uri
  };
}


