import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {Store} from '@subsquid/typeorm-store'
import * as erc721abi from '../abi/erc721'
import * as erc1155abi from '../abi/erc1155'
import * as Moonbeans from '../abi/moonbeamMoonbeans'
import * as Seascape from '../abi/moonbeamSeascape'
import * as tofu from '../abi/moonbeamTofu'



export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('moonbeam', {type: 'EVM'}),
    })
    .setFinalityConfirmation(75)
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
        topic0: [erc721abi.events.Transfer.topic],
        range: {
            from: 1670997,
        },
    })
    .addLog({
        topic0: [erc1155abi.events.TransferSingle.topic],
        range: {
            from: 1670997,
        },
    })
    .addLog({
        topic0: [erc1155abi.events.TransferBatch.topic],
        range: {
            from: 1670997,
        },
    })
    .addLog({
        topic0: [erc1155abi.events.URI.topic],
        range: {
            from: 1670997,
        },
    })
    .addLog({
        address: ['0x9ff0cf19f66ab00774de20b311825b7f65f23972'],
        topic0: [
            Moonbeans.events.TradeAccepted.topic,
            Moonbeans.events.TradeCancelled.topic
        ],
        range: {
            from: 1670997,
        },
    })
    .addTransaction({
        to: ['0x65763702806143a5326b40ecded5b17796696cb3'],
        sighash: [
            Seascape.functions['buy'].sighash,
            Seascape.functions['cancelSell'].sighash,
            Seascape.functions['sell'].sighash
        ],
        range: {
            from: 1670997,
        },
    })
    .addTransaction({
        to: ['0x7bc8b1b5aba4df3be9f9a32dae501214dc0e4f3f'],
        sighash: [
            tofu.functions['run'].sighash
        ],
        range: {
            from: 1670997,
        },
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
