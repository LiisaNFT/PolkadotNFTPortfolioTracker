import {DataHandlerContext} from '@subsquid/evm-processor'
import {Store} from '../db'
import {EntityBuffer} from '../entityBuffer'
import {ContractEventBuy, ContractEventCancelSell, ContractEventNftReceived, ContractEventOwnershipTransferred, ContractEventSell, ContractFunctionAddSupportedCurrency, ContractFunctionAddSupportedNft, ContractFunctionBuy, ContractFunctionCancelSell, ContractFunctionEnableSales, ContractFunctionOnErc721Received, ContractFunctionRemoveSupportedCurrency, ContractFunctionRemoveSupportedNft, ContractFunctionRenounceOwnership, ContractFunctionSell, ContractFunctionSetFeeRate, ContractFunctionSetFeeReceiver, ContractFunctionTransferOwnership} from '../model'
import * as spec from '../abi/seascape'
import {Log, Transaction} from '../processor'

const address = '0x65763702806143a5326b40ecded5b17796696cb3'


export function parseEvent(ctx: DataHandlerContext<Store>, log: Log) {
    try {
        switch (log.topics[0]) {
            case spec.events['Buy'].topic: {
                let e = spec.events['Buy'].decode(log)
                EntityBuffer.add(
                    new ContractEventBuy({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Buy',
                        saleId: e[0],
                        tokenId: e[1],
                        buyer: e[2],
                        price: e[3],
                        tipsFee: e[4],
                        currency: e[5],
                    })
                )
                break
            }
            case spec.events['CancelSell'].topic: {
                let e = spec.events['CancelSell'].decode(log)
                EntityBuffer.add(
                    new ContractEventCancelSell({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'CancelSell',
                        saleId: e[0],
                        tokenId: e[1],
                    })
                )
                break
            }
            case spec.events['NftReceived'].topic: {
                let e = spec.events['NftReceived'].decode(log)
                EntityBuffer.add(
                    new ContractEventNftReceived({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'NftReceived',
                        operator: e[0],
                        from: e[1],
                        tokenId: e[2],
                        data: e[3],
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
            case spec.events['Sell'].topic: {
                let e = spec.events['Sell'].decode(log)
                EntityBuffer.add(
                    new ContractEventSell({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Sell',
                        saleId: e[0],
                        tokenId: e[1],
                        nft: e[2],
                        currency: e[3],
                        seller: e[4],
                        buyer: e[5],
                        startTime: e[6],
                        price: e[7],
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
            case spec.functions['addSupportedCurrency'].sighash: {
                let f = spec.functions['addSupportedCurrency'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionAddSupportedCurrency({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'addSupportedCurrency',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        currencyAddress: f[0],
                    })
                )
                break
            }
            case spec.functions['addSupportedNft'].sighash: {
                let f = spec.functions['addSupportedNft'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionAddSupportedNft({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'addSupportedNft',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        nftAddress: f[0],
                    })
                )
                break
            }
            case spec.functions['buy'].sighash: {
                let f = spec.functions['buy'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionBuy({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'buy',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        tokenId: f[0],
                        nftAddress: f[1],
                        currency: f[2],
                        price: f[3],
                    })
                )
                break
            }
            case spec.functions['cancelSell'].sighash: {
                let f = spec.functions['cancelSell'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionCancelSell({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'cancelSell',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        tokenId: f[0],
                        nftAddress: f[1],
                    })
                )
                break
            }
            case spec.functions['enableSales'].sighash: {
                let f = spec.functions['enableSales'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionEnableSales({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'enableSales',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        salesEnabled: f[0],
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
                        operator: f[0],
                        from: f[1],
                        tokenId: f[2],
                        data: f[3],
                    })
                )
                break
            }
            case spec.functions['removeSupportedCurrency'].sighash: {
                let f = spec.functions['removeSupportedCurrency'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRemoveSupportedCurrency({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'removeSupportedCurrency',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        currencyAddress: f[0],
                    })
                )
                break
            }
            case spec.functions['removeSupportedNft'].sighash: {
                let f = spec.functions['removeSupportedNft'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRemoveSupportedNft({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'removeSupportedNft',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        nftAddress: f[0],
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
            case spec.functions['sell'].sighash: {
                let f = spec.functions['sell'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSell({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'sell',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        tokenId: f[0],
                        price: f[1],
                        nftAddress: f[2],
                        currency: f[3],
                    })
                )
                break
            }
            case spec.functions['setFeeRate'].sighash: {
                let f = spec.functions['setFeeRate'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetFeeRate({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setFeeRate',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        rate: f[0],
                    })
                )
                break
            }
            case spec.functions['setFeeReceiver'].sighash: {
                let f = spec.functions['setFeeReceiver'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetFeeReceiver({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setFeeReceiver',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        walletAddress: f[0],
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
        }
    }
    catch (error) {
        ctx.log.error({error, blockNumber: transaction.block.height, blockHash: transaction.block.hash, address}, `Unable to decode function "${transaction.input.slice(0, 10)}"`)
    }
}
