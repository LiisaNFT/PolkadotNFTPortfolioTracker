import { Attribute, Collection } from '../../../model';

export function createAttribute({
    id,
    collection,
    type,
    value,
    rarity
  }: {
    id: string;
    collection: Collection;
    type: string;
    value: string;
    rarity: number;
}): Attribute {

  return new Attribute({
    id: id,
    collection: collection,
    type: type,
    value: value,
    rarity: rarity
  });
}


