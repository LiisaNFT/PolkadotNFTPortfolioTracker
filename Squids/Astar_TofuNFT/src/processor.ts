import {EvmBatchProcessor, EvmBatchProcessorFields, BlockHeader, Log as _Log, Transaction as _Transaction} from '@subsquid/evm-processor'
import {lookupArchive} from '@subsquid/archive-registry'
import * as contractAbi from './abi/tofu'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('astar', {type: 'EVM'}),
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
        address: ['0x7cae7feb55349feadb8f84468f692450d92597bc'],
        topic0: [
            contractAbi.events['EvAuctionRefund'].topic,
            contractAbi.events['EvCouponSpent'].topic,
            contractAbi.events['EvInventoryUpdate'].topic,
            contractAbi.events['EvMarketSignerUpdate'].topic,
            contractAbi.events['EvSettingsUpdated'].topic,
            contractAbi.events['EvSwapped'].topic,
            contractAbi.events['OwnershipTransferred'].topic,
            contractAbi.events['Paused'].topic,
            contractAbi.events['Unpaused'].topic,
        ],
        range: {
            from: 100000,
        },
    })
    .addTransaction({
        to: ['0x7cae7feb55349feadb8f84468f692450d92597bc'],
        sighash: [
            contractAbi.functions['cancelBuys'].sighash,
            contractAbi.functions['emergencyCancelAuction'].sighash,
            contractAbi.functions['hasSignedIntention'].sighash,
            contractAbi.functions['inCaseMoneyGetsStuck'].sighash,
            contractAbi.functions['isSignatureValid'].sighash,
            contractAbi.functions['pause'].sighash,
            contractAbi.functions['renounceOwnership'].sighash,
            contractAbi.functions['run'].sighash,
            contractAbi.functions['send'].sighash,
            contractAbi.functions['supportsInterface'].sighash,
            contractAbi.functions['swap'].sighash,
            contractAbi.functions['transferOwnership'].sighash,
            contractAbi.functions['unpause'].sighash,
            contractAbi.functions['updateSettings'].sighash,
            contractAbi.functions['updateSigner'].sighash,
        ],
        range: {
            from: 100000,
        },
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
