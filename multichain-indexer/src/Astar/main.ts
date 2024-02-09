import {TypeormDatabase} from '@subsquid/typeorm-store'
import * as erc721abi from '../abi/erc721'
import * as erc1155abi from '../abi/erc1155'
import * as tofu from '../abi/astarTofu'
import {processor} from './processor'
import * as modules from './mappings';
import * as utils from './mappings/utils'

// Chain
const chain = 'Astar';

// Marketplace addresses
const tofuAddress = '0x7cae7feb55349feadb8f84468f692450d92597bc';

processor.run(new TypeormDatabase({supportHotBlocks: false, stateSchema: 'astar_processor'}), async (ctx) => {

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
        }

        for (let transaction of block.transactions) {
            if (transaction.to === tofuAddress) {
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
