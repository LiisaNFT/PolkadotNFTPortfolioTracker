import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './Moonbeans.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    CollectionModified: new LogEvent<([token: string, enabled: boolean, owner: string, collectionOwnerFee: bigint, timestamp: bigint] & {token: string, enabled: boolean, owner: string, collectionOwnerFee: bigint, timestamp: bigint})>(
        abi, '0x3ecb245e4afa53e8cddb2d4454c162ddda6c50309dc53e13fe646054f3112ad5'
    ),
    EscrowReturned: new LogEvent<([user: string, price: bigint] & {user: string, price: bigint})>(
        abi, '0xbf1a0ef092ef679427b427c6a95d51133522541e667b737b795a77f2b61c240d'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    TradeAccepted: new LogEvent<([tradeId: string, token: string, tokenId: bigint, quantity: bigint, price: bigint, oldOwner: string, newOwner: string, tradeType: number, expiry: bigint, timestamp: bigint] & {tradeId: string, token: string, tokenId: bigint, quantity: bigint, price: bigint, oldOwner: string, newOwner: string, tradeType: number, expiry: bigint, timestamp: bigint})>(
        abi, '0x1c4216aeda1e79aa1a63f9187b049c4bd3edc14993105c6b5da49f9ef6948ed1'
    ),
    TradeCancelled: new LogEvent<([tradeId: string, token: string, tokenId: bigint, quantity: bigint, price: bigint, maker: string, expiry: bigint, timestamp: bigint, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})] & {tradeId: string, token: string, tokenId: bigint, quantity: bigint, price: bigint, maker: string, expiry: bigint, timestamp: bigint, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})})>(
        abi, '0x10ef23d623cfc3113d40783c42c2705b0cf96ddb56cca58b0da7f3923c1f4def'
    ),
    TradeOpened: new LogEvent<([tradeId: string, token: string, tokenId: bigint, quantity: bigint, price: bigint, maker: string, expiry: bigint, timestamp: bigint, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})] & {tradeId: string, token: string, tokenId: bigint, quantity: bigint, price: bigint, maker: string, expiry: bigint, timestamp: bigint, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})})>(
        abi, '0x461f1226d03bc6efc5d70cccfc92b7d5b029a296257c471a5afe67aafc1823f3'
    ),
}

