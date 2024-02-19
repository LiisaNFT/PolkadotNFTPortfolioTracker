import * as functions from '../functions';

functions.fetch24hSales('http://localhost:4350', {
    collectionId: '0x51737fa634e26f5687e45c6ca07604e064076350',
    chain: 'Moonbeam', 
});