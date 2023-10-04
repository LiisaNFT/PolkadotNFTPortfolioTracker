import {EvmBatchProcessor, EvmBatchProcessorFields, BlockHeader, Log as _Log, Transaction as _Transaction} from '@subsquid/evm-processor'
import {lookupArchive} from '@subsquid/archive-registry'
import * as contractAbi from './abi/moonbeans'

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
        address: ['0x16d7edd3a562bb60aa0b3af357a2c195ce2aa974'],
        topic0: [
            contractAbi.events['BidCancelled'].topic,
            contractAbi.events['BidPlaced'].topic,
            contractAbi.events['EscrowReturned'].topic,
            contractAbi.events['OwnershipTransferred'].topic,
            contractAbi.events['TokenDelisted'].topic,
            contractAbi.events['TokenListed'].topic,
            contractAbi.events['TokenPurchased'].topic,
        ],
        range: {
            from: 100000,
        },
    })
    .addTransaction({
        to: ['0x16d7edd3a562bb60aa0b3af357a2c195ce2aa974'],
        sighash: [
            contractAbi.functions['RecoverMOVR'].sighash,
            contractAbi.functions['acceptOffer'].sighash,
            contractAbi.functions['addMoneyToEscrow'].sighash,
            contractAbi.functions['cancelOffer'].sighash,
            contractAbi.functions['clearAllBids'].sighash,
            contractAbi.functions['clearAllListings'].sighash,
            contractAbi.functions['delistToken'].sighash,
            contractAbi.functions['fulfillListing'].sighash,
            contractAbi.functions['listToken'].sighash,
            contractAbi.functions['makeEscrowedOffer'].sighash,
            contractAbi.functions['makeOffer'].sighash,
            contractAbi.functions['onERC721Received'].sighash,
            contractAbi.functions['recoverNFT'].sighash,
            contractAbi.functions['recoverToken'].sighash,
            contractAbi.functions['renounceOwnership'].sighash,
            contractAbi.functions['setBeanBuyBackFee'].sighash,
            contractAbi.functions['setBeanBuybackAddress'].sighash,
            contractAbi.functions['setBeanieHolderAddress'].sighash,
            contractAbi.functions['setBeanieHolderFee'].sighash,
            contractAbi.functions['setClearBidsAfterAcceptingOffer'].sighash,
            contractAbi.functions['setCollectionOwner'].sighash,
            contractAbi.functions['setCollectionOwnerFee'].sighash,
            contractAbi.functions['setCollectionTrading'].sighash,
            contractAbi.functions['setDelistAfterAcceptingOffer'].sighash,
            contractAbi.functions['setDevAddress'].sighash,
            contractAbi.functions['setDevFee'].sighash,
            contractAbi.functions['setFeaturedCollection'].sighash,
            contractAbi.functions['setFeesOn'].sighash,
            contractAbi.functions['setSpecialGasTax'].sighash,
            contractAbi.functions['setSuperGasTaxes'].sighash,
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