export const functions = {
    BeanFeeProcessor: new Func<[], {}, string>(
        abi, '0x2288739b'
    ),
    TOKEN: new Func<[], {}, string>(
        abi, '0x82bfefc8'
    ),
    acceptTrade: new Func<[tradeId: string, amount: bigint], {tradeId: string, amount: bigint}, []>(
        abi, '0xddaa5437'
    ),
    addMoneyToEscrow: new Func<[], {}, []>(
        abi, '0x4a5c213c'
    ),
    administrators: new Func<[_: string], {}, boolean>(
        abi, '0x76be1585'
    ),
    cancelTrade: new Func<[tradeId: string], {tradeId: string}, []>(
        abi, '0x7cfb41b8'
    ),
    checkEscrowAmount: new Func<[user: string], {user: string}, bigint>(
        abi, '0x846f45a0'
    ),
    collectionOwnerFees: new Func<[_: string], {}, bigint>(
        abi, '0x1fbfce18'
    ),
    collectionOwners: new Func<[_: string], {}, string>(
        abi, '0x1e02778f'
    ),
    collectionOwnersCanSetRoyalties: new Func<[], {}, boolean>(
        abi, '0xdd3cfd32'
    ),
    collectionTradingEnabled: new Func<[_: string], {}, boolean>(
        abi, '0x1bb76878'
    ),
    computeOrderHash: new Func<[user: string, token: string, tokenId: bigint, userNonce: bigint], {user: string, token: string, tokenId: bigint, userNonce: bigint}, string>(
        abi, '0x1dfbbe08'
    ),
    defaultCollectionOwnerFee: new Func<[], {}, bigint>(
        abi, '0xd3810e24'
    ),
    feesOn: new Func<[], {}, boolean>(
        abi, '0xcd653ee6'
    ),
    getBuyOrdersByUser: new Func<[user: string], {user: string}, Array<string>>(
        abi, '0xe721152c'
    ),
    getCollectionFee: new Func<[ca: string], {ca: string}, bigint>(
        abi, '0xb3a4f97b'
    ),
    getCollectionOwner: new Func<[ca: string], {ca: string}, string>(
        abi, '0x745b69ca'
    ),
    getEscrowedAmount: new Func<[user: string], {user: string}, bigint>(
        abi, '0x3fd9d6ff'
    ),
    getSellOrdersByUser: new Func<[user: string], {user: string}, Array<string>>(
        abi, '0xc8d70062'
    ),
    getTrade: new Func<[tradeID: string], {tradeID: string}, ([tokenId: bigint, quantity: bigint, price: bigint, expiry: bigint, posInUserRegister: bigint, ca: string, maker: string, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})] & {tokenId: bigint, quantity: bigint, price: bigint, expiry: bigint, posInUserRegister: bigint, ca: string, maker: string, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})})>(
        abi, '0xa3b13799'
    ),
    isCollectionTrading: new Func<[ca: string], {ca: string}, boolean>(
        abi, '0x8a6169ae'
    ),
    isValidTrade: new Func<[tradeID: string], {tradeID: string}, boolean>(
        abi, '0x2581b05c'
    ),
    listCollection: new Func<[ca: string, tradingEnabled: boolean, _royaltyWallet: string, _fee: bigint], {ca: string, tradingEnabled: boolean, _royaltyWallet: string, _fee: bigint}, []>(
        abi, '0x2ef0a6c2'
    ),
    nonce: new Func<[], {}, bigint>(
        abi, '0xaffed0e0'
    ),
    openTrade: new Func<[ca: string, tokenId: bigint, quantity: bigint, price: bigint, expiry: bigint, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})], {ca: string, tokenId: bigint, quantity: bigint, price: bigint, expiry: bigint, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})}, []>(
        abi, '0xab00a98e'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    recover1155: new Func<[_token: string, tokenId: bigint, amount: bigint], {_token: string, tokenId: bigint, amount: bigint}, []>(
        abi, '0xc62fc677'
    ),
    recoverGAS: new Func<[to: string, amount: bigint], {to: string, amount: bigint}, []>(
        abi, '0x24f37764'
    ),
    recoverToken: new Func<[_token: string, amount: bigint], {_token: string, amount: bigint}, []>(
        abi, '0xb29a8140'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    setAdmin: new Func<[admin: string, value: boolean], {admin: string, value: boolean}, []>(
        abi, '0x4b0bddd2'
    ),
    setCollectionOwner: new Func<[ca: string, _owner: string], {ca: string, _owner: string}, []>(
        abi, '0xcbde6405'
    ),
    setCollectionOwnerFee: new Func<[ca: string, fee: bigint], {ca: string, fee: bigint}, []>(
        abi, '0x20184b11'
    ),
    setCollectionOwnersCanSetRoyalties: new Func<[_value: boolean], {_value: boolean}, []>(
        abi, '0x599b0a40'
    ),
    setCollectionTrading: new Func<[ca: string, value: boolean], {ca: string, value: boolean}, []>(
        abi, '0x82ff441c'
    ),
    setDefaultCollectionOwnerFee: new Func<[fee: bigint], {fee: bigint}, []>(
        abi, '0xe4c8be8c'
    ),
    setFeesOn: new Func<[_value: boolean], {_value: boolean}, []>(
        abi, '0x675ef65c'
    ),
    setTrading: new Func<[value: boolean], {value: boolean}, []>(
        abi, '0x8f70ccf7'
    ),
    totalAdminFees: new Func<[], {}, bigint>(
        abi, '0x61feacff'
    ),
    totalEscrowedAmount: new Func<[], {}, bigint>(
        abi, '0x9011f8fe'
    ),
    totalInEscrow: new Func<[_: string], {}, bigint>(
        abi, '0x1cbad4db'
    ),
    trades: new Func<[_: string], {}, ([tokenId: bigint, quantity: bigint, price: bigint, expiry: bigint, posInUserRegister: bigint, ca: string, maker: string, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})] & {tokenId: bigint, quantity: bigint, price: bigint, expiry: bigint, posInUserRegister: bigint, ca: string, maker: string, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})})>(
        abi, '0x00162420'
    ),
    tradingPaused: new Func<[], {}, boolean>(
        abi, '0x53e23e2e'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    usersCanWithdrawEscrow: new Func<[], {}, boolean>(
        abi, '0x5674cdae'
    ),
    withdrawMoneyFromEscrow: new Func<[amount: bigint], {amount: bigint}, []>(
        abi, '0x6b872a96'
    ),
}

