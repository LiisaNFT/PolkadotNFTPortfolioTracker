import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './moonbeamTofu.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    EvAuctionRefund: new LogEvent<([id: bigint, bidder: string, refund: bigint] & {id: bigint, bidder: string, refund: bigint})>(
        abi, '0xa48bcf3362c21033397c03b92fb367d1962ba13b5bde0dfe491f9d88abb59e3f'
    ),
    EvCouponSpent: new LogEvent<([id: bigint, couponId: bigint] & {id: bigint, couponId: bigint})>(
        abi, '0x6aa71aa6b7aa6036ace4e4ceefbab7d89c4afb7fcfa1a3680499d7b37d32c82f'
    ),
    EvInventoryUpdate: new LogEvent<([id: bigint, inventory: ([seller: string, buyer: string, currency: string, price: bigint, netPrice: bigint, deadline: bigint, kind: number, status: number] & {seller: string, buyer: string, currency: string, price: bigint, netPrice: bigint, deadline: bigint, kind: number, status: number})] & {id: bigint, inventory: ([seller: string, buyer: string, currency: string, price: bigint, netPrice: bigint, deadline: bigint, kind: number, status: number] & {seller: string, buyer: string, currency: string, price: bigint, netPrice: bigint, deadline: bigint, kind: number, status: number})})>(
        abi, '0x5beea7b3b87c573953fec05007114d17712e5775d364acc106d8da9e74849033'
    ),
    EvMarketSignerUpdate: new LogEvent<([addr: string, isRemoval: boolean] & {addr: string, isRemoval: boolean})>(
        abi, '0x90d56af4745c314d9b45054b55dc973378c558c1ad1554bccc70d39aa63a2cc5'
    ),
    EvSettingsUpdated: new LogEvent<[]>(
        abi, '0x6c06ac894de6b71964f14d152b6674a4465a9b5d3f9cf9f216b8e7ea61467519'
    ),
    EvSwapped: new LogEvent<([req: ([salt: string, creator: string, deadline: bigint, has: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>, wants: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>] & {salt: string, creator: string, deadline: bigint, has: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>, wants: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>}), signature: string, swapper: string] & {req: ([salt: string, creator: string, deadline: bigint, has: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>, wants: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>] & {salt: string, creator: string, deadline: bigint, has: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>, wants: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>}), signature: string, swapper: string})>(
        abi, '0x92060d15ec9a14885865b744d2efb1fff3cab53411058a530f51d480288a864c'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    Paused: new LogEvent<([account: string] & {account: string})>(
        abi, '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258'
    ),
    Unpaused: new LogEvent<([account: string] & {account: string})>(
        abi, '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa'
    ),
}

