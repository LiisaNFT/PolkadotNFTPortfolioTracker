import {DataHandlerContext} from '@subsquid/evm-processor'
import {toJSON} from '@subsquid/util-internal-json'
import {Store} from '../db'
import {EntityBuffer} from '../entityBuffer'
import {ContractEventEvAuctionRefund, ContractEventEvCouponSpent, ContractEventEvInventoryUpdate, ContractEventEvMarketSignerUpdate, ContractEventEvSettingsUpdated, ContractEventEvSwapped, ContractEventOwnershipTransferred, ContractEventPaused, ContractEventUnpaused, ContractFunctionCancelBuys, ContractFunctionEmergencyCancelAuction, ContractFunctionHasSignedIntention, ContractFunctionInCaseMoneyGetsStuck, ContractFunctionIsSignatureValid, ContractFunctionPause, ContractFunctionRenounceOwnership, ContractFunctionRun, ContractFunctionSend, ContractFunctionSupportsInterface, ContractFunctionSwap, ContractFunctionTransferOwnership, ContractFunctionUnpause, ContractFunctionUpdateSettings, ContractFunctionUpdateSigner} from '../model'
import * as spec from '../abi/tofu'
import {Log, Transaction} from '../processor'

const address = '0x7cae7feb55349feadb8f84468f692450d92597bc'


export function parseEvent(ctx: DataHandlerContext<Store>, log: Log) {
    try {
        switch (log.topics[0]) {
            case spec.events['EvAuctionRefund'].topic: {
                let e = spec.events['EvAuctionRefund'].decode(log)
                EntityBuffer.add(
                    new ContractEventEvAuctionRefund({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'EvAuctionRefund',
                        id0: e[0],
                        bidder: e[1],
                        refund: e[2],
                    })
                )
                break
            }
            case spec.events['EvCouponSpent'].topic: {
                let e = spec.events['EvCouponSpent'].decode(log)
                EntityBuffer.add(
                    new ContractEventEvCouponSpent({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'EvCouponSpent',
                        id0: e[0],
                        couponId: e[1],
                    })
                )
                break
            }
            case spec.events['EvInventoryUpdate'].topic: {
                let e = spec.events['EvInventoryUpdate'].decode(log)
                EntityBuffer.add(
                    new ContractEventEvInventoryUpdate({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'EvInventoryUpdate',
                        id0: e[0],
                        inventory: toJSON(e[1]),
                    })
                )
                break
            }
            case spec.events['EvMarketSignerUpdate'].topic: {
                let e = spec.events['EvMarketSignerUpdate'].decode(log)
                EntityBuffer.add(
                    new ContractEventEvMarketSignerUpdate({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'EvMarketSignerUpdate',
                        addr: e[0],
                        isRemoval: e[1],
                    })
                )
                break
            }
            case spec.events['EvSettingsUpdated'].topic: {
                let e = spec.events['EvSettingsUpdated'].decode(log)
                EntityBuffer.add(
                    new ContractEventEvSettingsUpdated({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'EvSettingsUpdated',
                    })
                )
                break
            }
            case spec.events['EvSwapped'].topic: {
                let e = spec.events['EvSwapped'].decode(log)
                EntityBuffer.add(
                    new ContractEventEvSwapped({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'EvSwapped',
                        req: toJSON(e[0]),
                        signature: e[1],
                        swapper: e[2],
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
            case spec.events['Paused'].topic: {
                let e = spec.events['Paused'].decode(log)
                EntityBuffer.add(
                    new ContractEventPaused({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Paused',
                        account: e[0],
                    })
                )
                break
            }
            case spec.events['Unpaused'].topic: {
                let e = spec.events['Unpaused'].decode(log)
                EntityBuffer.add(
                    new ContractEventUnpaused({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Unpaused',
                        account: e[0],
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
            case spec.functions['cancelBuys'].sighash: {
                let f = spec.functions['cancelBuys'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionCancelBuys({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'cancelBuys',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        ids: toJSON(f[0]),
                    })
                )
                break
            }
            case spec.functions['emergencyCancelAuction'].sighash: {
                let f = spec.functions['emergencyCancelAuction'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionEmergencyCancelAuction({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'emergencyCancelAuction',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        id0: f[0],
                        noBundle: f[1],
                    })
                )
                break
            }
            case spec.functions['hasSignedIntention'].sighash: {
                let f = spec.functions['hasSignedIntention'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionHasSignedIntention({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'hasSignedIntention',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        op: f[0],
                    })
                )
                break
            }
            case spec.functions['inCaseMoneyGetsStuck'].sighash: {
                let f = spec.functions['inCaseMoneyGetsStuck'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionInCaseMoneyGetsStuck({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'inCaseMoneyGetsStuck',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        to: f[0],
                        currency: f[1],
                        amount: f[2],
                    })
                )
                break
            }
            case spec.functions['isSignatureValid'].sighash: {
                let f = spec.functions['isSignatureValid'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionIsSignatureValid({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'isSignatureValid',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        signature: f[0],
                        hash: f[1],
                        signer: f[2],
                    })
                )
                break
            }
            case spec.functions['pause'].sighash: {
                let f = spec.functions['pause'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionPause({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'pause',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
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
            case spec.functions['run'].sighash: {
                let f = spec.functions['run'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRun({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'run',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        intent: toJSON(f[0]),
                        detail: toJSON(f[1]),
                        sigIntent: f[2],
                        sigDetail: f[3],
                    })
                )
                break
            }
            case spec.functions['send'].sighash: {
                let f = spec.functions['send'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSend({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'send',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        to: f[0],
                        tokens: toJSON(f[1]),
                    })
                )
                break
            }
            case spec.functions['supportsInterface'].sighash: {
                let f = spec.functions['supportsInterface'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSupportsInterface({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'supportsInterface',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        interfaceId: f[0],
                    })
                )
                break
            }
            case spec.functions['swap'].sighash: {
                let f = spec.functions['swap'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSwap({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'swap',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        req: toJSON(f[0]),
                        signature: f[1],
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
            case spec.functions['unpause'].sighash: {
                let f = spec.functions['unpause'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionUnpause({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'unpause',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                    })
                )
                break
            }
            case spec.functions['updateSettings'].sighash: {
                let f = spec.functions['updateSettings'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionUpdateSettings({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'updateSettings',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        minAuctionIncrement: f[0],
                        minAuctionDuration: f[1],
                    })
                )
                break
            }
            case spec.functions['updateSigner'].sighash: {
                let f = spec.functions['updateSigner'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionUpdateSigner({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'updateSigner',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        addr: f[0],
                        remove: f[1],
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
