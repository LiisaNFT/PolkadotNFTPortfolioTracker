import {EvmBatchProcessor, EvmBatchProcessorFields, BlockHeader, Log as _Log, Transaction as _Transaction} from '@subsquid/evm-processor'
import {lookupArchive} from '@subsquid/archive-registry'
import * as contractAbi from './abi/seascape'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('moonriver', {type: 'EVM'}),
    })
    .setFields({
            log: {
                topics: true,
                data: true,
                transactionHash: true,
            },
            transaction: {
                hash: true,
                input: true,
                from: true,
                value: true,
                status: true,
        }
    })
    .addLog({
        address: ['0xdfd76e798d072ac187636b0a7e7fddc2f161642b'],
        topic0: [
            contractAbi.events['Buy'].topic,
            contractAbi.events['CancelSell'].topic,
            contractAbi.events['NftReceived'].topic,
            contractAbi.events['OwnershipTransferred'].topic,
            contractAbi.events['Sell'].topic,
        ],
        range: {
            from: 100000,
        },
    })
    .addTransaction({
        to: ['0xdfd76e798d072ac187636b0a7e7fddc2f161642b'],
        sighash: [
            contractAbi.functions['addSupportedCurrency'].sighash,
            contractAbi.functions['addSupportedNft'].sighash,
            contractAbi.functions['buy'].sighash,
            contractAbi.functions['cancelSell'].sighash,
            contractAbi.functions['enableSales'].sighash,
            contractAbi.functions['onERC721Received'].sighash,
            contractAbi.functions['removeSupportedCurrency'].sighash,
            contractAbi.functions['removeSupportedNft'].sighash,
            contractAbi.functions['renounceOwnership'].sighash,
            contractAbi.functions['sell'].sighash,
            contractAbi.functions['setFeeRate'].sighash,
            contractAbi.functions['setFeeReceiver'].sighash,
            contractAbi.functions['transferOwnership'].sighash,
        ],
        range: {
            from: 100000,
        },
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
