import {TypeormDatabase} from '@subsquid/typeorm-store'
import * as erc721abi from '../abi/erc721'
import * as erc1155abi from '../abi/erc1155'
import * as Moonbeans from '../abi/moonbeamMoonbeans'
import * as Seascape from '../abi/moonbeamSeascape'
import * as tofu from '../abi/moonbeamTofu'

import {processor} from './processor'
import * as modules from './mappings';
import * as utils from './mappings/utils'
import {Log, Transaction} from './processor'

// Chain
const chain = 'Moonbeam';

// Marketplace addresses
const moonbeansAddress = '0x9ff0cf19f66ab00774de20b311825b7f65f23972';
const seascapeAddress = '0x65763702806143a5326b40ecded5b17796696cb3';
const tofuAddress = '0x7bc8b1b5aba4df3be9f9a32dae501214dc0e4f3f';

processor.run(new TypeormDatabase({supportHotBlocks: false, stateSchema: 'eth_processor'}), async (ctx) => {

    utils.entity.initAllEntityManagers(ctx);
    await utils.entity.prefetchEntities(ctx);

    for (const block of ctx.blocks) {
        for (const log of block.logs) {
            switch (log.topics[0]) {
                case erc721abi.events['Transfer'].topic:
                    if (log.topics.length > 3) {
                        //console.log('Log ERC721:');
                        try {
                            await modules.handleErc721Transfer(log, chain);
                        } catch (error) {
                            console.error('Error decoding log:', error);
                        }
                    }
                    break;
                case erc1155abi.events['TransferBatch'].topic:
                    //console.log('Log ERC1155 TransferBatch:');
                    await modules.handleErc1155TransferBatch(log, chain);
                    break;
                case erc1155abi.events['TransferSingle'].topic:
                    //console.log('Log ERC1155 TransferSingle:');
                    await modules.handleErc1155TransferSingle(log, chain);
                    break;
                case erc1155abi.events['URI'].topic:
                    //console.log('Log ERC1155 URI:');
                    await modules.handleErc1155UriChanged(log);
                break;
            }
            // Marketplaces 
            if (log.address === moonbeansAddress) {
                switch (log.topics[0]) {
                    case Moonbeans.events['TradeAccepted'].topic:
                        console.log('Moonbeans TradeAccepted:');
                        await modules.handleMoonbeansSales(log, chain);
                        break;
                    case Moonbeans.events['TradeCancelled'].topic:
                        console.log('Moonbeans TradeCancelled:');
                        await modules.handleMoonbeansCancelList(log, chain);
                        break;
                    default:
                        // Handle unknown topic or simply skip
                        break;
                }
            }
        }

        for (let transaction of block.transactions) {
            if (transaction.to === seascapeAddress) {
                switch (transaction.input.slice(0, 10)) {                   
                    case Seascape.functions['buy'].sighash: {
                        console.log('Seascape Buy:', transaction);
                        await modules.handleSeascapeSales(transaction, chain);
                        break
                    }
                    case Seascape.functions['cancelSell'].sighash: {
                        console.log('Seascape cancelSell:', transaction);
                        await modules.handleSeascapeCancelList(transaction, chain);
                        break
                    }
                    case Seascape.functions['sell'].sighash: {
                        console.log('Seascape cancelSell:', transaction);
                        await modules.handleSeascapeListings(transaction, chain);
                        break
                    }
                }
            } else if (transaction.to === tofuAddress) {
                switch (transaction.input.slice(0, 10)) {                   
                    case tofu.functions['run'].sighash: {
                        console.log('Tofu run:', transaction);
                        await modules.handleTofuSales(transaction, chain);
                        break
                    }
                }
            }
        }
    }

    await utils.entity.saveAllEntities();
})
