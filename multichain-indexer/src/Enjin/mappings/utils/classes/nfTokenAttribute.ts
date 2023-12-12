import {
  NfToken,
  NfTokenAttribute,
  Attribute
} from '../../../../model';
import { createNfTokenAttribute } from '../../nfTokenAttribute';
import { getTokenEntityId } from '../common';
import { EntitiesManager } from './common';


export class NfTokenAttributeManager extends EntitiesManager<NfTokenAttribute> {
  constructor(entity: typeof NfTokenAttribute) {
    super({ entity });
  }

  async getOrCreate({
    id,
    nftoken,
    attribute
  }: {
    id: string;
    nftoken: NfToken;
    attribute: Attribute;
  }): Promise<NfTokenAttribute> {
    if (!this.context) throw new Error('context is not defined');

    const NfTokenAttributeEntityId = getTokenEntityId(nftoken.id, attribute.id);
    let nftTokenAttribute = await this.get(NfTokenAttributeEntityId);

    if (!nftTokenAttribute) {
      nftTokenAttribute = createNfTokenAttribute({
        id: NfTokenAttributeEntityId,
        nftoken,
        attribute
      });
    }
    this.add(nftTokenAttribute);

    return nftTokenAttribute;     
  }
}
