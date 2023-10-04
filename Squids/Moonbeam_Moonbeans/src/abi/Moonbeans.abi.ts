export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_token"
            },
            {
                "type": "address",
                "name": "_beanFeeProcessor"
            }
        ]
    },
    {
        "type": "error",
        "name": "BEAN_AmountOverQuantity",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_BuyOrderWithValue",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_BuyerAccountUnderfunded",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_CollectionNotEnabled",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_ContractNotApproved",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_EscrowCurrencyUnderfunded",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_EscrowOverWithdraw",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_IntegerOverFlow",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_NoEscrowedSell",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_NotAuthorized",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_NotEnoughInEscrow",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_NotEnoughMakerFunds",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_NotEnoughSellerAllowance",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_NotEnoughTokensToFulfill",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_NotOwnerOrAdmin",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_OrderDoesNotExist",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_OrderExpired",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_PaymentTokenNotApproved",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_SellAssetBalanceLow",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_SellFulfillUnderfunded",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_TradeNotPartialFill",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_TradingPaused",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_TransferFailed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_WithdrawNotEnabled",
        "inputs": []
    },
    {
        "type": "error",
        "name": "BEAN_ZeroPrice",
        "inputs": []
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "CollectionModified",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "bool",
                "name": "enabled",
                "indexed": true
            },
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "collectionOwnerFee",
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
        "name": "TradeAccepted",
        "inputs": [
            {
                "type": "bytes32",
                "name": "tradeId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "quantity",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "price",
                "indexed": false
            },
            {
                "type": "address",
                "name": "oldOwner",
                "indexed": false
            },
            {
                "type": "address",
                "name": "newOwner",
                "indexed": false
            },
            {
                "type": "uint8",
                "name": "tradeType",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "expiry",
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
        "name": "TradeCancelled",
        "inputs": [
            {
                "type": "bytes32",
                "name": "tradeId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "quantity",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "price",
                "indexed": false
            },
            {
                "type": "address",
                "name": "maker",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "expiry",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "timestamp",
                "indexed": false
            },
            {
                "type": "tuple",
                "name": "tradeFlags",
                "indexed": false,
                "components": [
                    {
                        "type": "uint8",
                        "name": "tradeType"
                    },
                    {
                        "type": "bool",
                        "name": "allowPartialFills"
                    },
                    {
                        "type": "bool",
                        "name": "isEscrowed"
                    }
                ]
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TradeOpened",
        "inputs": [
            {
                "type": "bytes32",
                "name": "tradeId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "quantity",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "price",
                "indexed": false
            },
            {
                "type": "address",
                "name": "maker",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "expiry",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "timestamp",
                "indexed": false
            },
            {
                "type": "tuple",
                "name": "tradeFlags",
                "indexed": false,
                "components": [
                    {
                        "type": "uint8",
                        "name": "tradeType"
                    },
                    {
                        "type": "bool",
                        "name": "allowPartialFills"
                    },
                    {
                        "type": "bool",
                        "name": "isEscrowed"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "BeanFeeProcessor",
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
        "name": "TOKEN",
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
        "name": "acceptTrade",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "bytes32",
                "name": "tradeId"
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
        "name": "addMoneyToEscrow",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "administrators",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address"
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
        "name": "cancelTrade",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": "tradeId"
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
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "collectionOwnerFees",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address"
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
        "name": "collectionOwners",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address"
            }
        ],
        "outputs": [
            {
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "collectionOwnersCanSetRoyalties",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bool"
            }
        ]
    },
    {
        "type": "function",
        "name": "collectionTradingEnabled",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address"
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
        "name": "computeOrderHash",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "user"
            },
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
                "name": "userNonce"
            }
        ],
        "outputs": [
            {
                "type": "bytes32",
                "name": "offerHash"
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
                "type": "uint256"
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
                "type": "bool"
            }
        ]
    },
    {
        "type": "function",
        "name": "getBuyOrdersByUser",
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
                "type": "bytes32[]",
                "name": "orderHashes"
            }
        ]
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
                "type": "uint256"
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
                "type": "address"
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
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "getSellOrdersByUser",
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
                "type": "bytes32[]",
                "name": "orderHashes"
            }
        ]
    },
    {
        "type": "function",
        "name": "getTrade",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": "tradeID"
            }
        ],
        "outputs": [
            {
                "type": "tuple",
                "components": [
                    {
                        "type": "uint256",
                        "name": "tokenId"
                    },
                    {
                        "type": "uint256",
                        "name": "quantity"
                    },
                    {
                        "type": "uint128",
                        "name": "price"
                    },
                    {
                        "type": "uint64",
                        "name": "expiry"
                    },
                    {
                        "type": "uint64",
                        "name": "posInUserRegister"
                    },
                    {
                        "type": "address",
                        "name": "ca"
                    },
                    {
                        "type": "address",
                        "name": "maker"
                    },
                    {
                        "type": "tuple",
                        "name": "tradeFlags",
                        "components": [
                            {
                                "type": "uint8",
                                "name": "tradeType"
                            },
                            {
                                "type": "bool",
                                "name": "allowPartialFills"
                            },
                            {
                                "type": "bool",
                                "name": "isEscrowed"
                            }
                        ]
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
                "type": "bool"
            }
        ]
    },
    {
        "type": "function",
        "name": "isValidTrade",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": "tradeID"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "validTrade"
            }
        ]
    },
    {
        "type": "function",
        "name": "listCollection",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "bool",
                "name": "tradingEnabled"
            },
            {
                "type": "address",
                "name": "_royaltyWallet"
            },
            {
                "type": "uint256",
                "name": "_fee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "nonce",
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
        "name": "openTrade",
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
                "name": "quantity"
            },
            {
                "type": "uint256",
                "name": "price"
            },
            {
                "type": "uint256",
                "name": "expiry"
            },
            {
                "type": "tuple",
                "name": "tradeFlags",
                "components": [
                    {
                        "type": "uint8",
                        "name": "tradeType"
                    },
                    {
                        "type": "bool",
                        "name": "allowPartialFills"
                    },
                    {
                        "type": "bool",
                        "name": "isEscrowed"
                    }
                ]
            }
        ],
        "outputs": []
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
        "name": "recover1155",
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
        "name": "recoverGAS",
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
        "name": "setAdmin",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "admin"
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
                "name": "_owner"
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
        "name": "setCollectionOwnersCanSetRoyalties",
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
        "name": "setDefaultCollectionOwnerFee",
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
        "name": "totalAdminFees",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "totalFee"
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
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "totalInEscrow",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address"
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
        "name": "trades",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes32"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "uint256",
                "name": "quantity"
            },
            {
                "type": "uint128",
                "name": "price"
            },
            {
                "type": "uint64",
                "name": "expiry"
            },
            {
                "type": "uint64",
                "name": "posInUserRegister"
            },
            {
                "type": "address",
                "name": "ca"
            },
            {
                "type": "address",
                "name": "maker"
            },
            {
                "type": "tuple",
                "name": "tradeFlags",
                "components": [
                    {
                        "type": "uint8",
                        "name": "tradeType"
                    },
                    {
                        "type": "bool",
                        "name": "allowPartialFills"
                    },
                    {
                        "type": "bool",
                        "name": "isEscrowed"
                    }
                ]
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
    },
    {
        "type": "function",
        "name": "usersCanWithdrawEscrow",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bool"
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
