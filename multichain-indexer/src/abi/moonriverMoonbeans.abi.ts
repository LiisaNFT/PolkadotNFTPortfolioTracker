export const ABI_JSON = [
    {
        "type": "event",
        "anonymous": false,
        "name": "BidCancelled",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "id",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "price",
                "indexed": true
            },
            {
                "type": "address",
                "name": "buyer",
                "indexed": false
            },
            {
                "type": "bool",
                "name": "escrowed",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "timestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "BidPlaced",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "id",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "price",
                "indexed": true
            },
            {
                "type": "address",
                "name": "buyer",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "timestamp",
                "indexed": false
            },
            {
                "type": "bool",
                "name": "escrowed",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "EscrowReturned",
        "inputs": [
            {
                "type": "address",
                "name": "user",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "price",
                "indexed": true
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
        "name": "TokenDelisted",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "id",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "timestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TokenListed",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "id",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "price",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "timestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TokenPurchased",
        "inputs": [
            {
                "type": "address",
                "name": "oldOwner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newOwner",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "price",
                "indexed": true
            },
            {
                "type": "address",
                "name": "collection",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "RecoverMOVR",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
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
        "name": "TOKEN",
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
        "name": "acceptOffer",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "uint256",
                "name": "price"
            },
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "bool",
                "name": "escrowedBid"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "addMoneyToEscrow",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "beanBuybackAddress",
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
        "name": "beanBuybackFee",
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
        "name": "beanieHolderAddress",
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
        "name": "beanieHolderFee",
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
        "name": "cancelOffer",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "uint256",
                "name": "price"
            },
            {
                "type": "bool",
                "name": "escrowed"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "checkEscrowAmount",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "user"
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
        "name": "clearAllBids",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "clearAllListings",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "clearBidsAfterAcceptingOffer",
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
        "name": "defaultCollectionOwnerFee",
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
        "name": "delistAfterAcceptingOffer",
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
        "name": "delistToken",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "devAddress",
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
        "name": "devFee",
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
        "name": "featuredCollection",
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
        "name": "feesOn",
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
        "name": "fulfillListing",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "getCollectionFee",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
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
        "name": "getCollectionOwner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getCurrentListing",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": [
            {
                "type": "tuple",
                "name": "",
                "components": [
                    {
                        "type": "uint256",
                        "name": "price"
                    },
                    {
                        "type": "uint256",
                        "name": "timestamp"
                    },
                    {
                        "type": "uint256",
                        "name": "tokenId"
                    },
                    {
                        "type": "bool",
                        "name": "accepted"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "getCurrentListingPrice",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
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
        "name": "getEscrowedAmount",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "user"
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
        "name": "getOffers",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": [
            {
                "type": "tuple[]",
                "name": "",
                "components": [
                    {
                        "type": "uint256",
                        "name": "price"
                    },
                    {
                        "type": "uint256",
                        "name": "timestamp"
                    },
                    {
                        "type": "bool",
                        "name": "accepted"
                    },
                    {
                        "type": "address",
                        "name": "buyer"
                    },
                    {
                        "type": "bool",
                        "name": "escrowed"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "getTokenListingHistory",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": [
            {
                "type": "tuple[]",
                "name": "",
                "components": [
                    {
                        "type": "uint256",
                        "name": "price"
                    },
                    {
                        "type": "uint256",
                        "name": "timestamp"
                    },
                    {
                        "type": "uint256",
                        "name": "tokenId"
                    },
                    {
                        "type": "bool",
                        "name": "accepted"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "isCollectionTrading",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
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
        "name": "isListed",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
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
        "name": "listToken",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "uint256",
                "name": "price"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "makeEscrowedOffer",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "uint256",
                "name": "price"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "makeOffer",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "uint256",
                "name": "price"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "onERC721Received",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "bytes",
                "name": ""
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
        "name": "recoverNFT",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_token"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "recoverToken",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_token"
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
        "name": "renounceOwnership",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setBeanBuyBackFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "fee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setBeanBuybackAddress",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_address"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setBeanieHolderAddress",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_address"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setBeanieHolderFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "fee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setClearBidsAfterAcceptingOffer",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bool",
                "name": "_value"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setCollectionOwner",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "address",
                "name": "owner"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setCollectionOwnerFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "uint256",
                "name": "fee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setCollectionTrading",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "bool",
                "name": "value"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setDelistAfterAcceptingOffer",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bool",
                "name": "_value"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setDevAddress",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_address"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setDevFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "fee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setFeaturedCollection",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_collection"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setFeesOn",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bool",
                "name": "_value"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setSpecialGasTax",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "gasAmount"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setSuperGasTaxes",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bool",
                "name": "value"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setTrading",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bool",
                "name": "value"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "specialTaxGas",
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
        "name": "totalEscrowedAmount",
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
        "name": "totalFees",
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
        "name": "tradingPaused",
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
        "name": "useSuperGasTaxes",
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
        "name": "withdrawMoneyFromEscrow",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amount"
            }
        ],
        "outputs": []
    },
    {
        "type": "receive",
        "stateMutability": "payable"
    }
]
