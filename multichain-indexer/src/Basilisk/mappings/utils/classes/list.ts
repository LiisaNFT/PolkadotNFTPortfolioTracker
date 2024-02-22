import {
  ContractStandard,
  NftEvent,
  EventType,
} from '../../../../model';
import { accountsManager, nfTokenManager, collectionManager, attributeManager, nfTokenAttributeManager } from '../entityUtils';
import { EntitiesManager } from './common';
import {
  getNftTransferEntityId,
  getTokenTotalSupply,
  getNftMetadata,
} from '../common';


export class NftListManager extends EntitiesManager<NftEvent> {
  constructor(entity: typeof NftEvent) {
    super({ entity });
  }

  async getOrCreate({
    operator,
    amount,
    isBatch,
    contractStandard,
    chain,
    tokenId,
    from,
    to,
    contract,
    price,
    marketplace,
    transactionHash,
    blockHeight,
    logId,
    blockTimestamp,
    id
  }: {
    operator?: string;
    amount: bigint;
    isBatch: boolean;
    contractStandard: ContractStandard;
    chain: string;
    tokenId: bigint;
    from: string;
    to: string;
    contract: string;
    price: bigint;
    marketplace: string;
    transactionHash: string;
    blockHeight: number;
    logId: string;
    blockTimestamp: number;
    id: string;
  }): Promise<NftEvent> {

    let list = await this.get(id);
    
    if (!list) {
      
      // Fetch or create accounts
      const fromAccount = await accountsManager.getOrCreate(from);
      const toAccount = await accountsManager.getOrCreate(to);
      
      // Fetch or create the collection
      const collection = await collectionManager.getOrCreate({
        id: contract,
        contractStandard,
        blockHeight,
        blockTimestamp
      });

      // Fetch or create the token
      const token = await nfTokenManager.getOrCreate({
        id: tokenId,
        image: '',
        contractAddress: contract, 
        owner: toAccount,
        contractStandard,
        collection,
        blockHeight
      });

      // Determine the transfer type
      const transferType = EventType.LIST;

      if (!token.image) {
        // Update token amount and burned status
        token.amount = getTokenTotalSupply(
          token.amount,
          BigInt(amount.toString()),
          transferType
        );
        token.isBurned = false;
        
        const metadata = await getNftMetadata(token);
        token.name = metadata.name;
        token.image = metadata.image;
        
        if (metadata.attributes) {
          for (const a of metadata.attributes) {
            const attribute = await attributeManager.getOrCreate({
              id: '',
              collection,
              type: a.trait_type,
              value: a.value,
              rarity: 0
            })

            const NfTokenAttribute = await nfTokenAttributeManager.getOrCreate({
              id: '',
              nftoken: token,
              attribute: attribute
            })

            if (!token.attributes) {
              token.attributes = [];
            }

            token.attributes.push(NfTokenAttribute)
          }
        }
      }
      
      nfTokenManager.add(token);

      // Create the sale instance
      list = new NftEvent({
        id: getNftTransferEntityId(logId, chain),
        blockNumber: blockHeight,
        timestamp: new Date(blockTimestamp),
        txnHash: transactionHash,
        nfToken: token,  
        eventType: transferType,
        from: fromAccount,
        to: toAccount,
        marketplace: marketplace, 
        price: price,
        chain: chain
      });
    }
    this.add(list);

    return list;
  }
}
