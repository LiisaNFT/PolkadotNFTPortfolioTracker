import {EvmBatchProcessor, EvmBatchProcessorFields, BlockHeader, Log as _Log, Transaction as _Transaction} from '@subsquid/evm-processor'
import {lookupArchive} from '@subsquid/archive-registry'
import * as contractAbi from './abi/seascape'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('moonbeam', {type: 'EVM'}),
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
        address: ['0x65763702806143a5326b40ecded5b17796696cb3'],
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
        to: ['0x65763702806143a5326b40ecded5b17796696cb3'],
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
