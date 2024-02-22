import { NfToken, Attribute, NfTokenAttribute } from '../../../model';

export function createNfTokenAttribute({
  id,
  nftoken,
  attribute
}: {
  id: string;
  nftoken: NfToken;
  attribute: Attribute;
}): NfTokenAttribute {

  return new NfTokenAttribute({
    id: id,
    nftoken: nftoken,
    attribute: attribute
  });
}


