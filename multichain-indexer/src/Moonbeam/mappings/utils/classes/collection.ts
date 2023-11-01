import {
  Collection,
  ContractStandard
} from '../../../../model';
import { createCollection } from '../../collections';
import { EntitiesManager } from './common';

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

export class CollectionManager extends EntitiesManager<Collection> {
  constructor(entity: typeof Collection) {
    super({ entity });
  }

  async getOrCreate({
    id,
    contractStandard,
    blockHeight,
    blockTimestamp
  }: {
    id: string;
    contractStandard: ContractStandard;
    blockHeight: number;
    blockTimestamp: number;
  }): Promise<Collection> {
    if (!this.context) throw new Error('context is not defined');

    let collection = await this.get(id);

    if (!collection) {
      collection = createCollection({
        id,
        contractStandard,
        blockHeight,
        blockTimestamp
      });
    }
    this.add(collection);

    return collection;
  }
}
