export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": []
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
        "type": "function",
        "name": "arrayLimit",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "array_limit",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "claimTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_token"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "currentFee",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_customer"
            }
        ],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "ethFee",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "feeReceiver",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "multisendToken",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "tokenAddress"
            },
            {
                "type": "address[]",
                "name": "userAddresses"
            },
            {
                "type": "uint256[]",
                "name": "amountsOrIds"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "onERC1155BatchReceived",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address"
            },
            {
                "type": "address"
            },
            {
                "type": "uint256[]"
            },
            {
                "type": "uint256[]"
            },
            {
                "type": "bytes"
            }
        ],
        "outputs": [
            {
                "type": "bytes4"
            }
        ]
    },
    {
        "type": "function",
        "name": "onERC1155Received",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address"
            },
            {
                "type": "address"
            },
            {
                "type": "uint256"
            },
            {
                "type": "uint256"
            },
            {
                "type": "bytes"
            }
        ],
        "outputs": [
            {
                "type": "bytes4"
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
                "type": "address"
            }
        ]
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
        "name": "send1155To721Ids",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address[]",
                "name": "erc721Addresses"
            },
            {
                "type": "uint256[]",
                "name": "erc721Ids"
            },
            {
                "type": "uint256[]",
                "name": "tokenIds"
            },
            {
                "type": "uint256[]",
                "name": "amounts"
            },
            {
                "type": "address",
                "name": "tokenAddress"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "send1155ToAddresses",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address[]",
                "name": "userAddresses"
            },
            {
                "type": "uint256[]",
                "name": "tokenIds"
            },
            {
                "type": "uint256[]",
                "name": "amounts"
            },
            {
                "type": "address",
                "name": "tokenAddress"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "send721Or20To721Ids",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address[]",
                "name": "erc721Addresses"
            },
            {
                "type": "uint256[]",
                "name": "receiverIds"
            },
            {
                "type": "uint256[]",
                "name": "amountsOrIds"
            },
            {
                "type": "address",
                "name": "tokenAddress"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setEthFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "f"
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
                "name": "a"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes4",
                "name": "interfaceId"
            }
        ],
        "outputs": [
            {
                "type": "bool"
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
