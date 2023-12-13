import { Collection, ContractStandard } from '../../../model';
import * as utils from '../utils';


export function createCollection({
  id,
  contractStandard,
  blockHeight,
  blockTimestamp
}: {
  id: string;
  contractStandard: ContractStandard;
  blockHeight: number;
  blockTimestamp: number;
}): Collection {
  const height = blockHeight;
  const timestamp = blockTimestamp;

  return new Collection({
    id,
    collectionType: contractStandard,
    createdAtBlock: BigInt(height),
    createdAt: new Date(timestamp)
  });
}
