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
    for (const log of block.logs) {
        let decodedEvent = null;
        switch (log.topics[0]) {
          /**
           * ===================================================================
           */
          case erc721.events['Transfer'].topic:
            try {
              decodedEvent = erc721.events['Transfer'].decode(log);
              accountsManager.addPrefetchItemId([
                decodedEvent.from,
                decodedEvent.to
              ]);
              nfTokenManager.addPrefetchItemId(
                getTokenEntityId(
                  log.address.toString(),
                  decodedEvent.tokenId.toString()
                )
              );
              collectionManager.addPrefetchItemId(
                log.address.toString()
              );
            } catch (err) {}

            break;
          /**
           * ===================================================================
           */
          case erc1155.events['TransferBatch'].topic:
            decodedEvent = erc1155.events['TransferBatch'].decode(log);
            accountsManager.addPrefetchItemId([
              decodedEvent.operator,
              decodedEvent.from,
              decodedEvent.to
            ]);
            nfTokenManager.addPrefetchItemId(
              decodedEvent.ids.map((id) =>
                getTokenEntityId(
                  log.address.toString(),
                  id.toString()
                )
              )
            );
            collectionManager.addPrefetchItemId(
              log.address.toString()
            );
            break;
          /**
           * ===================================================================
           */
          case erc1155.events['TransferSingle'].topic:
            decodedEvent = erc1155.events['TransferSingle'].decode(log);
            accountsManager.addPrefetchItemId([
              decodedEvent.operator,
              decodedEvent.from,
              decodedEvent.to
            ]);
            nfTokenManager.addPrefetchItemId(
              getTokenEntityId(
                log.address.toString(),
                decodedEvent.id.toString()
              )
            );
            collectionManager.addPrefetchItemId(
              log.address.toString()
            );
            break;
          /**
           * ===================================================================
           */
          case erc1155.events['URI'].topic:
            decodedEvent = erc1155.events['URI'].decode(
              log
            );
            nfTokenManager.addPrefetchItemId(
              getTokenEntityId(
                log.address.toString(),
                decodedEvent.id.toString()
              )
            );
            break;

          default:
        }
    }
  }
  await accountsManager.prefetchEntities();
  await nfTokenManager.prefetchEntities({
    currentOwner: true,
    collection: true
  });
}
