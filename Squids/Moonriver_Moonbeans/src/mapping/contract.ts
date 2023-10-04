import {DataHandlerContext} from '@subsquid/evm-processor'
import {Store} from '../db'
import {EntityBuffer} from '../entityBuffer'
import {ContractEventBidCancelled, ContractEventBidPlaced, ContractEventEscrowReturned, ContractEventOwnershipTransferred, ContractEventTokenDelisted, ContractEventTokenListed, ContractEventTokenPurchased, ContractFunctionRecoverMovr, ContractFunctionAcceptOffer, ContractFunctionAddMoneyToEscrow, ContractFunctionCancelOffer, ContractFunctionClearAllBids, ContractFunctionClearAllListings, ContractFunctionDelistToken, ContractFunctionFulfillListing, ContractFunctionListToken, ContractFunctionMakeEscrowedOffer, ContractFunctionMakeOffer, ContractFunctionOnErc721Received, ContractFunctionRecoverNft, ContractFunctionRecoverToken, ContractFunctionRenounceOwnership, ContractFunctionSetBeanBuyBackFee, ContractFunctionSetBeanBuybackAddress, ContractFunctionSetBeanieHolderAddress, ContractFunctionSetBeanieHolderFee, ContractFunctionSetClearBidsAfterAcceptingOffer, ContractFunctionSetCollectionOwner, ContractFunctionSetCollectionOwnerFee, ContractFunctionSetCollectionTrading, ContractFunctionSetDelistAfterAcceptingOffer, ContractFunctionSetDevAddress, ContractFunctionSetDevFee, ContractFunctionSetFeaturedCollection, ContractFunctionSetFeesOn, ContractFunctionSetSpecialGasTax, ContractFunctionSetSuperGasTaxes, ContractFunctionSetTrading, ContractFunctionTransferOwnership, ContractFunctionWithdrawMoneyFromEscrow} from '../model'
import * as spec from '../abi/moonbeans'
import {Log, Transaction} from '../processor'

const address = '0x16d7edd3a562bb60aa0b3af357a2c195ce2aa974'


export function parseEvent(ctx: DataHandlerContext<Store>, log: Log) {
    try {
        switch (log.topics[0]) {
            case spec.events['BidCancelled'].topic: {
                let e = spec.events['BidCancelled'].decode(log)
                EntityBuffer.add(
                    new ContractEventBidCancelled({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'BidCancelled',
                        token: e[0],
                        id0: e[1],
                        price: e[2],
                        buyer: e[3],
                        escrowed: e[4],
                        timestamp: e[5],
                    })
                )
                break
            }
            case spec.events['BidPlaced'].topic: {
                let e = spec.events['BidPlaced'].decode(log)
                EntityBuffer.add(
                    new ContractEventBidPlaced({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'BidPlaced',
                        token: e[0],
                        id0: e[1],
                        price: e[2],
                        buyer: e[3],
                        timestamp: e[4],
                        escrowed: e[5],
                    })
                )
                break
            }
            case spec.events['EscrowReturned'].topic: {
                let e = spec.events['EscrowReturned'].decode(log)
                EntityBuffer.add(
                    new ContractEventEscrowReturned({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'EscrowReturned',
                        user: e[0],
                        price: e[1],
                    })
                )
                break
            }
            case spec.events['OwnershipTransferred'].topic: {
                let e = spec.events['OwnershipTransferred'].decode(log)
                EntityBuffer.add(
                    new ContractEventOwnershipTransferred({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'OwnershipTransferred',
                        previousOwner: e[0],
                        newOwner: e[1],
                    })
                )
                break
            }
            case spec.events['TokenDelisted'].topic: {
                let e = spec.events['TokenDelisted'].decode(log)
                EntityBuffer.add(
                    new ContractEventTokenDelisted({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'TokenDelisted',
                        token: e[0],
                        id0: e[1],
                        timestamp: e[2],
                    })
                )
                break
            }
            case spec.events['TokenListed'].topic: {
                let e = spec.events['TokenListed'].decode(log)
                EntityBuffer.add(
                    new ContractEventTokenListed({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'TokenListed',
                        token: e[0],
                        id0: e[1],
                        price: e[2],
                        timestamp: e[3],
                    })
                )
                break
            }
            case spec.events['TokenPurchased'].topic: {
                let e = spec.events['TokenPurchased'].decode(log)
                EntityBuffer.add(
                    new ContractEventTokenPurchased({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'TokenPurchased',
                        oldOwner: e[0],
                        newOwner: e[1],
                        price: e[2],
                        collection: e[3],
                        tokenId: e[4],
                    })
                )
                break
            }
        }
    }
    catch (error) {
        ctx.log.error({error, blockNumber: log.block.height, blockHash: log.block.hash, address}, `Unable to decode event "${log.topics[0]}"`)
    }
}

