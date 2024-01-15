import { TypeormDatabase } from '@subsquid/typeorm-store';
import * as ss58 from "@subsquid/ss58";
import * as psp34_inkv4 from "../abi/psp34_inkv4";
import { processor } from './processor';
import * as utils from './mappings/utils'
import * as modules from './mappings';


const CONTRACT_ADDRESS_SS58 = "XnrLUQucQvzp5kaaWLG9Q3LbZw5DPwpGn69B5YcywSWVr5w";
const SS58_PREFIX = ss58.decode(CONTRACT_ADDRESS_SS58).prefix;
const chain = 'Astar';

function convertToBigInt(tokenId: number | bigint | Uint8Array): bigint {
    if (typeof tokenId === 'bigint') {
        return tokenId;
    } else if (typeof tokenId === 'number') {
        return BigInt(tokenId);
    } else if (tokenId instanceof Uint8Array) {
        // Assuming tokenId is a big-endian Uint8Array
        let hex = Array.from(tokenId).map(b => b.toString(16).padStart(2, '0')).join('');
        return BigInt('0x' + hex);
    } else {
        throw new TypeError("tokenId is of an unrecognized type");
    }
}


processor.run(new TypeormDatabase(), async (ctx) => {

    utils.entity.initAllEntityManagers(ctx);
    await utils.entity.prefetchEntities(ctx);

    for (const block of ctx.blocks) {
        for (const item of block.items) {
            if (item.name === "Contracts.ContractEmitted") {
                
                let event;

                try {
                    event = psp34_inkv4.decodeEvent(item.event.args.data);
                } catch {
                    continue;
                }

                if (event.__kind === "Transfer") {

                    const contractAddress = ss58
                    .codec(SS58_PREFIX)
                    .encode(
                        Buffer.from(item.event.args.contract.replace("0x", ""), "hex")
                    );
                    const tokenId = convertToBigInt(event.id.value);
                    const from = event.from ? ss58.codec(SS58_PREFIX).encode(event.from).toString() : '';
                    const to = event.to ? ss58.codec(SS58_PREFIX).encode(event.to).toString() : '';

                    try {
                        await modules.handlePsp34Transfer(contractAddress, block.header.height, tokenId, from, to, block.header.timestamp, chain);
                    } catch (error) {
                        console.error('Error decoding log:', error);
                    }
                    
                }
            }
        }
    }

    await utils.entity.saveAllEntities();
});