export class Contract extends ContractBase {

    BeanFeeProcessor(): Promise<string> {
        return this.eth_call(functions.BeanFeeProcessor, [])
    }

    TOKEN(): Promise<string> {
        return this.eth_call(functions.TOKEN, [])
    }

    administrators(arg0: string): Promise<boolean> {
        return this.eth_call(functions.administrators, [arg0])
    }

    checkEscrowAmount(user: string): Promise<bigint> {
        return this.eth_call(functions.checkEscrowAmount, [user])
    }

    collectionOwnerFees(arg0: string): Promise<bigint> {
        return this.eth_call(functions.collectionOwnerFees, [arg0])
    }

    collectionOwners(arg0: string): Promise<string> {
        return this.eth_call(functions.collectionOwners, [arg0])
    }

    collectionOwnersCanSetRoyalties(): Promise<boolean> {
        return this.eth_call(functions.collectionOwnersCanSetRoyalties, [])
    }

    collectionTradingEnabled(arg0: string): Promise<boolean> {
        return this.eth_call(functions.collectionTradingEnabled, [arg0])
    }

    computeOrderHash(user: string, token: string, tokenId: bigint, userNonce: bigint): Promise<string> {
        return this.eth_call(functions.computeOrderHash, [user, token, tokenId, userNonce])
    }

    defaultCollectionOwnerFee(): Promise<bigint> {
        return this.eth_call(functions.defaultCollectionOwnerFee, [])
    }

    feesOn(): Promise<boolean> {
        return this.eth_call(functions.feesOn, [])
    }

    getBuyOrdersByUser(user: string): Promise<Array<string>> {
        return this.eth_call(functions.getBuyOrdersByUser, [user])
    }

    getCollectionFee(ca: string): Promise<bigint> {
        return this.eth_call(functions.getCollectionFee, [ca])
    }

    getCollectionOwner(ca: string): Promise<string> {
        return this.eth_call(functions.getCollectionOwner, [ca])
    }

    getEscrowedAmount(user: string): Promise<bigint> {
        return this.eth_call(functions.getEscrowedAmount, [user])
    }

    getSellOrdersByUser(user: string): Promise<Array<string>> {
        return this.eth_call(functions.getSellOrdersByUser, [user])
    }

    getTrade(tradeID: string): Promise<([tokenId: bigint, quantity: bigint, price: bigint, expiry: bigint, posInUserRegister: bigint, ca: string, maker: string, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})] & {tokenId: bigint, quantity: bigint, price: bigint, expiry: bigint, posInUserRegister: bigint, ca: string, maker: string, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})})> {
        return this.eth_call(functions.getTrade, [tradeID])
    }

    isCollectionTrading(ca: string): Promise<boolean> {
        return this.eth_call(functions.isCollectionTrading, [ca])
    }

    isValidTrade(tradeID: string): Promise<boolean> {
        return this.eth_call(functions.isValidTrade, [tradeID])
    }

    nonce(): Promise<bigint> {
        return this.eth_call(functions.nonce, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    totalAdminFees(): Promise<bigint> {
        return this.eth_call(functions.totalAdminFees, [])
    }

    totalEscrowedAmount(): Promise<bigint> {
        return this.eth_call(functions.totalEscrowedAmount, [])
    }

    totalInEscrow(arg0: string): Promise<bigint> {
        return this.eth_call(functions.totalInEscrow, [arg0])
    }

    trades(arg0: string): Promise<([tokenId: bigint, quantity: bigint, price: bigint, expiry: bigint, posInUserRegister: bigint, ca: string, maker: string, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})] & {tokenId: bigint, quantity: bigint, price: bigint, expiry: bigint, posInUserRegister: bigint, ca: string, maker: string, tradeFlags: ([tradeType: number, allowPartialFills: boolean, isEscrowed: boolean] & {tradeType: number, allowPartialFills: boolean, isEscrowed: boolean})})> {
        return this.eth_call(functions.trades, [arg0])
    }

    tradingPaused(): Promise<boolean> {
        return this.eth_call(functions.tradingPaused, [])
    }

    usersCanWithdrawEscrow(): Promise<boolean> {
        return this.eth_call(functions.usersCanWithdrawEscrow, [])
    }
}
