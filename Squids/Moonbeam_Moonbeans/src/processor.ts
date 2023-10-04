import {EvmBatchProcessor, EvmBatchProcessorFields, BlockHeader, Log as _Log, Transaction as _Transaction} from '@subsquid/evm-processor'
import {lookupArchive} from '@subsquid/archive-registry'
import * as contractAbi from './abi/Moonbeans'

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
        address: ['0x9ff0cf19f66ab00774de20b311825b7f65f23972'],
        topic0: [
            contractAbi.events['CollectionModified'].topic,
            contractAbi.events['EscrowReturned'].topic,
            contractAbi.events['OwnershipTransferred'].topic,
            contractAbi.events['TradeAccepted'].topic,
            contractAbi.events['TradeCancelled'].topic,
            contractAbi.events['TradeOpened'].topic,
        ],
        range: {
            from: 100000,
        },
    })
    .addTransaction({
        to: ['0x9ff0cf19f66ab00774de20b311825b7f65f23972'],
        sighash: [
            contractAbi.functions['acceptTrade'].sighash,
            contractAbi.functions['addMoneyToEscrow'].sighash,
            contractAbi.functions['cancelTrade'].sighash,
            contractAbi.functions['listCollection'].sighash,
            contractAbi.functions['openTrade'].sighash,
            contractAbi.functions['recover1155'].sighash,
            contractAbi.functions['recoverGAS'].sighash,
            contractAbi.functions['recoverToken'].sighash,
            contractAbi.functions['renounceOwnership'].sighash,
            contractAbi.functions['setAdmin'].sighash,
            contractAbi.functions['setCollectionOwner'].sighash,
            contractAbi.functions['setCollectionOwnerFee'].sighash,
            contractAbi.functions['setCollectionOwnersCanSetRoyalties'].sighash,
            contractAbi.functions['setCollectionTrading'].sighash,
            contractAbi.functions['setDefaultCollectionOwnerFee'].sighash,
            contractAbi.functions['setFeesOn'].sighash,
            contractAbi.functions['setTrading'].sighash,
            contractAbi.functions['transferOwnership'].sighash,
            contractAbi.functions['withdrawMoneyFromEscrow'].sighash,
        ],
        range: {
            from: 100000,
        },
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
