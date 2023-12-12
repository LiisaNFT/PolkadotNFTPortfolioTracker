import { getTokenEntityId } from './common';
import {
  accountsManager,
  nfTokenManager,
  uriUpdateActionsManager,
  nftTransferManager,
  collectionManager,
  initAllEntityManagers,
  saveAllEntities,
  prefetchEntities,
  NftSaleManager,
  NftListManager,
  NftCancelListManager
} from './entityUtils';

//import { blockContextManager } from './blockContextUtils';

export const entity = {
  accountsManager,
  nfTokenManager,
  nftTransferManager,
  uriUpdateActionsManager,
  collectionManager,
  initAllEntityManagers,
  saveAllEntities,
  prefetchEntities,
  NftSaleManager,
  NftListManager,
  NftCancelListManager
};
export const common = { getTokenEntityId };
