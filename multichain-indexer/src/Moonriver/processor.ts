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
import * as Moonbeans from '../abi/moonriverMoonbeans'
import * as Seascape from '../abi/moonriverSeascape'
import * as tofu from '../abi/moonbeamTofu'



export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('moonriver', {type: 'EVM'}),
        chain: 'https://moonriver.public.blastapi.io',
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
        address: ['0x16d7edd3a562bb60aa0b3af357a2c195ce2aa974'],
        topic0: [
            Moonbeans.events.TokenPurchased.topic
        ],
        range: {
            from: 1670997,
        },
    })
    .addLog({
        address: ['0xdfd76e798d072ac187636b0a7e7fddc2f161642b'],
        topic0: [
            Seascape.events.Sell.topic
        ],
        range: {
            from: 1670997,
        },
    })
    .addTransaction({
        to: ['0x16d7edd3a562bb60aa0b3af357a2c195ce2aa974'],
        sighash: [
            Moonbeans.functions['listToken'].sighash,
            Moonbeans.functions['delistToken'].sighash
        ],
        range: {
            from: 1670997,
        },
    })
    .addTransaction({
        to: ['0xdfd76e798d072ac187636b0a7e7fddc2f161642b'],
        sighash: [
            Seascape.functions['cancelSell'].sighash,
            Seascape.functions['buy'].sighash
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
