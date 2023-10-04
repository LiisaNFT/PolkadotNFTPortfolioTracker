import {EvmBatchProcessor, EvmBatchProcessorFields, BlockHeader, Log as _Log, Transaction as _Transaction} from '@subsquid/evm-processor'
import {lookupArchive} from '@subsquid/archive-registry'
import * as contractAbi from './abi/nftTrade'

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
        address: ['0x4a3c80d5418eb3d9292c2186ec7ec0567e9f9da3'],
        topic0: [
            contractAbi.events['OwnershipTransferred'].topic,
        ],
        range: {
            from: 100000,
        },
    })
    .addTransaction({
        to: ['0x4a3c80d5418eb3d9292c2186ec7ec0567e9f9da3'],
        sighash: [
            contractAbi.functions['claimTokens'].sighash,
            contractAbi.functions['multisendToken'].sighash,
            contractAbi.functions['onERC1155BatchReceived'].sighash,
            contractAbi.functions['onERC1155Received'].sighash,
            contractAbi.functions['renounceOwnership'].sighash,
            contractAbi.functions['send1155To721Ids'].sighash,
            contractAbi.functions['send1155ToAddresses'].sighash,
            contractAbi.functions['send721Or20To721Ids'].sighash,
            contractAbi.functions['setEthFee'].sighash,
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
