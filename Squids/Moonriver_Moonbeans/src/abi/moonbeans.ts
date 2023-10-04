import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './moonbeans.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    BidCancelled: new LogEvent<([token: string, id: bigint, price: bigint, buyer: string, escrowed: boolean, timestamp: bigint] & {token: string, id: bigint, price: bigint, buyer: string, escrowed: boolean, timestamp: bigint})>(
        abi, '0xd2c5c6bf17cda2bc1b6c61b2de68b0738dc35ca17f4cdbecd6192cf49a741f88'
    ),
    BidPlaced: new LogEvent<([token: string, id: bigint, price: bigint, buyer: string, timestamp: bigint, escrowed: boolean] & {token: string, id: bigint, price: bigint, buyer: string, timestamp: bigint, escrowed: boolean})>(
        abi, '0xc04359f39c9f4a2c55808f46b81414842c7568aa3f1a7c9160c70dbf32d79a88'
    ),
    EscrowReturned: new LogEvent<([user: string, price: bigint] & {user: string, price: bigint})>(
        abi, '0xbf1a0ef092ef679427b427c6a95d51133522541e667b737b795a77f2b61c240d'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    TokenDelisted: new LogEvent<([token: string, id: bigint, timestamp: bigint] & {token: string, id: bigint, timestamp: bigint})>(
        abi, '0x1a99fed16d0c92a9f028b3f166d0aab2b85f7b731686df5d1b75d0171f450764'
    ),
    TokenListed: new LogEvent<([token: string, id: bigint, price: bigint, timestamp: bigint] & {token: string, id: bigint, price: bigint, timestamp: bigint})>(
        abi, '0xda2d7fa13c443a4ce51bb68b8ce92f41fac2c10d9d5bdb6a9e9a91429020b7c3'
    ),
    TokenPurchased: new LogEvent<([oldOwner: string, newOwner: string, price: bigint, collection: string, tokenId: bigint] & {oldOwner: string, newOwner: string, price: bigint, collection: string, tokenId: bigint})>(
        abi, '0xe84a930f9e56d6b1a9a6619750ca0a3827c08b1634164de2ca9b49798890486f'
    ),
}

