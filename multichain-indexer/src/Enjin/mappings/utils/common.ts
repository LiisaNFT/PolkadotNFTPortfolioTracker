import { EventType, NfToken } from '../../../model';
import axios from 'axios';

export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

type Attribute = {
  trait_type: string;
  value: string;
};

export type nftMetadata = {
  attributes: Attribute[];
  name: string;
  image: string;
};

async function getMetadata(url: string) {

  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`Error retrieving file from IPFS gateway (${response.status} ${response.statusText})`);
    }

    const metadata = response.data;
    return metadata;
  } catch (err) {
    console.error('Error getting file from IPFS:', err);
    throw err;
  }
}

export function getTokenEntityId(address: string, tokenId?: string): string {
  return `${address.substring(0, 6)}-${address.substring(
    address.length - 6,
    address.length
  )}${tokenId ? `-${tokenId}` : ''}`;
}

export function getNftTransferEntityId(
  eventId: string,
  tokenId: string
): string {
  return `${eventId}-${tokenId}`;
}

export function getAccountTransferEntityId(
  accountId: string,
  transferId: string
): string {
  return `${accountId}-${transferId}`;
}

export function getAccountFTokenBalanceEntityId(
  accountId: string,
  tokenId: string
): string {
  return `${accountId}-${tokenId}`;
}

export function isMint(from: string, to: string): boolean {
  return from === EMPTY_ADDRESS && to !== EMPTY_ADDRESS;
}

export function isBurn(from: string, to: string): boolean {
  return to === EMPTY_ADDRESS && from !== EMPTY_ADDRESS;
}

export function getEventType(from: string, to: string): EventType {
  if (isMint(from, to)) {
    return EventType.MINT;
  }
  if (isBurn(from, to)) {
    return EventType.BURN;
  }

  return EventType.TRANSFER;
}

export function getTokenTotalSupply(
  currentAmount: bigint,
  newAmount: bigint,
  txType: EventType
): bigint {
  let newValue = currentAmount;

  switch (txType) {
    case EventType.MINT:
      newValue = BigInt(currentAmount) + BigInt(newAmount);

      break;
    case EventType.BURN:
      newValue = BigInt(currentAmount) - BigInt(newAmount);

      break;
    case EventType.TRANSFER:
      /**
       * In case squid missed MINT event for particular token, we use fists occurred TRANSFER amount for initialization
       * of token total supply. It's more workaround cases when squid is starting not from first block.
       */
      if (currentAmount === BigInt(0)) {
        newValue = newAmount;
      }
      break;
    default:
  }

  return newValue >= BigInt(0) ? newValue : BigInt(0);
}

export function getTokenBurnedStatus(currentAmount: bigint): boolean {
  return currentAmount <= BigInt(0);
}

export function* splitIntoBatches<T>(
  list: T[],
  maxBatchSize: number
): Generator<T[]> {
  if (list.length <= maxBatchSize) {
    yield list;
  } else {
    let offset = 0;
    while (list.length - offset > maxBatchSize) {
      yield list.slice(offset, offset + maxBatchSize);
      offset += maxBatchSize;
    }
    yield list.slice(offset);
  }
}

export async function getNftMetadata(nftToken: NfToken): Promise<nftMetadata> {
  let nftAttributes = [];
  let nftImage;
  let nftName;

  const URI = nftToken.uri;

  if (URI) {
    let finalURL;
  
    // Check what URI looks like 
    if (URI.startsWith('ipfs://')) {
        const cid = URI.replace('ipfs://', '');
        finalURL = `https://ipfs.io/ipfs/${cid}`;
    } else if (URI.startsWith('data:application/json;base64,')) {
      const base64Content = URI.replace('data:application/json;base64,', '');
      try {
          const decodedContent = Buffer.from(base64Content, 'base64').toString('utf8');
          const parsedContent = JSON.parse(decodedContent);
          console.log('Decoded Base64 Content:', decodedContent);

          nftAttributes = parsedContent.attributes || [];
          nftImage = parsedContent.image;
          nftName = parsedContent.name;
          
          //console.log('Decoded Base64 Content:', decodedContent);
      } catch (error) {
          console.error('Error decoding Base64 content:', error);
      }
    } else {
      finalURL = URI;
    }
  
    if (finalURL) {
        console.log('Final URL:', finalURL);
  
        const metadata = await getMetadata(finalURL);
  
        if (metadata && Object.keys(metadata).length > 0) {

          nftAttributes = metadata.attributes;
          nftImage = metadata.image;
          nftName = metadata.name;
  
          if (nftImage) {
  
              let imgSrc = nftImage; // Default to the provided image
              const lowerCaseImageUrl = nftImage.toLowerCase();
  
              if (lowerCaseImageUrl.startsWith('ipfs://')) {
                  nftImage = `https://ipfs.io/ipfs/${lowerCaseImageUrl.slice(7)}`;
              } else if (lowerCaseImageUrl.startsWith('https://ipfs.io/ipfs/')) {
                  nftImage = nftImage;
              } else if (/^Qm[a-zA-Z\d]{44}\/.+\.png$/.test(lowerCaseImageUrl) || 
                        /^Qm[a-zA-Z\d]{44}\/.+\.jpg$/.test(lowerCaseImageUrl) || 
                        /^Qm[a-zA-Z\d]{44}\/.+\.jpeg$/.test(lowerCaseImageUrl)) {
                  nftImage = `https://ipfs.io/ipfs/${imgSrc}`;
              } else if (lowerCaseImageUrl.endsWith('.png') || lowerCaseImageUrl.endsWith('.jpg') || lowerCaseImageUrl.endsWith('.jpeg')) {
                  if (lowerCaseImageUrl.startsWith('http')) {
                    nftImage = nftImage;
                  } else {
                    nftImage = `https://gateway.ipfs.io/ipfs/${imgSrc}`;
                  }
              }
  
          } else {
              // If the collection already exists, just add the collection.id to the nft
          }

        }
    }
  
  }

  return {
    attributes: nftAttributes,
    name: nftName,
    image: nftImage, 
  };
}



