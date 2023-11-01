export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "weth_"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "EvAuctionRefund",
        "inputs": [
            {
                "type": "uint256",
                "name": "id",
                "indexed": true
            },
            {
                "type": "address",
                "name": "bidder",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "refund",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "EvCouponSpent",
        "inputs": [
            {
                "type": "uint256",
                "name": "id",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "couponId",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "EvInventoryUpdate",
        "inputs": [
            {
                "type": "uint256",
                "name": "id",
                "indexed": true
            },
            {
                "type": "tuple",
                "name": "inventory",
                "indexed": false,
                "components": [
                    {
                        "type": "address",
                        "name": "seller"
                    },
                    {
                        "type": "address",
                        "name": "buyer"
                    },
                    {
                        "type": "address",
                        "name": "currency"
                    },
                    {
                        "type": "uint256",
                        "name": "price"
                    },
                    {
                        "type": "uint256",
                        "name": "netPrice"
                    },
                    {
                        "type": "uint256",
                        "name": "deadline"
                    },
                    {
                        "type": "uint8",
                        "name": "kind"
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
        "type": "event",
        "anonymous": false,
        "name": "EvMarketSignerUpdate",
        "inputs": [
            {
                "type": "address",
                "name": "addr",
                "indexed": false
            },
            {
                "type": "bool",
                "name": "isRemoval",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "EvSettingsUpdated",
        "inputs": []
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "EvSwapped",
        "inputs": [
            {
                "type": "tuple",
                "name": "req",
                "indexed": false,
                "components": [
                    {
                        "type": "bytes32",
                        "name": "salt"
                    },
                    {
                        "type": "address",
                        "name": "creator"
                    },
                    {
                        "type": "uint256",
                        "name": "deadline"
                    },
                    {
                        "type": "tuple[]",
                        "name": "has",
                        "components": [
                            {
                                "type": "address",
                                "name": "token"
                            },
                            {
                                "type": "uint256",
                                "name": "tokenId"
                            }
                        ]
                    },
                    {
                        "type": "tuple[]",
                        "name": "wants",
                        "components": [
                            {
                                "type": "address",
                                "name": "token"
                            },
                            {
                                "type": "uint256",
                                "name": "tokenId"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "bytes",
                "name": "signature",
                "indexed": false
            },
            {
                "type": "address",
                "name": "swapper",
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
        "name": "Paused",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Unpaused",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "KIND_AUCTION",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "KIND_BUY",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "KIND_SELL",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "OP_ACCEPT_AUCTION",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "OP_ACCEPT_BUY",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "OP_BID",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "OP_BUY",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "OP_CANCEL_BUY",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "OP_COMPLETE_AUCTION",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "OP_COMPLETE_BUY",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "OP_COMPLETE_SELL",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "OP_MAX",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "OP_MIN",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "OP_REJECT_BUY",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "RATE_BASE",
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
        "name": "STATUS_CANCELLED",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "STATUS_DONE",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "STATUS_OPEN",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "TOKEN_1155",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "TOKEN_721",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "TOKEN_MINT",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "cancelBuys",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256[]",
                "name": "ids"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "couponSpent",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
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
        "name": "emergencyCancelAuction",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "id"
            },
            {
                "type": "bool",
                "name": "noBundle"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "hasInv",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "id"
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
        "name": "hasSignedIntention",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "uint8",
                "name": "op"
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
        "name": "inCaseMoneyGetsStuck",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "address",
                "name": "currency"
            },
            {
                "type": "uint256",
                "name": "amount"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "inventories",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "seller"
            },
            {
                "type": "address",
                "name": "buyer"
            },
            {
                "type": "address",
                "name": "currency"
            },
            {
                "type": "uint256",
                "name": "price"
            },
            {
                "type": "uint256",
                "name": "netPrice"
            },
            {
                "type": "uint256",
                "name": "deadline"
            },
            {
                "type": "uint8",
                "name": "kind"
            },
            {
                "type": "uint8",
                "name": "status"
            }
        ]
    },
    {
        "type": "function",
        "name": "inventoryTokenCounts",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
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
        "name": "inventoryTokens",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "uint8",
                "name": "kind"
            },
            {
                "type": "bytes",
                "name": "mintData"
            }
        ]
    },
    {
        "type": "function",
        "name": "isAuction",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "id"
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
        "name": "isAuctionOpen",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "id"
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
        "name": "isBundleApproved",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "invId"
            },
            {
                "type": "address",
                "name": "owner"
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
        "name": "isBuy",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "id"
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
        "name": "isBuyOpen",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "id"
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
        "name": "isExpired",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "id"
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
        "name": "isSell",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "id"
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
        "name": "isSignatureValid",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "bytes",
                "name": "signature"
            },
            {
                "type": "bytes32",
                "name": "hash"
            },
            {
                "type": "address",
                "name": "signer"
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
        "name": "isStatusOpen",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "id"
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
        "name": "marketSigners",
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
        "name": "minAuctionDuration",
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
        "name": "minAuctionIncrement",
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
        "name": "onERC1155BatchReceived",
        "constant": true,
        "stateMutability": "view",
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
                "type": "uint256[]",
                "name": "ids"
            },
            {
                "type": "uint256[]",
                "name": "values"
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
        "name": "onERC1155Received",
        "constant": true,
        "stateMutability": "view",
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
                "name": "id"
            },
            {
                "type": "uint256",
                "name": "value"
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
        "name": "onERC721Received",
        "constant": true,
        "stateMutability": "view",
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
        "name": "pause",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "paused",
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
        "name": "renounceOwnership",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "run",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "tuple",
                "name": "intent",
                "components": [
                    {
                        "type": "address",
                        "name": "user"
                    },
                    {
                        "type": "tuple[]",
                        "name": "bundle",
                        "components": [
                            {
                                "type": "address",
                                "name": "token"
                            },
                            {
                                "type": "uint256",
                                "name": "tokenId"
                            },
                            {
                                "type": "uint256",
                                "name": "amount"
                            },
                            {
                                "type": "uint8",
                                "name": "kind"
                            },
                            {
                                "type": "bytes",
                                "name": "mintData"
                            }
                        ]
                    },
                    {
                        "type": "address",
                        "name": "currency"
                    },
                    {
                        "type": "uint256",
                        "name": "price"
                    },
                    {
                        "type": "uint256",
                        "name": "deadline"
                    },
                    {
                        "type": "bytes32",
                        "name": "salt"
                    },
                    {
                        "type": "uint8",
                        "name": "kind"
                    }
                ]
            },
            {
                "type": "tuple",
                "name": "detail",
                "components": [
                    {
                        "type": "bytes32",
                        "name": "intentionHash"
                    },
                    {
                        "type": "address",
                        "name": "signer"
                    },
                    {
                        "type": "uint256",
                        "name": "txDeadline"
                    },
                    {
                        "type": "bytes32",
                        "name": "salt"
                    },
                    {
                        "type": "uint256",
                        "name": "id"
                    },
                    {
                        "type": "uint8",
                        "name": "opcode"
                    },
                    {
                        "type": "address",
                        "name": "caller"
                    },
                    {
                        "type": "address",
                        "name": "currency"
                    },
                    {
                        "type": "uint256",
                        "name": "price"
                    },
                    {
                        "type": "uint256",
                        "name": "incentiveRate"
                    },
                    {
                        "type": "tuple",
                        "name": "settlement",
                        "components": [
                            {
                                "type": "uint256[]",
                                "name": "coupons"
                            },
                            {
                                "type": "uint256",
                                "name": "feeRate"
                            },
                            {
                                "type": "uint256",
                                "name": "royaltyRate"
                            },
                            {
                                "type": "uint256",
                                "name": "buyerCashbackRate"
                            },
                            {
                                "type": "address",
                                "name": "feeAddress"
                            },
                            {
                                "type": "address",
                                "name": "royaltyAddress"
                            }
                        ]
                    },
                    {
                        "type": "tuple[]",
                        "name": "bundle",
                        "components": [
                            {
                                "type": "address",
                                "name": "token"
                            },
                            {
                                "type": "uint256",
                                "name": "tokenId"
                            },
                            {
                                "type": "uint256",
                                "name": "amount"
                            },
                            {
                                "type": "uint8",
                                "name": "kind"
                            },
                            {
                                "type": "bytes",
                                "name": "mintData"
                            }
                        ]
                    },
                    {
                        "type": "uint256",
                        "name": "deadline"
                    }
                ]
            },
            {
                "type": "bytes",
                "name": "sigIntent"
            },
            {
                "type": "bytes",
                "name": "sigDetail"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "send",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "tuple[]",
                "name": "tokens",
                "components": [
                    {
                        "type": "address",
                        "name": "token"
                    },
                    {
                        "type": "uint256",
                        "name": "tokenId"
                    }
                ]
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "bytes4",
                "name": "interfaceId"
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
        "name": "swap",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple",
                "name": "req",
                "components": [
                    {
                        "type": "bytes32",
                        "name": "salt"
                    },
                    {
                        "type": "address",
                        "name": "creator"
                    },
                    {
                        "type": "uint256",
                        "name": "deadline"
                    },
                    {
                        "type": "tuple[]",
                        "name": "has",
                        "components": [
                            {
                                "type": "address",
                                "name": "token"
                            },
                            {
                                "type": "uint256",
                                "name": "tokenId"
                            }
                        ]
                    },
                    {
                        "type": "tuple[]",
                        "name": "wants",
                        "components": [
                            {
                                "type": "address",
                                "name": "token"
                            },
                            {
                                "type": "uint256",
                                "name": "tokenId"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "bytes",
                "name": "signature"
            }
        ],
        "outputs": []
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
    },
    {
        "type": "function",
        "name": "unpause",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "updateSettings",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "minAuctionIncrement_"
            },
            {
                "type": "uint256",
                "name": "minAuctionDuration_"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "updateSigner",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "addr"
            },
            {
                "type": "bool",
                "name": "remove"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "weth",
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
        "type": "receive",
        "stateMutability": "payable"
    }
]
