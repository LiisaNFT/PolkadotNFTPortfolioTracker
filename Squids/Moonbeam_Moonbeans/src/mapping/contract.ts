import {DataHandlerContext} from '@subsquid/evm-processor'
import {toJSON} from '@subsquid/util-internal-json'
import {Store} from '../db'
import {EntityBuffer} from '../entityBuffer'
import {ContractEventCollectionModified, ContractEventEscrowReturned, ContractEventOwnershipTransferred, ContractEventTradeAccepted, ContractEventTradeCancelled, ContractEventTradeOpened, ContractFunctionAcceptTrade, ContractFunctionAddMoneyToEscrow, ContractFunctionCancelTrade, ContractFunctionListCollection, ContractFunctionOpenTrade, ContractFunctionRecover1155, ContractFunctionRecoverGas, ContractFunctionRecoverToken, ContractFunctionRenounceOwnership, ContractFunctionSetAdmin, ContractFunctionSetCollectionOwner, ContractFunctionSetCollectionOwnerFee, ContractFunctionSetCollectionOwnersCanSetRoyalties, ContractFunctionSetCollectionTrading, ContractFunctionSetDefaultCollectionOwnerFee, ContractFunctionSetFeesOn, ContractFunctionSetTrading, ContractFunctionTransferOwnership, ContractFunctionWithdrawMoneyFromEscrow} from '../model'
import * as spec from '../abi/Moonbeans'
import {Log, Transaction} from '../processor'

const address = '0x9ff0cf19f66ab00774de20b311825b7f65f23972'


export function parseEvent(ctx: DataHandlerContext<Store>, log: Log) {
    try {
        switch (log.topics[0]) {
            case spec.events['CollectionModified'].topic: {
                let e = spec.events['CollectionModified'].decode(log)
                EntityBuffer.add(
                    new ContractEventCollectionModified({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'CollectionModified',
                        token: e[0],
                        enabled: e[1],
                        owner: e[2],
                        collectionOwnerFee: e[3],
                        timestamp: e[4],
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
            case spec.events['TradeAccepted'].topic: {
                let e = spec.events['TradeAccepted'].decode(log)
                EntityBuffer.add(
                    new ContractEventTradeAccepted({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'TradeAccepted',
                        tradeId: e[0],
                        token: e[1],
                        tokenId: e[2],
                        quantity: e[3],
                        price: e[4],
                        oldOwner: e[5],
                        newOwner: e[6],
                        tradeType: e[7],
                        expiry: e[8],
                        timestamp: e[9],
                    })
                )
                break
            }
            case spec.events['TradeCancelled'].topic: {
                let e = spec.events['TradeCancelled'].decode(log)
                EntityBuffer.add(
                    new ContractEventTradeCancelled({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'TradeCancelled',
                        tradeId: e[0],
                        token: e[1],
                        tokenId: e[2],
                        quantity: e[3],
                        price: e[4],
                        maker: e[5],
                        expiry: e[6],
                        timestamp: e[7],
                        tradeFlags: toJSON(e[8]),
                    })
                )
                break
            }
            case spec.events['TradeOpened'].topic: {
                let e = spec.events['TradeOpened'].decode(log)
                EntityBuffer.add(
                    new ContractEventTradeOpened({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'TradeOpened',
                        tradeId: e[0],
                        token: e[1],
                        tokenId: e[2],
                        quantity: e[3],
                        price: e[4],
                        maker: e[5],
                        expiry: e[6],
                        timestamp: e[7],
                        tradeFlags: toJSON(e[8]),
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
            case spec.functions['acceptTrade'].sighash: {
                let f = spec.functions['acceptTrade'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionAcceptTrade({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'acceptTrade',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        tradeId: f[0],
                        amount: f[1],
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
            case spec.functions['cancelTrade'].sighash: {
                let f = spec.functions['cancelTrade'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionCancelTrade({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'cancelTrade',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        tradeId: f[0],
                    })
                )
                break
            }
            case spec.functions['listCollection'].sighash: {
                let f = spec.functions['listCollection'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionListCollection({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'listCollection',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        tradingEnabled: f[1],
                        royaltyWallet: f[2],
                        fee: f[3],
                    })
                )
                break
            }
            case spec.functions['openTrade'].sighash: {
                let f = spec.functions['openTrade'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionOpenTrade({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'openTrade',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ca: f[0],
                        tokenId: f[1],
                        quantity: f[2],
                        price: f[3],
                        expiry: f[4],
                        tradeFlags: toJSON(f[5]),
                    })
                )
                break
            }
            case spec.functions['recover1155'].sighash: {
                let f = spec.functions['recover1155'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRecover1155({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'recover1155',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        token: f[0],
                        tokenId: f[1],
                        amount: f[2],
                    })
                )
                break
            }
            case spec.functions['recoverGAS'].sighash: {
                let f = spec.functions['recoverGAS'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRecoverGas({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'recoverGAS',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        to: f[0],
                        amount: f[1],
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
            case spec.functions['setAdmin'].sighash: {
                let f = spec.functions['setAdmin'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetAdmin({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setAdmin',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        admin: f[0],
                        value: f[1],
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
            case spec.functions['setCollectionOwnersCanSetRoyalties'].sighash: {
                let f = spec.functions['setCollectionOwnersCanSetRoyalties'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetCollectionOwnersCanSetRoyalties({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setCollectionOwnersCanSetRoyalties',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        value: f[0],
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
            case spec.functions['setDefaultCollectionOwnerFee'].sighash: {
                let f = spec.functions['setDefaultCollectionOwnerFee'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetDefaultCollectionOwnerFee({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setDefaultCollectionOwnerFee',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        fee: f[0],
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
