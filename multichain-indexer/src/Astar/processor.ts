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
import * as tofu from '../abi/astarTofu'



export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('astar', {type: 'EVM'})
    })
    .setBlockRange({ from: 1670997 })
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
    .addTransaction({
        to: ['0x7cae7feb55349feadb8f84468f692450d92597bc'],
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
