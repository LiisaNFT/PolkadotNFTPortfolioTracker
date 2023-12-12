import { NfToken, UriUpdateAction } from '../../../../model';
import { createUriUpdateActions } from '../../uriUpdateActions';
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

export class UriUpdateActionsManager extends EntitiesManager<UriUpdateAction> {
  constructor(entity: typeof UriUpdateAction) {
    super({ entity });
  }

  async getOrCreate(
    id: string,
    token: NfToken,
    newValue: string | null,
    oldValue: string | null,
    log: LogType
  ): Promise<UriUpdateAction> {
    if (!this.context) throw new Error('context is not defined');
    let uriUpdateAction = await this.get(id);

    if (!uriUpdateAction) {
      uriUpdateAction = createUriUpdateActions({
        id,
        token,
        newValue,
        oldValue,
        log
      });
    }

    this.add(uriUpdateAction);

    return uriUpdateAction;
  }
}
