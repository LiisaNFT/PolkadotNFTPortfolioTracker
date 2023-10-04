import {DataHandlerContext} from '@subsquid/evm-processor'
import {toJSON} from '@subsquid/util-internal-json'
import {Store} from '../db'
import {EntityBuffer} from '../entityBuffer'
import {ContractEventOwnershipTransferred, ContractFunctionClaimTokens, ContractFunctionMultisendToken, ContractFunctionOnErc1155BatchReceived, ContractFunctionOnErc1155Received, ContractFunctionRenounceOwnership, ContractFunctionSend1155To721Ids, ContractFunctionSend1155ToAddresses, ContractFunctionSend721Or20To721Ids, ContractFunctionSetEthFee, ContractFunctionSetFeeReceiver, ContractFunctionTransferOwnership} from '../model'
import * as spec from '../abi/nftTrade'
import {Log, Transaction} from '../processor'

const address = '0x4a3c80d5418eb3d9292c2186ec7ec0567e9f9da3'


export function parseEvent(ctx: DataHandlerContext<Store>, log: Log) {
    try {
        switch (log.topics[0]) {
            case spec.events['OwnershipTransferred'].topic: {
                let e = spec.events['OwnershipTransferred'].decode(log)
                EntityBuffer.add(
                    new ContractEventOwnershipTransferred({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'OwnershipTransferred',
                        previousOwner: e[0],
                        newOwner: e[1],
                    })
                )
                break
            }
        }
    }
    catch (error) {
        ctx.log.error({error, blockNumber: log.block.height, blockHash: log.block.hash, address}, `Unable to decode event "${log.topics[0]}"`)
    }
}

export function parseFunction(ctx: DataHandlerContext<Store>, transaction: Transaction) {
    try {
        switch (transaction.input.slice(0, 10)) {
            case spec.functions['claimTokens'].sighash: {
                let f = spec.functions['claimTokens'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionClaimTokens({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'claimTokens',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        token: f[0],
                    })
                )
                break
            }
            case spec.functions['multisendToken'].sighash: {
                let f = spec.functions['multisendToken'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionMultisendToken({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'multisendToken',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        tokenAddress: f[0],
                        userAddresses: toJSON(f[1]),
                        amountsOrIds: toJSON(f[2]),
                    })
                )
                break
            }
            case spec.functions['onERC1155BatchReceived'].sighash: {
                let f = spec.functions['onERC1155BatchReceived'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionOnErc1155BatchReceived({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'onERC1155BatchReceived',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        param0: f[0],
                        param1: f[1],
                        param2: toJSON(f[2]),
                        param3: toJSON(f[3]),
                        param4: f[4],
                    })
                )
                break
            }
            case spec.functions['onERC1155Received'].sighash: {
                let f = spec.functions['onERC1155Received'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionOnErc1155Received({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'onERC1155Received',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        param0: f[0],
                        param1: f[1],
                        param2: f[2],
                        param3: f[3],
                        param4: f[4],
                    })
                )
                break
            }
            case spec.functions['renounceOwnership'].sighash: {
                let f = spec.functions['renounceOwnership'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRenounceOwnership({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'renounceOwnership',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                    })
                )
                break
            }
            case spec.functions['send1155To721Ids'].sighash: {
                let f = spec.functions['send1155To721Ids'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSend1155To721Ids({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'send1155To721Ids',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        erc721Addresses: toJSON(f[0]),
                        erc721Ids: toJSON(f[1]),
                        tokenIds: toJSON(f[2]),
                        amounts: toJSON(f[3]),
                        tokenAddress: f[4],
                    })
                )
                break
            }
            case spec.functions['send1155ToAddresses'].sighash: {
                let f = spec.functions['send1155ToAddresses'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSend1155ToAddresses({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'send1155ToAddresses',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        userAddresses: toJSON(f[0]),
                        tokenIds: toJSON(f[1]),
                        amounts: toJSON(f[2]),
                        tokenAddress: f[3],
                    })
                )
                break
            }
            case spec.functions['send721Or20To721Ids'].sighash: {
                let f = spec.functions['send721Or20To721Ids'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSend721Or20To721Ids({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'send721Or20To721Ids',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        erc721Addresses: toJSON(f[0]),
                        receiverIds: toJSON(f[1]),
                        amountsOrIds: toJSON(f[2]),
                        tokenAddress: f[3],
                    })
                )
                break
            }
            case spec.functions['setEthFee'].sighash: {
                let f = spec.functions['setEthFee'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetEthFee({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setEthFee',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        f: f[0],
                    })
                )
                break
            }
            case spec.functions['setFeeReceiver'].sighash: {
                let f = spec.functions['setFeeReceiver'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetFeeReceiver({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setFeeReceiver',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        a: f[0],
                    })
                )
                break
            }
            case spec.functions['transferOwnership'].sighash: {
                let f = spec.functions['transferOwnership'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionTransferOwnership({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'transferOwnership',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        newOwner: f[0],
                    })
                )
                break
            }
        }
    }
    catch (error) {
        ctx.log.error({error, blockNumber: transaction.block.height, blockHash: transaction.block.hash, address}, `Unable to decode function "${transaction.input.slice(0, 10)}"`)
    }
}
