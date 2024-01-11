import {TypeormDatabase} from '@subsquid/typeorm-store'
import * as erc721abi from '../abi/erc721'
import * as erc1155abi from '../abi/erc1155'
import * as Moonbeans from '../abi/moonriverMoonbeans'
import * as Seascape from '../abi/moonriverSeascape'

import {processor} from './processor'
import * as modules from './mappings';
import * as utils from './mappings/utils'
import {Log, Transaction} from './processor'

// Chain
const chain = 'Moonriver';

// Marketplace addresses
const moonbeansAddress = '0x16d7edd3a562bb60aa0b3af357a2c195ce2aa974';
const seascapeAddress = '0xdfd76e798d072ac187636b0a7e7fddc2f161642b';

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
                    case Moonbeans.events['TokenPurchased'].topic:
                        console.log('Moonbeans TokenPurchased:');
                        await modules.handleMoonbeansSales(log, chain);
                        break;
                    default:
                        // Handle unknown topic or simply skip
                        break;
                }
            }
            if (log.address === seascapeAddress) {
                switch (log.topics[0]) {
                    case Seascape.events['Sell'].topic:
                        console.log('Seascape Sell:');
                        await modules.handleSeascapeListings(log, chain);
                        break;
                    default:
                        // Handle unknown topic or simply skip
                        break;
                }
            }
        }

        for (let transaction of block.transactions) {
            if (transaction.to === moonbeansAddress) {
                switch (transaction.input.slice(0, 10)) {                   
                    case Moonbeans.functions['listToken'].sighash: {
                        console.log('Moonbeans listToken:', transaction);
                        await modules.handleMoonbeansListings(transaction, chain);
                        break
                    }
                    case Moonbeans.functions['delistToken'].sighash: {
                        console.log('Moonbeans delistToken:', transaction);
                        await modules.handleMoonbeansCancelList(transaction, chain);
                        break
                    }
                }
            }
            if (transaction.to === seascapeAddress) {
                switch (transaction.input.slice(0, 10)) {                   
                    case Seascape.functions['buy'].sighash: {
                        console.log('Seascape buy:', transaction);
                        await modules.handleSeascapeSales(transaction, chain);
                        break
                    }
                    case Seascape.functions['cancelSell'].sighash: {
                        console.log('Seascape cancelSell:', transaction);
                        await modules.handleSeascapeCancelList(transaction, chain);
                        break
                    }
                }
            }
        }
    }

    await utils.entity.saveAllEntities();
})
