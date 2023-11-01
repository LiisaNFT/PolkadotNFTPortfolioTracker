import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './moonbeamSeascape.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Buy: new LogEvent<([saleId: bigint, tokenId: bigint, buyer: string, price: bigint, tipsFee: bigint, currency: string] & {saleId: bigint, tokenId: bigint, buyer: string, price: bigint, tipsFee: bigint, currency: string})>(
        abi, '0x34b043e0e9e31d679baae1d9bb0ef92f0306c1b72cceef34737a29742f22609d'
    ),
    CancelSell: new LogEvent<([saleId: bigint, tokenId: bigint] & {saleId: bigint, tokenId: bigint})>(
        abi, '0x6da7243e8c7c719f32cb07e82d4ab33d9dbe147ea975c53b7d43a31fc745b14c'
    ),
    NftReceived: new LogEvent<([operator: string, from: string, tokenId: bigint, data: string] & {operator: string, from: string, tokenId: bigint, data: string})>(
        abi, '0x0895c277367ff99b8c0dec875f3149fc2c82df592f63ca6f0747ac2095169087'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    Sell: new LogEvent<([saleId: bigint, tokenId: bigint, nft: string, currency: string, seller: string, buyer: string, startTime: bigint, price: bigint] & {saleId: bigint, tokenId: bigint, nft: string, currency: string, seller: string, buyer: string, startTime: bigint, price: bigint})>(
        abi, '0x478275d8b67a791d16edb57e0de694972e1bc0bf837e363b432bd73fa1cfcee9'
    ),
}

export const functions = {
    addSupportedCurrency: new Func<[_currencyAddress: string], {_currencyAddress: string}, []>(
        abi, '0x044cc426'
    ),
    addSupportedNft: new Func<[_nftAddress: string], {_nftAddress: string}, []>(
        abi, '0x2eab0374'
    ),
    buy: new Func<[_tokenId: bigint, _nftAddress: string, _currency: string, _price: bigint], {_tokenId: bigint, _nftAddress: string, _currency: string, _price: bigint}, []>(
        abi, '0x0afc7bf4'
    ),
    cancelSell: new Func<[_tokenId: bigint, _nftAddress: string], {_tokenId: bigint, _nftAddress: string}, []>(
        abi, '0xadbfdd70'
    ),
    enableSales: new Func<[_salesEnabled: boolean], {_salesEnabled: boolean}, []>(
        abi, '0x0b3cbb44'
    ),
    feeRate: new Func<[], {}, bigint>(
        abi, '0x978bbdb9'
    ),
    getSales: new Func<[_tokenId: bigint, _nftAddress: string], {_tokenId: bigint, _nftAddress: string}, ([id: bigint, tokenId: bigint, nft: string, currency: string, seller: string, buyer: string, startTime: bigint, price: bigint, status: number] & {id: bigint, tokenId: bigint, nft: string, currency: string, seller: string, buyer: string, startTime: bigint, price: bigint, status: number})>(
        abi, '0xffa1a44b'
    ),
    getSalesAmount: new Func<[], {}, bigint>(
        abi, '0x0d9262e1'
    ),
    getSalesPrice: new Func<[_tokenId: bigint, _nftAddress: string], {_tokenId: bigint, _nftAddress: string}, bigint>(
        abi, '0x3fe893d6'
    ),
    onERC721Received: new Func<[operator: string, from: string, tokenId: bigint, data: string], {operator: string, from: string, tokenId: bigint, data: string}, string>(
        abi, '0x150b7a02'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    removeSupportedCurrency: new Func<[_currencyAddress: string], {_currencyAddress: string}, []>(
        abi, '0xf8f2d60e'
    ),
    removeSupportedNft: new Func<[_nftAddress: string], {_nftAddress: string}, []>(
        abi, '0x8b4c3d79'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    salesAmount: new Func<[], {}, bigint>(
        abi, '0x5748966c'
    ),
    salesEnabled: new Func<[], {}, boolean>(
        abi, '0xc84ad9a5'
    ),
    sell: new Func<[_tokenId: bigint, _price: bigint, _nftAddress: string, _currency: string], {_tokenId: bigint, _price: bigint, _nftAddress: string, _currency: string}, bigint>(
        abi, '0x4f8f0218'
    ),
    setFeeRate: new Func<[_rate: bigint], {_rate: bigint}, []>(
        abi, '0x45596e2e'
    ),
    setFeeReceiver: new Func<[_walletAddress: string], {_walletAddress: string}, []>(
        abi, '0xefdcd974'
    ),
    supportedCurrency: new Func<[_: string], {}, boolean>(
        abi, '0x3d0cc799'
    ),
    supportedNft: new Func<[_: string], {}, boolean>(
        abi, '0xff2a047a'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
}

export class Contract extends ContractBase {

    feeRate(): Promise<bigint> {
        return this.eth_call(functions.feeRate, [])
    }

    getSales(_tokenId: bigint, _nftAddress: string): Promise<([id: bigint, tokenId: bigint, nft: string, currency: string, seller: string, buyer: string, startTime: bigint, price: bigint, status: number] & {id: bigint, tokenId: bigint, nft: string, currency: string, seller: string, buyer: string, startTime: bigint, price: bigint, status: number})> {
        return this.eth_call(functions.getSales, [_tokenId, _nftAddress])
    }

    getSalesAmount(): Promise<bigint> {
        return this.eth_call(functions.getSalesAmount, [])
    }

    getSalesPrice(_tokenId: bigint, _nftAddress: string): Promise<bigint> {
        return this.eth_call(functions.getSalesPrice, [_tokenId, _nftAddress])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    salesAmount(): Promise<bigint> {
        return this.eth_call(functions.salesAmount, [])
    }

    salesEnabled(): Promise<boolean> {
        return this.eth_call(functions.salesEnabled, [])
    }

    supportedCurrency(arg0: string): Promise<boolean> {
        return this.eth_call(functions.supportedCurrency, [arg0])
    }

    supportedNft(arg0: string): Promise<boolean> {
        return this.eth_call(functions.supportedNft, [arg0])
    }
}