export function parseFunction(ctx: DataHandlerContext<Store>, transaction: Transaction) {
    try {
        switch (transaction.input.slice(0, 10)) {
            case spec.functions['RecoverMOVR'].sighash: {
                let f = spec.functions['RecoverMOVR'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRecoverMovr({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'RecoverMOVR',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        to: f[0],
                        amount: f[1],
                    })
                )
                break
            }
            case spec.functions['acceptOffer'].sighash: {
                let f = spec.functions['acceptOffer'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionAcceptOffer({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'acceptOffer',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        tokenId: f[1],
                        price: f[2],
                        from: f[3],
                        escrowedBid: f[4],
                    })
                )
                break
            }
            case spec.functions['addMoneyToEscrow'].sighash: {
                let f = spec.functions['addMoneyToEscrow'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionAddMoneyToEscrow({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'addMoneyToEscrow',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                    })
                )
                break
            }
            case spec.functions['cancelOffer'].sighash: {
                let f = spec.functions['cancelOffer'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionCancelOffer({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'cancelOffer',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        tokenId: f[1],
                        price: f[2],
                        escrowed: f[3],
                    })
                )
                break
            }
            case spec.functions['clearAllBids'].sighash: {
                let f = spec.functions['clearAllBids'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionClearAllBids({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'clearAllBids',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        tokenId: f[1],
                    })
                )
                break
            }
            case spec.functions['clearAllListings'].sighash: {
                let f = spec.functions['clearAllListings'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionClearAllListings({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'clearAllListings',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        tokenId: f[1],
                    })
                )
                break
            }
            case spec.functions['delistToken'].sighash: {
                let f = spec.functions['delistToken'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionDelistToken({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'delistToken',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        tokenId: f[1],
                    })
                )
                break
            }
            case spec.functions['fulfillListing'].sighash: {
                let f = spec.functions['fulfillListing'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionFulfillListing({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'fulfillListing',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        tokenId: f[1],
                    })
                )
                break
            }
            case spec.functions['listToken'].sighash: {
                let f = spec.functions['listToken'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionListToken({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'listToken',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        tokenId: f[1],
                        price: f[2],
                    })
                )
                break
            }
            case spec.functions['makeEscrowedOffer'].sighash: {
                let f = spec.functions['makeEscrowedOffer'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionMakeEscrowedOffer({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'makeEscrowedOffer',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        tokenId: f[1],
                        price: f[2],
                    })
                )
                break
            }
            case spec.functions['makeOffer'].sighash: {
                let f = spec.functions['makeOffer'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionMakeOffer({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'makeOffer',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        tokenId: f[1],
                        price: f[2],
                    })
                )
                break
            }
            case spec.functions['onERC721Received'].sighash: {
                let f = spec.functions['onERC721Received'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionOnErc721Received({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'onERC721Received',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        param0: f[0],
                        param1: f[1],
                        param2: f[2],
                        param3: f[3],
                    })
                )
                break
            }
            case spec.functions['recoverNFT'].sighash: {
                let f = spec.functions['recoverNFT'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRecoverNft({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'recoverNFT',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        token: f[0],
                        tokenId: f[1],
                    })
                )
                break
            }
            case spec.functions['recoverToken'].sighash: {
                let f = spec.functions['recoverToken'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRecoverToken({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'recoverToken',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        token: f[0],
                        amount: f[1],
                    })
                )
                break
            }
            case spec.functions['renounceOwnership'].sighash: {
                let f = spec.functions['renounceOwnership'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRenounceOwnership({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'renounceOwnership',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                    })
                )
                break
            }
            case spec.functions['setBeanBuyBackFee'].sighash: {
                let f = spec.functions['setBeanBuyBackFee'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetBeanBuyBackFee({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setBeanBuyBackFee',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        fee: f[0],
                    })
                )
                break
            }
            case spec.functions['setBeanBuybackAddress'].sighash: {
                let f = spec.functions['setBeanBuybackAddress'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetBeanBuybackAddress({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setBeanBuybackAddress',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        address: f[0],
                    })
                )
                break
            }
            case spec.functions['setBeanieHolderAddress'].sighash: {
                let f = spec.functions['setBeanieHolderAddress'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetBeanieHolderAddress({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setBeanieHolderAddress',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        address: f[0],
                    })
                )
                break
            }
            case spec.functions['setBeanieHolderFee'].sighash: {
                let f = spec.functions['setBeanieHolderFee'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetBeanieHolderFee({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setBeanieHolderFee',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        fee: f[0],
                    })
                )
                break
            }
            case spec.functions['setClearBidsAfterAcceptingOffer'].sighash: {
                let f = spec.functions['setClearBidsAfterAcceptingOffer'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetClearBidsAfterAcceptingOffer({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setClearBidsAfterAcceptingOffer',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        value: f[0],
                    })
                )
                break
            }
            case spec.functions['setCollectionOwner'].sighash: {
                let f = spec.functions['setCollectionOwner'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetCollectionOwner({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setCollectionOwner',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        owner: f[1],
                    })
                )
                break
            }
            case spec.functions['setCollectionOwnerFee'].sighash: {
                let f = spec.functions['setCollectionOwnerFee'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetCollectionOwnerFee({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setCollectionOwnerFee',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        fee: f[1],
                    })
                )
                break
            }
            case spec.functions['setCollectionTrading'].sighash: {
                let f = spec.functions['setCollectionTrading'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetCollectionTrading({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setCollectionTrading',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        value: f[1],
                    })
                )
                break
            }
            case spec.functions['setDelistAfterAcceptingOffer'].sighash: {
                let f = spec.functions['setDelistAfterAcceptingOffer'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetDelistAfterAcceptingOffer({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setDelistAfterAcceptingOffer',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        value: f[0],
                    })
                )
                break
            }
            case spec.functions['setDevAddress'].sighash: {
                let f = spec.functions['setDevAddress'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetDevAddress({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setDevAddress',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        address: f[0],
                    })
                )
                break
            }
            case spec.functions['setDevFee'].sighash: {
                let f = spec.functions['setDevFee'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetDevFee({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setDevFee',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        fee: f[0],
                    })
                )
                break
            }
            case spec.functions['setFeaturedCollection'].sighash: {
                let f = spec.functions['setFeaturedCollection'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetFeaturedCollection({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setFeaturedCollection',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        collection: f[0],
                    })
                )
                break
            }
            case spec.functions['setFeesOn'].sighash: {
                let f = spec.functions['setFeesOn'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetFeesOn({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setFeesOn',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        value: f[0],
                    })
                )
                break
            }
            case spec.functions['setSpecialGasTax'].sighash: {
                let f = spec.functions['setSpecialGasTax'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetSpecialGasTax({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setSpecialGasTax',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        gasAmount: f[0],
                    })
                )
                break
            }
            case spec.functions['setSuperGasTaxes'].sighash: {
                let f = spec.functions['setSuperGasTaxes'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetSuperGasTaxes({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setSuperGasTaxes',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        value: f[0],
                    })
                )
                break
            }
            case spec.functions['setTrading'].sighash: {
                let f = spec.functions['setTrading'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetTrading({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setTrading',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        value: f[0],
                    })
                )
                break
            }
            case spec.functions['transferOwnership'].sighash: {
                let f = spec.functions['transferOwnership'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionTransferOwnership({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'transferOwnership',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        newOwner: f[0],
                    })
                )
                break
            }
            case spec.functions['withdrawMoneyFromEscrow'].sighash: {
                let f = spec.functions['withdrawMoneyFromEscrow'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionWithdrawMoneyFromEscrow({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'withdrawMoneyFromEscrow',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        amount: f[0],
                    })
                )
                break
            }
        }
    }
    catch (error) {
        ctx.log.error({error, blockNumber: transaction.block.height, blockHash: transaction.block.hash, address}, `Unable to decode function "${transaction.input.slice(0, 10)}"`)
    }
}
