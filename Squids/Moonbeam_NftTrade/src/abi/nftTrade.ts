import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './nftTrade.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
}

export const functions = {
    arrayLimit: new Func<[], {}, bigint>(
        abi, '0xb4ae641c'
    ),
    array_limit: new Func<[], {}, bigint>(
        abi, '0xce0f42f1'
    ),
    claimTokens: new Func<[_token: string], {_token: string}, []>(
        abi, '0xdf8de3e7'
    ),
    currentFee: new Func<[_customer: string], {_customer: string}, bigint>(
        abi, '0x591552da'
    ),
    ethFee: new Func<[], {}, bigint>(
        abi, '0x4cf1115d'
    ),
    feeReceiver: new Func<[], {}, string>(
        abi, '0xb3f00674'
    ),
    multisendToken: new Func<[tokenAddress: string, userAddresses: Array<string>, amountsOrIds: Array<bigint>], {tokenAddress: string, userAddresses: Array<string>, amountsOrIds: Array<bigint>}, []>(
        abi, '0x0b66f3f5'
    ),
    onERC1155BatchReceived: new Func<[_: string, _: string, _: Array<bigint>, _: Array<bigint>, _: string], {}, string>(
        abi, '0xbc197c81'
    ),
    onERC1155Received: new Func<[_: string, _: string, _: bigint, _: bigint, _: string], {}, string>(
        abi, '0xf23a6e61'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    send1155To721Ids: new Func<[erc721Addresses: Array<string>, erc721Ids: Array<bigint>, tokenIds: Array<bigint>, amounts: Array<bigint>, tokenAddress: string], {erc721Addresses: Array<string>, erc721Ids: Array<bigint>, tokenIds: Array<bigint>, amounts: Array<bigint>, tokenAddress: string}, []>(
        abi, '0xef634157'
    ),
    send1155ToAddresses: new Func<[userAddresses: Array<string>, tokenIds: Array<bigint>, amounts: Array<bigint>, tokenAddress: string], {userAddresses: Array<string>, tokenIds: Array<bigint>, amounts: Array<bigint>, tokenAddress: string}, []>(
        abi, '0x93703d9a'
    ),
    send721Or20To721Ids: new Func<[erc721Addresses: Array<string>, receiverIds: Array<bigint>, amountsOrIds: Array<bigint>, tokenAddress: string], {erc721Addresses: Array<string>, receiverIds: Array<bigint>, amountsOrIds: Array<bigint>, tokenAddress: string}, []>(
        abi, '0x18dc0c8c'
    ),
    setEthFee: new Func<[f: bigint], {f: bigint}, []>(
        abi, '0x3f6738a9'
    ),
    setFeeReceiver: new Func<[a: string], {a: string}, []>(
        abi, '0xefdcd974'
    ),
    supportsInterface: new Func<[interfaceId: string], {interfaceId: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
}

export class Contract extends ContractBase {

    arrayLimit(): Promise<bigint> {
        return this.eth_call(functions.arrayLimit, [])
    }

    array_limit(): Promise<bigint> {
        return this.eth_call(functions.array_limit, [])
    }

    currentFee(_customer: string): Promise<bigint> {
        return this.eth_call(functions.currentFee, [_customer])
    }

    ethFee(): Promise<bigint> {
        return this.eth_call(functions.ethFee, [])
    }

    feeReceiver(): Promise<string> {
        return this.eth_call(functions.feeReceiver, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    supportsInterface(interfaceId: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [interfaceId])
    }
}
