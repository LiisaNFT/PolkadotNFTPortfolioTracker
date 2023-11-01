export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_feeReceiver"
            },
            {
                "type": "uint256",
                "name": "_feeRate"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Buy",
        "inputs": [
            {
                "type": "uint256",
                "name": "saleId",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": false
            },
            {
                "type": "address",
                "name": "buyer",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "price",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "tipsFee",
                "indexed": false
            },
            {
                "type": "address",
                "name": "currency",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "CancelSell",
        "inputs": [
            {
                "type": "uint256",
                "name": "saleId",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "NftReceived",
        "inputs": [
            {
                "type": "address",
                "name": "operator",
                "indexed": false
            },
            {
                "type": "address",
                "name": "from",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": false
            },
            {
                "type": "bytes",
                "name": "data",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "type": "address",
                "name": "previousOwner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newOwner",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Sell",
        "inputs": [
            {
                "type": "uint256",
                "name": "saleId",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": false
            },
            {
                "type": "address",
                "name": "nft",
                "indexed": false
            },
            {
                "type": "address",
                "name": "currency",
                "indexed": false
            },
            {
                "type": "address",
                "name": "seller",
                "indexed": false
            },
            {
                "type": "address",
                "name": "buyer",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "startTime",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "price",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "addSupportedCurrency",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_currencyAddress"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "addSupportedNft",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_nftAddress"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "buy",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            },
            {
                "type": "address",
                "name": "_nftAddress"
            },
            {
                "type": "address",
                "name": "_currency"
            },
            {
                "type": "uint256",
                "name": "_price"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "cancelSell",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            },
            {
                "type": "address",
                "name": "_nftAddress"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "enableSales",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bool",
                "name": "_salesEnabled"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "feeRate",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getSales",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            },
            {
                "type": "address",
                "name": "_nftAddress"
            }
        ],
        "outputs": [
            {
                "type": "tuple",
                "name": "",
                "components": [
                    {
                        "type": "uint256",
                        "name": "id"
                    },
                    {
                        "type": "uint256",
                        "name": "tokenId"
                    },
                    {
                        "type": "address",
                        "name": "nft"
                    },
                    {
                        "type": "address",
                        "name": "currency"
                    },
                    {
                        "type": "address",
                        "name": "seller"
                    },
                    {
                        "type": "address",
                        "name": "buyer"
                    },
                    {
                        "type": "uint256",
                        "name": "startTime"
                    },
                    {
                        "type": "uint256",
                        "name": "price"
                    },
                    {
                        "type": "uint8",
                        "name": "status"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "getSalesAmount",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getSalesPrice",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            },
            {
                "type": "address",
                "name": "_nftAddress"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "onERC721Received",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "operator"
            },
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "bytes",
                "name": "data"
            }
        ],
        "outputs": [
            {
                "type": "bytes4",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "owner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "removeSupportedCurrency",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_currencyAddress"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "removeSupportedNft",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_nftAddress"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "salesAmount",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "salesEnabled",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "sell",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            },
            {
                "type": "uint256",
                "name": "_price"
            },
            {
                "type": "address",
                "name": "_nftAddress"
            },
            {
                "type": "address",
                "name": "_currency"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "setFeeRate",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_rate"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setFeeReceiver",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_walletAddress"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "supportedCurrency",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "supportedNft",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "newOwner"
            }
        ],
        "outputs": []
    }
]
