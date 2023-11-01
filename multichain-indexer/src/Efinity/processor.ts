import {lookupArchive} from '@subsquid/archive-registry'
import {
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {
    BlockHeader,
    DataHandlerContext,
    SubstrateBatchProcessor,
    SubstrateBatchProcessorFields,
    Event as _Event,
    Call as _Call,
    Extrinsic as _Extrinsic
} from '@subsquid/substrate-processor'
import {Store} from '@subsquid/typeorm-store'
import * as erc721abi from '../abi/erc721'
import * as erc1155abi from '../abi/erc1155'



export const processor = new SubstrateBatchProcessor()
    .setDataSource({
        archive: lookupArchive('enjin-matrix', { type: 'Substrate' }),
        chain: 'wss:/enjin-matrix-rpc-1.dwellir.com',
    })
    .setFields({
        event: {
            name: string,
            args: true
        },
        extrinsic: {
            hash: true,
            fee: true
        },
        block: {
            timestamp: true
        }
    })
    .addEvmLog({
        topic0: [erc721abi.events.Transfer.topic],
        range: {
            from: 1670997,
        },
    })
    .addEvmLog({
        topic0: [erc1155abi.events.TransferSingle.topic],
        range: {
            from: 1670997,
        },
    })
    .addEvmLog({
        topic0: [erc1155abi.events.TransferBatch.topic],
        range: {
            from: 1670997,
        },
    })
    .addEvmLog({
        topic0: [erc1155abi.events.URI.topic],
        range: {
            from: 1670997,
        },
    })
export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>