export const functions = {
    RecoverMOVR: new Func<[to: string, amount: bigint], {to: string, amount: bigint}, []>(
        abi, '0x57ccdcf8'
    ),
    TOKEN: new Func<[], {}, string>(
        abi, '0x82bfefc8'
    ),
    acceptOffer: new Func<[ca: string, tokenId: bigint, price: bigint, from: string, escrowedBid: boolean], {ca: string, tokenId: bigint, price: bigint, from: string, escrowedBid: boolean}, []>(
        abi, '0x273499f0'
    ),
    addMoneyToEscrow: new Func<[], {}, []>(
        abi, '0x4a5c213c'
    ),
    beanBuybackAddress: new Func<[], {}, string>(
        abi, '0x5c827858'
    ),
    beanBuybackFee: new Func<[], {}, bigint>(
        abi, '0xd1ffa71a'
    ),
    beanieHolderAddress: new Func<[], {}, string>(
        abi, '0xff093436'
    ),
    beanieHolderFee: new Func<[], {}, bigint>(
        abi, '0x2855ffe2'
    ),
    cancelOffer: new Func<[ca: string, tokenId: bigint, price: bigint, escrowed: boolean], {ca: string, tokenId: bigint, price: bigint, escrowed: boolean}, []>(
        abi, '0x94381636'
    ),
    checkEscrowAmount: new Func<[user: string], {user: string}, bigint>(
        abi, '0x846f45a0'
    ),
    clearAllBids: new Func<[ca: string, tokenId: bigint], {ca: string, tokenId: bigint}, []>(
        abi, '0x4fbcd584'
    ),
    clearAllListings: new Func<[ca: string, tokenId: bigint], {ca: string, tokenId: bigint}, []>(
        abi, '0xd77fb11e'
    ),
    clearBidsAfterAcceptingOffer: new Func<[], {}, boolean>(
        abi, '0xe9a7720b'
    ),
    defaultCollectionOwnerFee: new Func<[], {}, bigint>(
        abi, '0xd3810e24'
    ),
    delistAfterAcceptingOffer: new Func<[], {}, boolean>(
        abi, '0x2a7b4bff'
    ),
    delistToken: new Func<[ca: string, tokenId: bigint], {ca: string, tokenId: bigint}, []>(
        abi, '0xfeb88406'
    ),
    devAddress: new Func<[], {}, string>(
        abi, '0x3ad10ef6'
    ),
    devFee: new Func<[], {}, bigint>(
        abi, '0x6827e764'
    ),
    featuredCollection: new Func<[], {}, string>(
        abi, '0xac633915'
    ),
    feesOn: new Func<[], {}, boolean>(
        abi, '0xcd653ee6'
    ),
    fulfillListing: new Func<[ca: string, tokenId: bigint], {ca: string, tokenId: bigint}, []>(
        abi, '0x7b25b94a'
    ),
    getCollectionFee: new Func<[ca: string], {ca: string}, bigint>(
        abi, '0xb3a4f97b'
    ),
    getCollectionOwner: new Func<[ca: string], {ca: string}, string>(
        abi, '0x745b69ca'
    ),
    getCurrentListing: new Func<[ca: string, tokenId: bigint], {ca: string, tokenId: bigint}, ([price: bigint, timestamp: bigint, tokenId: bigint, accepted: boolean] & {price: bigint, timestamp: bigint, tokenId: bigint, accepted: boolean})>(
        abi, '0xe0777a14'
    ),
    getCurrentListingPrice: new Func<[ca: string, tokenId: bigint], {ca: string, tokenId: bigint}, bigint>(
        abi, '0xdb8c96c7'
    ),
    getEscrowedAmount: new Func<[user: string], {user: string}, bigint>(
        abi, '0x3fd9d6ff'
    ),
    getOffers: new Func<[ca: string, tokenId: bigint], {ca: string, tokenId: bigint}, Array<([price: bigint, timestamp: bigint, accepted: boolean, buyer: string, escrowed: boolean] & {price: bigint, timestamp: bigint, accepted: boolean, buyer: string, escrowed: boolean})>>(
        abi, '0xea98a950'
    ),
    getTokenListingHistory: new Func<[ca: string, tokenId: bigint], {ca: string, tokenId: bigint}, Array<([price: bigint, timestamp: bigint, tokenId: bigint, accepted: boolean] & {price: bigint, timestamp: bigint, tokenId: bigint, accepted: boolean})>>(
        abi, '0x17c66b8c'
    ),
    isCollectionTrading: new Func<[ca: string], {ca: string}, boolean>(
        abi, '0x8a6169ae'
    ),
    isListed: new Func<[ca: string, tokenId: bigint], {ca: string, tokenId: bigint}, boolean>(
        abi, '0xcdb3cd25'
    ),
    listToken: new Func<[ca: string, tokenId: bigint, price: bigint], {ca: string, tokenId: bigint, price: bigint}, []>(
        abi, '0x7e07590d'
    ),
    makeEscrowedOffer: new Func<[ca: string, tokenId: bigint, price: bigint], {ca: string, tokenId: bigint, price: bigint}, []>(
        abi, '0x89394ef5'
    ),
    makeOffer: new Func<[ca: string, tokenId: bigint, price: bigint], {ca: string, tokenId: bigint, price: bigint}, []>(
        abi, '0x7de3bd07'
    ),
    onERC721Received: new Func<[_: string, _: string, _: bigint, _: string], {}, string>(
        abi, '0x150b7a02'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    recoverNFT: new Func<[_token: string, tokenId: bigint], {_token: string, tokenId: bigint}, []>(
        abi, '0x3319a00d'
    ),
    recoverToken: new Func<[_token: string, amount: bigint], {_token: string, amount: bigint}, []>(
        abi, '0xb29a8140'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    setBeanBuyBackFee: new Func<[fee: bigint], {fee: bigint}, []>(
        abi, '0x95483e81'
    ),
    setBeanBuybackAddress: new Func<[_address: string], {_address: string}, []>(
        abi, '0x6a139d7a'
    ),
    setBeanieHolderAddress: new Func<[_address: string], {_address: string}, []>(
        abi, '0xb966373a'
    ),
    setBeanieHolderFee: new Func<[fee: bigint], {fee: bigint}, []>(
        abi, '0xab78f369'
    ),
    setClearBidsAfterAcceptingOffer: new Func<[_value: boolean], {_value: boolean}, []>(
        abi, '0x2eb81fdf'
    ),
    setCollectionOwner: new Func<[ca: string, owner: string], {ca: string, owner: string}, []>(
        abi, '0xcbde6405'
    ),
    setCollectionOwnerFee: new Func<[ca: string, fee: bigint], {ca: string, fee: bigint}, []>(
        abi, '0x20184b11'
    ),
    setCollectionTrading: new Func<[ca: string, value: boolean], {ca: string, value: boolean}, []>(
        abi, '0x82ff441c'
    ),
    setDelistAfterAcceptingOffer: new Func<[_value: boolean], {_value: boolean}, []>(
        abi, '0x76dda505'
    ),
    setDevAddress: new Func<[_address: string], {_address: string}, []>(
        abi, '0xd0d41fe1'
    ),
    setDevFee: new Func<[fee: bigint], {fee: bigint}, []>(
        abi, '0x1c75b6b2'
    ),
    setFeaturedCollection: new Func<[_collection: string], {_collection: string}, []>(
        abi, '0x6b8894c4'
    ),
    setFeesOn: new Func<[_value: boolean], {_value: boolean}, []>(
        abi, '0x675ef65c'
    ),
    setSpecialGasTax: new Func<[gasAmount: bigint], {gasAmount: bigint}, []>(
        abi, '0x4ad6a3a2'
    ),
    setSuperGasTaxes: new Func<[value: boolean], {value: boolean}, []>(
        abi, '0xccd68371'
    ),
    setTrading: new Func<[value: boolean], {value: boolean}, []>(
        abi, '0x8f70ccf7'
    ),
    specialTaxGas: new Func<[], {}, bigint>(
        abi, '0x29bdfd94'
    ),
    totalEscrowedAmount: new Func<[], {}, bigint>(
        abi, '0x9011f8fe'
    ),
    totalFees: new Func<[], {}, bigint>(
        abi, '0x13114a9d'
    ),
    tradingPaused: new Func<[], {}, boolean>(
        abi, '0x53e23e2e'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    useSuperGasTaxes: new Func<[], {}, boolean>(
        abi, '0xdfd3da7e'
    ),
    withdrawMoneyFromEscrow: new Func<[amount: bigint], {amount: bigint}, []>(
        abi, '0x6b872a96'
    ),
}

export class Contract extends ContractBase {

    TOKEN(): Promise<string> {
        return this.eth_call(functions.TOKEN, [])
    }

    beanBuybackAddress(): Promise<string> {
        return this.eth_call(functions.beanBuybackAddress, [])
    }

    beanBuybackFee(): Promise<bigint> {
        return this.eth_call(functions.beanBuybackFee, [])
    }

    beanieHolderAddress(): Promise<string> {
        return this.eth_call(functions.beanieHolderAddress, [])
    }

    beanieHolderFee(): Promise<bigint> {
        return this.eth_call(functions.beanieHolderFee, [])
    }

    checkEscrowAmount(user: string): Promise<bigint> {
        return this.eth_call(functions.checkEscrowAmount, [user])
    }

    clearBidsAfterAcceptingOffer(): Promise<boolean> {
        return this.eth_call(functions.clearBidsAfterAcceptingOffer, [])
    }

    defaultCollectionOwnerFee(): Promise<bigint> {
        return this.eth_call(functions.defaultCollectionOwnerFee, [])
    }

    delistAfterAcceptingOffer(): Promise<boolean> {
        return this.eth_call(functions.delistAfterAcceptingOffer, [])
    }

    devAddress(): Promise<string> {
        return this.eth_call(functions.devAddress, [])
    }

    devFee(): Promise<bigint> {
        return this.eth_call(functions.devFee, [])
    }

    featuredCollection(): Promise<string> {
        return this.eth_call(functions.featuredCollection, [])
    }

    feesOn(): Promise<boolean> {
        return this.eth_call(functions.feesOn, [])
    }

    getCollectionFee(ca: string): Promise<bigint> {
        return this.eth_call(functions.getCollectionFee, [ca])
    }

    getCollectionOwner(ca: string): Promise<string> {
        return this.eth_call(functions.getCollectionOwner, [ca])
    }

    getCurrentListing(ca: string, tokenId: bigint): Promise<([price: bigint, timestamp: bigint, tokenId: bigint, accepted: boolean] & {price: bigint, timestamp: bigint, tokenId: bigint, accepted: boolean})> {
        return this.eth_call(functions.getCurrentListing, [ca, tokenId])
    }

    getCurrentListingPrice(ca: string, tokenId: bigint): Promise<bigint> {
        return this.eth_call(functions.getCurrentListingPrice, [ca, tokenId])
    }

    getEscrowedAmount(user: string): Promise<bigint> {
        return this.eth_call(functions.getEscrowedAmount, [user])
    }

    getOffers(ca: string, tokenId: bigint): Promise<Array<([price: bigint, timestamp: bigint, accepted: boolean, buyer: string, escrowed: boolean] & {price: bigint, timestamp: bigint, accepted: boolean, buyer: string, escrowed: boolean})>> {
        return this.eth_call(functions.getOffers, [ca, tokenId])
    }

    getTokenListingHistory(ca: string, tokenId: bigint): Promise<Array<([price: bigint, timestamp: bigint, tokenId: bigint, accepted: boolean] & {price: bigint, timestamp: bigint, tokenId: bigint, accepted: boolean})>> {
        return this.eth_call(functions.getTokenListingHistory, [ca, tokenId])
    }

    isCollectionTrading(ca: string): Promise<boolean> {
        return this.eth_call(functions.isCollectionTrading, [ca])
    }

    isListed(ca: string, tokenId: bigint): Promise<boolean> {
        return this.eth_call(functions.isListed, [ca, tokenId])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    specialTaxGas(): Promise<bigint> {
        return this.eth_call(functions.specialTaxGas, [])
    }

    totalEscrowedAmount(): Promise<bigint> {
        return this.eth_call(functions.totalEscrowedAmount, [])
    }

    totalFees(): Promise<bigint> {
        return this.eth_call(functions.totalFees, [])
    }

    tradingPaused(): Promise<boolean> {
        return this.eth_call(functions.tradingPaused, [])
    }

    useSuperGasTaxes(): Promise<boolean> {
        return this.eth_call(functions.useSuperGasTaxes, [])
    }
}
