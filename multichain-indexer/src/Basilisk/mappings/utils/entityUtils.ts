import * as entityManagerClasses from './classes';
import { Context } from '../../processor';
import * as erc721 from '../../../abi/erc721';
import * as erc1155 from '../../../abi/erc1155';
import { getTokenEntityId } from './common';
import {
  Account,
  Collection,
  NfToken,
  NftEvent,
  UriUpdateAction,
  Attribute,
  NfTokenAttribute
} from '../../../model';
import * as psp34_inkv4 from "../../../abi/psp34_inkv4";
import * as ss58 from "@subsquid/ss58";

const CONTRACT_ADDRESS_SS58 = "XnrLUQucQvzp5kaaWLG9Q3LbZw5DPwpGn69B5YcywSWVr5w";
const SS58_PREFIX = ss58.decode(CONTRACT_ADDRESS_SS58).prefix;

function convertToBigInt(tokenId: number | bigint | Uint8Array): bigint {
  if (typeof tokenId === 'bigint') {
      return tokenId;
  } else if (typeof tokenId === 'number') {
      return BigInt(tokenId);
  } else if (tokenId instanceof Uint8Array) {
      // Assuming tokenId is a big-endian Uint8Array
      let hex = Array.from(tokenId).map(b => b.toString(16).padStart(2, '0')).join('');
      return BigInt('0x' + hex);
  } else {
      throw new TypeError("tokenId is of an unrecognized type");
  }
}

export function initAllEntityManagers(ctx: Context): void {
  accountsManager.init(ctx);
  collectionManager.init(ctx);
  nfTokenManager.init(ctx);
  uriUpdateActionsManager.init(ctx);
  nftTransferManager.init(ctx);
  attributeManager.init(ctx);
  nfTokenAttributeManager.init(ctx);
  NftSaleManager.init(ctx);
  NftListManager.init(ctx);
  NftCancelListManager.init(ctx);
}

export async function saveAllEntities(): Promise<void> {
  await accountsManager.saveAll();
  await collectionManager.saveAll();
  await nfTokenManager.saveAll();
  await uriUpdateActionsManager.saveAll();
  await nftTransferManager.saveAll();
  await attributeManager.saveAll();
  await nfTokenAttributeManager.saveAll();
  await NftSaleManager.saveAll();
  await NftListManager.saveAll();
  await NftCancelListManager.saveAll();
}

export const accountsManager = new entityManagerClasses.AccountsManager(Account);
export const nfTokenManager = new entityManagerClasses.NfTokenManager(NfToken);
export const uriUpdateActionsManager = new entityManagerClasses.UriUpdateActionsManager(UriUpdateAction);
export const nftTransferManager = new entityManagerClasses.NftTransferManager(NftEvent);
export const collectionManager = new entityManagerClasses.CollectionManager(Collection);
export const attributeManager = new entityManagerClasses.AttributeManager(Attribute);
export const nfTokenAttributeManager = new entityManagerClasses.NfTokenAttributeManager(NfTokenAttribute);
export const NftSaleManager = new entityManagerClasses.NftSaleManager(NftEvent);
export const NftListManager = new entityManagerClasses.NftListManager(NftEvent);
export const NftCancelListManager = new entityManagerClasses.NftCancelListManager(NftEvent);



export async function prefetchEntities(ctx: Context): Promise<void> {
  for (const block of ctx.blocks) {
    for (const item of block.items) {
        if (item.name === "Contracts.ContractEmitted") {
          let event;

          try {
              event = psp34_inkv4.decodeEvent(item.event.args.data);
          } catch {
              continue;
          }

          if (event.__kind === "Transfer") {
              const contractAddress = ss58.codec(SS58_PREFIX).encode(
                  Buffer.from(item.event.args.contract.replace("0x", ""), "hex")
              );
              const tokenId = convertToBigInt(event.id.value);
              const from = event.from ? ss58.codec(SS58_PREFIX).encode(event.from).toString() : '';
              const to = event.to ? ss58.codec(SS58_PREFIX).encode(event.to).toString() : '';

              accountsManager.addPrefetchItemId([
                from,
                to
              ]);
              nfTokenManager.addPrefetchItemId(
                getTokenEntityId(
                  contractAddress,
                  tokenId.toString()
                )
              );
              collectionManager.addPrefetchItemId(
                contractAddress
              );
          }
        }
    }
  }
  await accountsManager.prefetchEntities();
  await nfTokenManager.prefetchEntities({
    currentOwner: true,
    collection: true
  });
}
