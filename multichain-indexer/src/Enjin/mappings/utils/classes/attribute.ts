import {
  NfToken,
  NfTokenAttribute,
  Attribute,
  Collection
} from '../../../../model';
import { createAttribute } from '../../Attribute';
import { getTokenEntityId } from '../common';
import { EntitiesManager } from './common';


export class AttributeManager extends EntitiesManager<Attribute> {
  constructor(entity: typeof Attribute) {
    super({ entity });
  }

  async getOrCreate({
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
  }): Promise<Attribute> {
    if (!this.context) throw new Error('context is not defined');

    const AttributeEntityId = getTokenEntityId(collection.id, type.concat(value));
    let attribute = await this.get(AttributeEntityId);

    if (!attribute) {
      attribute = createAttribute({
        id: AttributeEntityId,
        collection,
        type,
        value,
        rarity
      });
    }
    this.add(attribute);

    return attribute;     
  }
}
