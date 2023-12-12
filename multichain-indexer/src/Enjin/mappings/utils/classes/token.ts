import {
  Account,
  Collection,
  ContractStandard,
  NfToken
} from '../../../../model';
import { createNfToken } from '../../tokens';
import { getTokenEntityId } from '../common';
import { EntitiesManager } from './common';
import { getTokenDetails } from '../../tokens/utils';


export class NfTokenManager extends EntitiesManager<NfToken> {
  constructor(entity: typeof NfToken) {
    super({ entity });
  }

  async getOrCreate({
    id,
    image,
    contractAddress,
    contractStandard,
    owner,
    collection,
    blockHeight
  }: {
    id: bigint;
    image: string;
    contractAddress: string;
    contractStandard: ContractStandard;
    owner: Account;
    collection: Collection;
    blockHeight: number;
  }): Promise<NfToken> {
    if (!this.context) throw new Error('context is not defined');

    const tokenEntityId = getTokenEntityId(contractAddress, id.toString());
    let token = await this.get(tokenEntityId, {
      currentOwner: true,
      collection: true
    });

    if (!token || (token && (!token.name || !token.symbol))) {
      token = await createNfToken({
        id: tokenEntityId,
        image: image,
        nativeId: id,
        ctx: this.context,
        contractAddress,
        contractStandard,
        owner,
        collection: collection,
        blockHeight
      });
    }

    this.add(token);

    return token;
  }
}