export const functions = {
    KIND_AUCTION: new Func<[], {}, number>(
        abi, '0x7234d8f2'
    ),
    KIND_BUY: new Func<[], {}, number>(
        abi, '0xe1784a02'
    ),
    KIND_SELL: new Func<[], {}, number>(
        abi, '0x25593ac2'
    ),
    OP_ACCEPT_AUCTION: new Func<[], {}, number>(
        abi, '0x7ae1ace0'
    ),
    OP_ACCEPT_BUY: new Func<[], {}, number>(
        abi, '0x11f0794c'
    ),
    OP_BID: new Func<[], {}, number>(
        abi, '0x81787a85'
    ),
    OP_BUY: new Func<[], {}, number>(
        abi, '0xeb374261'
    ),
    OP_CANCEL_BUY: new Func<[], {}, number>(
        abi, '0x9e57feb5'
    ),
    OP_COMPLETE_AUCTION: new Func<[], {}, number>(
        abi, '0x6acc65db'
    ),
    OP_COMPLETE_BUY: new Func<[], {}, number>(
        abi, '0xb50a2a55'
    ),
    OP_COMPLETE_SELL: new Func<[], {}, number>(
        abi, '0x8f18439e'
    ),
    OP_MAX: new Func<[], {}, number>(
        abi, '0xf0954160'
    ),
    OP_MIN: new Func<[], {}, number>(
        abi, '0x90c2b10e'
    ),
    OP_REJECT_BUY: new Func<[], {}, number>(
        abi, '0x1bb03ca9'
    ),
    RATE_BASE: new Func<[], {}, bigint>(
        abi, '0x0873c6ec'
    ),
    STATUS_CANCELLED: new Func<[], {}, number>(
        abi, '0x5a4e5a15'
    ),
    STATUS_DONE: new Func<[], {}, number>(
        abi, '0x740db280'
    ),
    STATUS_OPEN: new Func<[], {}, number>(
        abi, '0x24f8515b'
    ),
    TOKEN_1155: new Func<[], {}, number>(
        abi, '0xf0d250ba'
    ),
    TOKEN_721: new Func<[], {}, number>(
        abi, '0xc477be20'
    ),
    TOKEN_MINT: new Func<[], {}, number>(
        abi, '0x853ca41a'
    ),
    cancelBuys: new Func<[ids: Array<bigint>], {ids: Array<bigint>}, []>(
        abi, '0xc1c30e80'
    ),
    couponSpent: new Func<[_: bigint], {}, boolean>(
        abi, '0x3ed9ffb7'
    ),
    emergencyCancelAuction: new Func<[id: bigint, noBundle: boolean], {id: bigint, noBundle: boolean}, []>(
        abi, '0xe7d4a999'
    ),
    hasInv: new Func<[id: bigint], {id: bigint}, boolean>(
        abi, '0xf5116bc9'
    ),
    hasSignedIntention: new Func<[op: number], {op: number}, boolean>(
        abi, '0xac5e2cb1'
    ),
    inCaseMoneyGetsStuck: new Func<[to: string, currency: string, amount: bigint], {to: string, currency: string, amount: bigint}, []>(
        abi, '0x80bc688f'
    ),
    inventories: new Func<[_: bigint], {}, ([seller: string, buyer: string, currency: string, price: bigint, netPrice: bigint, deadline: bigint, kind: number, status: number] & {seller: string, buyer: string, currency: string, price: bigint, netPrice: bigint, deadline: bigint, kind: number, status: number})>(
        abi, '0xcd78ba01'
    ),
    inventoryTokenCounts: new Func<[_: bigint], {}, bigint>(
        abi, '0x5fd34298'
    ),
    inventoryTokens: new Func<[_: bigint, _: bigint], {}, ([token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string] & {token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string})>(
        abi, '0xb4533aad'
    ),
    isAuction: new Func<[id: bigint], {id: bigint}, boolean>(
        abi, '0x8704f2a3'
    ),
    isAuctionOpen: new Func<[id: bigint], {id: bigint}, boolean>(
        abi, '0x0ad48628'
    ),
    isBundleApproved: new Func<[invId: bigint, owner: string], {invId: bigint, owner: string}, boolean>(
        abi, '0xf4a33e0d'
    ),
    isBuy: new Func<[id: bigint], {id: bigint}, boolean>(
        abi, '0xa80d33fb'
    ),
    isBuyOpen: new Func<[id: bigint], {id: bigint}, boolean>(
        abi, '0xbdf52b45'
    ),
    isExpired: new Func<[id: bigint], {id: bigint}, boolean>(
        abi, '0xd9548e53'
    ),
    isSell: new Func<[id: bigint], {id: bigint}, boolean>(
        abi, '0x1b01e72c'
    ),
    isSignatureValid: new Func<[signature: string, hash: string, signer: string], {signature: string, hash: string, signer: string}, boolean>(
        abi, '0x781dc70a'
    ),
    isStatusOpen: new Func<[id: bigint], {id: bigint}, boolean>(
        abi, '0xee98ce91'
    ),
    marketSigners: new Func<[_: string], {}, boolean>(
        abi, '0x2bcd27df'
    ),
    minAuctionDuration: new Func<[], {}, bigint>(
        abi, '0x54134876'
    ),
    minAuctionIncrement: new Func<[], {}, bigint>(
        abi, '0x708d4d35'
    ),
    onERC1155BatchReceived: new Func<[operator: string, from: string, ids: Array<bigint>, values: Array<bigint>, data: string], {operator: string, from: string, ids: Array<bigint>, data: string}, string>(
        abi, '0xbc197c81'
    ),
    onERC1155Received: new Func<[operator: string, from: string, id: bigint, value: bigint, data: string], {operator: string, from: string, id: bigint, value: bigint, data: string}, string>(
        abi, '0xf23a6e61'
    ),
    onERC721Received: new Func<[operator: string, from: string, tokenId: bigint, data: string], {operator: string, from: string, tokenId: bigint, data: string}, string>(
        abi, '0x150b7a02'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    pause: new Func<[], {}, []>(
        abi, '0x8456cb59'
    ),
    paused: new Func<[], {}, boolean>(
        abi, '0x5c975abb'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    run: new Func<[intent: ([user: string, bundle: Array<([token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string] & {token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string})>, currency: string, price: bigint, deadline: bigint, salt: string, kind: number] & {user: string, bundle: Array<([token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string] & {token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string})>, currency: string, price: bigint, deadline: bigint, salt: string, kind: number}), detail: ([intentionHash: string, signer: string, txDeadline: bigint, salt: string, id: bigint, opcode: number, caller: string, currency: string, price: bigint, incentiveRate: bigint, settlement: ([coupons: Array<bigint>, feeRate: bigint, royaltyRate: bigint, buyerCashbackRate: bigint, feeAddress: string, royaltyAddress: string] & {coupons: Array<bigint>, feeRate: bigint, royaltyRate: bigint, buyerCashbackRate: bigint, feeAddress: string, royaltyAddress: string}), bundle: Array<([token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string] & {token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string})>, deadline: bigint] & {intentionHash: string, signer: string, txDeadline: bigint, salt: string, id: bigint, opcode: number, caller: string, currency: string, price: bigint, incentiveRate: bigint, settlement: ([coupons: Array<bigint>, feeRate: bigint, royaltyRate: bigint, buyerCashbackRate: bigint, feeAddress: string, royaltyAddress: string] & {coupons: Array<bigint>, feeRate: bigint, royaltyRate: bigint, buyerCashbackRate: bigint, feeAddress: string, royaltyAddress: string}), bundle: Array<([token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string] & {token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string})>, deadline: bigint}), sigIntent: string, sigDetail: string], {intent: ([user: string, bundle: Array<([token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string] & {token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string})>, currency: string, price: bigint, deadline: bigint, salt: string, kind: number] & {user: string, bundle: Array<([token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string] & {token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string})>, currency: string, price: bigint, deadline: bigint, salt: string, kind: number}), detail: ([intentionHash: string, signer: string, txDeadline: bigint, salt: string, id: bigint, opcode: number, caller: string, currency: string, price: bigint, incentiveRate: bigint, settlement: ([coupons: Array<bigint>, feeRate: bigint, royaltyRate: bigint, buyerCashbackRate: bigint, feeAddress: string, royaltyAddress: string] & {coupons: Array<bigint>, feeRate: bigint, royaltyRate: bigint, buyerCashbackRate: bigint, feeAddress: string, royaltyAddress: string}), bundle: Array<([token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string] & {token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string})>, deadline: bigint] & {intentionHash: string, signer: string, txDeadline: bigint, salt: string, id: bigint, opcode: number, caller: string, currency: string, price: bigint, incentiveRate: bigint, settlement: ([coupons: Array<bigint>, feeRate: bigint, royaltyRate: bigint, buyerCashbackRate: bigint, feeAddress: string, royaltyAddress: string] & {coupons: Array<bigint>, feeRate: bigint, royaltyRate: bigint, buyerCashbackRate: bigint, feeAddress: string, royaltyAddress: string}), bundle: Array<([token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string] & {token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string})>, deadline: bigint}), sigIntent: string, sigDetail: string}, []>(
        abi, '0xba847759'
    ),
    send: new Func<[to: string, tokens: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>], {to: string, tokens: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>}, []>(
        abi, '0xafd76a0b'
    ),
    supportsInterface: new Func<[interfaceId: string], {interfaceId: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
    swap: new Func<[req: ([salt: string, creator: string, deadline: bigint, has: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>, wants: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>] & {salt: string, creator: string, deadline: bigint, has: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>, wants: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>}), signature: string], {req: ([salt: string, creator: string, deadline: bigint, has: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>, wants: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>] & {salt: string, creator: string, deadline: bigint, has: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>, wants: Array<([token: string, tokenId: bigint] & {token: string, tokenId: bigint})>}), signature: string}, []>(
        abi, '0xe91274f3'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    unpause: new Func<[], {}, []>(
        abi, '0x3f4ba83a'
    ),
    updateSettings: new Func<[minAuctionIncrement_: bigint, minAuctionDuration_: bigint], {minAuctionIncrement_: bigint, minAuctionDuration_: bigint}, []>(
        abi, '0x015af8ee'
    ),
    updateSigner: new Func<[addr: string, remove: boolean], {addr: string, remove: boolean}, []>(
        abi, '0xf460590b'
    ),
    weth: new Func<[], {}, string>(
        abi, '0x3fc8cef3'
    ),
}

export class Contract extends ContractBase {

    KIND_AUCTION(): Promise<number> {
        return this.eth_call(functions.KIND_AUCTION, [])
    }

    KIND_BUY(): Promise<number> {
        return this.eth_call(functions.KIND_BUY, [])
    }

    KIND_SELL(): Promise<number> {
        return this.eth_call(functions.KIND_SELL, [])
    }

    OP_ACCEPT_AUCTION(): Promise<number> {
        return this.eth_call(functions.OP_ACCEPT_AUCTION, [])
    }

    OP_ACCEPT_BUY(): Promise<number> {
        return this.eth_call(functions.OP_ACCEPT_BUY, [])
    }

    OP_BID(): Promise<number> {
        return this.eth_call(functions.OP_BID, [])
    }

    OP_BUY(): Promise<number> {
        return this.eth_call(functions.OP_BUY, [])
    }

    OP_CANCEL_BUY(): Promise<number> {
        return this.eth_call(functions.OP_CANCEL_BUY, [])
    }

    OP_COMPLETE_AUCTION(): Promise<number> {
        return this.eth_call(functions.OP_COMPLETE_AUCTION, [])
    }

    OP_COMPLETE_BUY(): Promise<number> {
        return this.eth_call(functions.OP_COMPLETE_BUY, [])
    }

    OP_COMPLETE_SELL(): Promise<number> {
        return this.eth_call(functions.OP_COMPLETE_SELL, [])
    }

    OP_MAX(): Promise<number> {
        return this.eth_call(functions.OP_MAX, [])
    }

    OP_MIN(): Promise<number> {
        return this.eth_call(functions.OP_MIN, [])
    }

    OP_REJECT_BUY(): Promise<number> {
        return this.eth_call(functions.OP_REJECT_BUY, [])
    }

    RATE_BASE(): Promise<bigint> {
        return this.eth_call(functions.RATE_BASE, [])
    }

    STATUS_CANCELLED(): Promise<number> {
        return this.eth_call(functions.STATUS_CANCELLED, [])
    }

    STATUS_DONE(): Promise<number> {
        return this.eth_call(functions.STATUS_DONE, [])
    }

    STATUS_OPEN(): Promise<number> {
        return this.eth_call(functions.STATUS_OPEN, [])
    }

    TOKEN_1155(): Promise<number> {
        return this.eth_call(functions.TOKEN_1155, [])
    }

    TOKEN_721(): Promise<number> {
        return this.eth_call(functions.TOKEN_721, [])
    }

    TOKEN_MINT(): Promise<number> {
        return this.eth_call(functions.TOKEN_MINT, [])
    }

    couponSpent(arg0: bigint): Promise<boolean> {
        return this.eth_call(functions.couponSpent, [arg0])
    }

    hasInv(id: bigint): Promise<boolean> {
        return this.eth_call(functions.hasInv, [id])
    }

    hasSignedIntention(op: number): Promise<boolean> {
        return this.eth_call(functions.hasSignedIntention, [op])
    }

    inventories(arg0: bigint): Promise<([seller: string, buyer: string, currency: string, price: bigint, netPrice: bigint, deadline: bigint, kind: number, status: number] & {seller: string, buyer: string, currency: string, price: bigint, netPrice: bigint, deadline: bigint, kind: number, status: number})> {
        return this.eth_call(functions.inventories, [arg0])
    }

    inventoryTokenCounts(arg0: bigint): Promise<bigint> {
        return this.eth_call(functions.inventoryTokenCounts, [arg0])
    }

    inventoryTokens(arg0: bigint, arg1: bigint): Promise<([token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string] & {token: string, tokenId: bigint, amount: bigint, kind: number, mintData: string})> {
        return this.eth_call(functions.inventoryTokens, [arg0, arg1])
    }

    isAuction(id: bigint): Promise<boolean> {
        return this.eth_call(functions.isAuction, [id])
    }

    isAuctionOpen(id: bigint): Promise<boolean> {
        return this.eth_call(functions.isAuctionOpen, [id])
    }

    isBundleApproved(invId: bigint, owner: string): Promise<boolean> {
        return this.eth_call(functions.isBundleApproved, [invId, owner])
    }

    isBuy(id: bigint): Promise<boolean> {
        return this.eth_call(functions.isBuy, [id])
    }

    isBuyOpen(id: bigint): Promise<boolean> {
        return this.eth_call(functions.isBuyOpen, [id])
    }

    isExpired(id: bigint): Promise<boolean> {
        return this.eth_call(functions.isExpired, [id])
    }

    isSell(id: bigint): Promise<boolean> {
        return this.eth_call(functions.isSell, [id])
    }

    isSignatureValid(signature: string, hash: string, signer: string): Promise<boolean> {
        return this.eth_call(functions.isSignatureValid, [signature, hash, signer])
    }

    isStatusOpen(id: bigint): Promise<boolean> {
        return this.eth_call(functions.isStatusOpen, [id])
    }

    marketSigners(arg0: string): Promise<boolean> {
        return this.eth_call(functions.marketSigners, [arg0])
    }

    minAuctionDuration(): Promise<bigint> {
        return this.eth_call(functions.minAuctionDuration, [])
    }

    minAuctionIncrement(): Promise<bigint> {
        return this.eth_call(functions.minAuctionIncrement, [])
    }

    onERC1155BatchReceived(operator: string, from: string, ids: Array<bigint>, values: Array<bigint>, data: string): Promise<string> {
        return this.eth_call(functions.onERC1155BatchReceived, [operator, from, ids, values, data])
    }

    onERC1155Received(operator: string, from: string, id: bigint, value: bigint, data: string): Promise<string> {
        return this.eth_call(functions.onERC1155Received, [operator, from, id, value, data])
    }

    onERC721Received(operator: string, from: string, tokenId: bigint, data: string): Promise<string> {
        return this.eth_call(functions.onERC721Received, [operator, from, tokenId, data])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    paused(): Promise<boolean> {
        return this.eth_call(functions.paused, [])
    }

    supportsInterface(interfaceId: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [interfaceId])
    }

    weth(): Promise<string> {
        return this.eth_call(functions.weth, [])
    }
}
