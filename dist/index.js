var react = require('react');
var BigNumber = require('bignumber.js');
var Web3 = require('web3');
var sdk = require('@uniswap/sdk');
var JSBI = require('jsbi');
var address = require('@ethersproject/address');
var solidity = require('@ethersproject/solidity');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BigNumber__default = /*#__PURE__*/_interopDefaultLegacy(BigNumber);
var Web3__default = /*#__PURE__*/_interopDefaultLegacy(Web3);
var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var decToBn = function decToBn(dec, decimals) {
  if (decimals === void 0) {
    decimals = 18;
  }

  var num = new BigNumber__default['default'](dec).decimalPlaces(decimals);
  return num.multipliedBy(new BigNumber__default['default'](10).pow(decimals));
};

var ABI_ETH = [
	{
		inputs: [
			{
				internalType: "address",
				name: "manager",
				type: "address"
			}
		],
		name: "addManager",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "addRouterAddr",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "ntype",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "toToken",
				type: "string"
			}
		],
		name: "burn",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_token",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "ntype",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "string",
				name: "toToken",
				type: "string"
			}
		],
		name: "BurnToken",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			}
		],
		name: "mint",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mId",
				type: "uint256"
			}
		],
		name: "MintItemCreated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		name: "MintToken",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "gas",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "gasPath",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "mintWithGas",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "manager",
				type: "address"
			}
		],
		name: "removeManager",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "removeRouterAddr",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "addr",
				type: "address"
			}
		],
		name: "setCzzTonkenAddress",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "value",
				type: "uint8"
			}
		],
		name: "setMinSignatures",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amountInMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "ntype",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "toToken",
				type: "string"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapAndBurnEthWithPath",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_amountOutMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "ntype",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "toToken",
				type: "string"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapAndBurnWithPath",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "inAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "outAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "string",
				name: "flag",
				type: "string"
			}
		],
		name: "SwapToken",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "gas",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokenForEthWithPath",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "gas",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "userPath",
				type: "address[]"
			},
			{
				internalType: "address[]",
				name: "gasPath",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokenWithPath",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "TransferToken",
		type: "event"
	},
	{
		stateMutability: "payable",
		type: "receive"
	},
	{
		inputs: [
		],
		name: "getCzzTonkenAddress",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getMinSignatures",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "getRegistedRouteraddress",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "swap_burn_get_amount",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "factory",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			}
		],
		name: "swap_burn_get_getReserves",
		outputs: [
			{
				internalType: "uint256",
				name: "reserveA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveB",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "swap_mint_get_amount",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var ABI_HECO = [
	{
		inputs: [
			{
				internalType: "address",
				name: "manager",
				type: "address"
			}
		],
		name: "addManager",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "addRouterAddr",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "ntype",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "toToken",
				type: "string"
			}
		],
		name: "burn",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_token",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "ntype",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "string",
				name: "toToken",
				type: "string"
			}
		],
		name: "BurnToken",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			}
		],
		name: "mint",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mId",
				type: "uint256"
			}
		],
		name: "MintItemCreated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		name: "MintToken",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "gas",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "gasPath",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "mintWithGas",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "manager",
				type: "address"
			}
		],
		name: "removeManager",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "removeRouterAddr",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "addr",
				type: "address"
			}
		],
		name: "setCzzTonkenAddress",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "value",
				type: "uint8"
			}
		],
		name: "setMinSignatures",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amountInMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "ntype",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "toToken",
				type: "string"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapAndBurnEthWithPath",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_amountOutMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "ntype",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "toToken",
				type: "string"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapAndBurnWithPath",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "inAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "outAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "string",
				name: "flag",
				type: "string"
			}
		],
		name: "SwapToken",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "gas",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokenForEthWithPath",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "gas",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "userPath",
				type: "address[]"
			},
			{
				internalType: "address[]",
				name: "gasPath",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokenWithPath",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "TransferToken",
		type: "event"
	},
	{
		stateMutability: "payable",
		type: "receive"
	},
	{
		inputs: [
		],
		name: "getCzzTonkenAddress",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getMinSignatures",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "getRegistedRouteraddress",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "swap_burn_get_amount",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "factory",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			}
		],
		name: "swap_burn_get_getReserves",
		outputs: [
			{
				internalType: "uint256",
				name: "reserveA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveB",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "swap_mint_get_amount",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var ABI_BSC = [
	{
		inputs: [
			{
				internalType: "address",
				name: "manager",
				type: "address"
			}
		],
		name: "addManager",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "addRouterAddr",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "ntype",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "toToken",
				type: "string"
			}
		],
		name: "burn",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_token",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "ntype",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "string",
				name: "toToken",
				type: "string"
			}
		],
		name: "BurnToken",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			}
		],
		name: "mint",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mId",
				type: "uint256"
			}
		],
		name: "MintItemCreated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		name: "MintToken",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "gas",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "gasPath",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "mintWithGas",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "manager",
				type: "address"
			}
		],
		name: "removeManager",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "removeRouterAddr",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "addr",
				type: "address"
			}
		],
		name: "setCzzTonkenAddress",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "value",
				type: "uint8"
			}
		],
		name: "setMinSignatures",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amountInMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "ntype",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "toToken",
				type: "string"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapAndBurnEthWithPath",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_amountOutMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "ntype",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "toToken",
				type: "string"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapAndBurnWithPath",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "inAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "outAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "string",
				name: "flag",
				type: "string"
			}
		],
		name: "SwapToken",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "gas",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokenForEthWithPath",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "mid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "gas",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "userPath",
				type: "address[]"
			},
			{
				internalType: "address[]",
				name: "gasPath",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokenWithPath",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "TransferToken",
		type: "event"
	},
	{
		stateMutability: "payable",
		type: "receive"
	},
	{
		inputs: [
		],
		name: "getCzzTonkenAddress",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getMinSignatures",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "getRegistedRouteraddress",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "swap_burn_get_amount",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "factory",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			}
		],
		name: "swap_burn_get_getReserves",
		outputs: [
			{
				internalType: "uint256",
				name: "reserveA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveB",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "swap_mint_get_amount",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var ABI_TOKEN = [
	{
		inputs: [
			{
				internalType: "string",
				name: "name",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol",
				type: "string"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "manager",
				type: "address"
			}
		],
		name: "addManager",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "burn",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "subtractedValue",
				type: "uint256"
			}
		],
		name: "decreaseAllowance",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "addedValue",
				type: "uint256"
			}
		],
		name: "increaseAllowance",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			}
		],
		name: "mint",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "manager",
				type: "address"
			}
		],
		name: "removeManager",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var ABI_SECURITY_POOL = [
	{
		inputs: [
			{
				internalType: "contract IMdx",
				name: "_mdx",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "pid",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Deposit",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "pid",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "EmergencyWithdraw",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "pid",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Withdraw",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "LpOfPid",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_allocPoint",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_allocPointDecimals",
				type: "uint256"
			},
			{
				internalType: "contract IERC20",
				name: "_lpToken",
				type: "address"
			}
		],
		name: "add",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "manager",
				type: "address"
			}
		],
		name: "addManager",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "addRouterAddr",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "allocPoint",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "allocPointDecimals",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			}
		],
		name: "deposit",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			}
		],
		name: "emergencyWithdraw",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getMdxBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "addr",
				type: "address"
			}
		],
		name: "getPidForAddr",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getPoolTonkenAddress",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "mdx",
		outputs: [
			{
				internalType: "contract IMdx",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "paused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_user",
				type: "address"
			}
		],
		name: "pending",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "poolCorrespond",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "poolInfo",
		outputs: [
			{
				internalType: "contract IERC20",
				name: "lpToken",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "allocPoint",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "allocPointDecimals",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "accMdxPerShare",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "totalAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "totalPendingReward",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "totalReward",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "usingAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "lossAmount",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "poolLength",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "manager",
				type: "address"
			}
		],
		name: "removeManager",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "removeRouterAddr",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_swapAmount",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_gas",
				type: "uint256"
			}
		],
		name: "securityPoolMint",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "gas",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "securityPoolSwap",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "AmountInOfOrder",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "gas",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "securityPoolSwapCancel",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "uint256",
				name: "gas",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "securityPoolSwapEth",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "AmountInOfOrder",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "gas",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "securityPoolSwapEthCancel",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "routerAddr",
				type: "address"
			}
		],
		name: "securityPoolSwapGetAmount",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_token",
				type: "address"
			},
			{
				internalType: "address",
				name: "_to",
				type: "address"
			}
		],
		name: "securityPoolTransfer",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_WETH",
				type: "address"
			},
			{
				internalType: "address",
				name: "_to",
				type: "address"
			}
		],
		name: "securityPoolTransferEth",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_allocPoint",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_allocPointDecimals",
				type: "uint256"
			}
		],
		name: "set",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_sid",
				type: "uint256"
			}
		],
		name: "setPoolCorr",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "contract IMdx",
				name: "addr",
				type: "address"
			}
		],
		name: "setPoolTonkenAddress",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			}
		],
		name: "updatePool",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "userInfo",
		outputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "rewardDebt",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "pendingAmount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "lossAmount",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_pid",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			}
		],
		name: "withdraw",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		stateMutability: "payable",
		type: "receive"
	}
];

var IUniswapV2Pair = [
	{
		inputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Burn",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Swap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			}
		],
		name: "Sync",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "MINIMUM_LIQUIDITY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "burn",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getReserves",
		outputs: [
			{
				internalType: "uint112",
				name: "_reserve0",
				type: "uint112"
			},
			{
				internalType: "uint112",
				name: "_reserve1",
				type: "uint112"
			},
			{
				internalType: "uint32",
				name: "_blockTimestampLast",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "_token0",
				type: "address"
			},
			{
				internalType: "address",
				name: "_token1",
				type: "address"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "kLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price0CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price1CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "skim",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "swap",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "sync",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token0",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token1",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
];

var IUniswapV2Router02 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_factory",
				type: "address"
			},
			{
				internalType: "address",
				name: "_WETH",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
		],
		name: "WETH",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountADesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBDesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "addLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountTokenDesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "addLiquidityETH",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveOut",
				type: "uint256"
			}
		],
		name: "getAmountIn",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveOut",
				type: "uint256"
			}
		],
		name: "getAmountOut",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			}
		],
		name: "getAmountsIn",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			}
		],
		name: "getAmountsOut",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveB",
				type: "uint256"
			}
		],
		name: "quote",
		outputs: [
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidityETH",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidityETHSupportingFeeOnTransferTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityETHWithPermit",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityWithPermit",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapETHForExactTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactETHForTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForETH",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountInMax",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokensForExactETH",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountInMax",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokensForExactTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		stateMutability: "payable",
		type: "receive"
	}
];

var getContract = function getContract(provider, address, abi) {
  if (abi === void 0) {
    abi = ABI_TOKEN;
  }

  var web3 = new Web3__default['default'](provider);
  var contract = new web3.eth.Contract(abi, address);
  return contract;
}; // token Infos

var insuranceNetwork = {
  ETH: {
    rpcURL: 'https://eth-mainnet.token.im',
    tokenAddress: '0x150BbCfF6b1B4D528b48f1A300585Dea0b6490B6',
    securityPollAddress: '0xBFc45060B171849Db8e63d547c60D906A3E2eb37',
    provider: new Web3__default['default'].providers.HttpProvider("https://eth-mainnet.token.im")
  },
  BSC: {
    rpcURL: 'https://bsc-dataseed1.ninicoin.io',
    tokenAddress: '0x2Fb9376cFf6fb7f5fe99665aE1Ec2FdDD5099134',
    securityPollAddress: '0x0929e604c4Cdd5361D2037D5b70c44477C0ca3F2',
    provider: new Web3__default['default'].providers.HttpProvider("https://bsc-dataseed1.ninicoin.io")
  },
  HECO: {
    rpcURL: 'https://http-mainnet-node.huobichain.com',
    tokenAddress: '0x112489c758D405874e9Ece0586FD50B315216fcA',
    securityPollAddress: '0xABe6ED40D861ee39Aa8B21a6f8A554fECb0D32a5',
    provider: new Web3__default['default'].providers.HttpProvider("https://http-mainnet-node.huobichain.com")
  }
};

var pools = [{
  name: 'ETH',
  symbol: "ETH",
  decimals: 18,
  systemType: "ETH",
  image: 'https://docs.classzz.com/svg/ETH.svg'
}, {
  name: 'HECO',
  symbol: "HT",
  decimals: 18,
  systemType: "HECO",
  image: 'https://docs.classzz.com/svg/HECO.svg'
}, {
  name: 'BSC',
  symbol: "BNB",
  decimals: 18,
  systemType: "BSC",
  image: 'https://docs.classzz.com/svg/BSC.svg'
}, {
  name: 'ECZZ',
  symbol: "ECZZ",
  decimals: 8,
  systemType: "ETH",
  tokenAddress: "0x150BbCfF6b1B4D528b48f1A300585Dea0b6490B6",
  securityPollAddress: '0xBFc45060B171849Db8e63d547c60D906A3E2eb37',
  image: 'https://docs.classzz.com/svg/logo.svg'
}, {
  name: 'BCZZ',
  symbol: "BCZZ",
  decimals: 8,
  systemType: "BSC",
  tokenAddress: "0x2Fb9376cFf6fb7f5fe99665aE1Ec2FdDD5099134",
  securityPollAddress: '0x0929e604c4Cdd5361D2037D5b70c44477C0ca3F2',
  image: 'https://docs.classzz.com/svg/logo.svg'
}, {
  name: 'HCZZ',
  symbol: "HCZZ",
  decimals: 8,
  systemType: "HECO",
  tokenAddress: "0x112489c758D405874e9Ece0586FD50B315216fcA",
  securityPollAddress: '0xABe6ED40D861ee39Aa8B21a6f8A554fECb0D32a5',
  image: 'https://docs.classzz.com/svg/logo.svg'
}, {
  tokenAddress: "0x956f47f50a910163d8bf957cf5846d573e7f87ca",
  name: 'Fei USD',
  symbol: "FEI",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x956F47F50A910163D8BF957Cf5846D573E7f87CA/logo.png"
}, {
  tokenAddress: "0x488E0369f9BC5C40C002eA7c1fe4fd01A198801c",
  name: 'Golff.finance',
  symbol: "GOF",
  decimals: 18,
  systemType: "ETH",
  image: "https://hecoinfo.com/token/images/gof_32.png"
}, {
  tokenAddress: "0xc7283b66eb1eb5fb86327f08e1b5816b0720212b",
  name: 'TRIBE',
  symbol: "Tribe",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B/logo.png"
}, {
  tokenAddress: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
  name: 'SHIBA INU',
  symbol: "SHIB",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE/logo.png"
}, {
  tokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  name: 'USD//C',
  symbol: "USDC",
  decimals: 6,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
}, {
  tokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  name: 'Tether USD',
  symbol: "USDT",
  decimals: 6,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
}, {
  tokenAddress: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
  name: 'Wrapped BTC',
  symbol: "WBTC",
  decimals: 8,
  systemType: "ETH",
  image: "https://assets.coingecko.com/coins/images/9956/thumb/dai-multi-collateral-mcd.png?1574218774"
}, {
  tokenAddress: "0x66a0f676479cee1d7373f3dc2e2952778bff5bd6",
  name: 'Wise Token',
  symbol: "WISE",
  decimals: 18,
  systemType: "ETH",
  image: "https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707"
}, {
  tokenAddress: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
  name: 'Uniswap',
  symbol: "UNI",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png"
}, {
  tokenAddress: "0x5f98805a4e8be255a32880fdec7f6728c6568ba0",
  name: 'LUSD Stablecoin',
  symbol: "LUSD",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png"
}, {
  tokenAddress: "0x03ab458634910aad20ef5f1c8ee96f1d6ac54919",
  name: 'Rai Reflex Index',
  symbol: "RAI",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919/logo.png"
}, {
  tokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
  name: 'Dai Stablecoin',
  symbol: "DAI",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
}, {
  tokenAddress: "0x514910771af9ca656af840dff83e8264ecf986ca",
  name: 'ChainLink Token',
  symbol: "LINK",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png"
}, {
  tokenAddress: "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b",
  name: 'DefiPulse Index',
  symbol: "DPI",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b/logo.png"
}, {
  tokenAddress: "0x62359ed7505efc61ff1d56fef82158ccaffa23d7",
  name: 'cVault.finance',
  symbol: "CORE",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x62359Ed7505Efc61FF1D56fEF82158CcaffA23D7/logo.png"
}, {
  tokenAddress: "0x853d955acef822db058eb8505911ed77f175b99e",
  name: 'Frax',
  symbol: "FRAX",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x853d955aCEf822Db058eb8505911ED77F175b99e/logo.png"
}, {
  tokenAddress: "0x35a532d376ffd9a705d0bb319532837337a398e7",
  name: 'Wrapped DogeCoin',
  symbol: "WDOGE",
  decimals: 18,
  systemType: "ETH",
  image: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=010"
}, {
  tokenAddress: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
  name: 'Maker',
  symbol: "MKR",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png"
}, {
  tokenAddress: "0xeef9f339514298c6a857efcfc1a762af84438dee",
  name: 'Hermez Network',
  symbol: "HEZ",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xEEF9f339514298C6A857EfCfC1A762aF84438dEE/logo.png"
}, {
  tokenAddress: "0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206",
  name: 'Nexo',
  symbol: "NEXO",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206/logo.png"
}, {
  tokenAddress: "0x0000000000095413afc295d19edeb1ad7b71c952",
  name: 'Tokenlon',
  symbol: "LON",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000095413afC295d19EDeb1Ad7B71c952/logo.png"
}, {
  tokenAddress: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
  name: 'Aave Token',
  symbol: "AAVE",
  decimals: 18,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png"
}, {
  tokenAddress: "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
  name: 'renBTC',
  symbol: "renBTC",
  decimals: 8,
  systemType: "ETH",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D/logo.png"
}, {
  tokenAddress: "0x66a79d23e58475d2738179ca52cd0b41d73f0bea",
  name: 'Heco-Peg HBTC',
  symbol: "HBTC",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0x66a79d23e58475d2738179ca52cd0b41d73f0bea.png"
}, {
  tokenAddress: "0x2aafe3c9118db36a20dd4a942b6ff3e78981dce1",
  name: 'Golff.finance',
  symbol: "GOF",
  decimals: 18,
  systemType: "HECO",
  image: "https://hecoinfo.com/token/images/gof_32.png"
}, {
  tokenAddress: "0x099626783842d35c221e5d01694c2b928eb3b0ad",
  name: 'Dogeswap',
  symbol: "DOG",
  decimals: 18,
  systemType: "HECO",
  image: "https://graph.dogeswap.com/static/images/tokens/0x099626783842d35c221e5d01694c2b928eb3b0ad.png"
}, {
  tokenAddress: "0x38999fa3a7320bd2c3609bf0f8cb5cd4c11d3fe1",
  name: 'Poly-Peg TRIBE',
  symbol: "TRIBE",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0x38999fa3a7320bd2c3609bf0f8cb5cd4c11d3fe1.png"
}, {
  tokenAddress: "0x485cdbff08a4f91a16689e73893a11ae8b76af6d",
  name: 'Poly-Peg FEI',
  symbol: "FEI",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0x485cdbff08a4f91a16689e73893a11ae8b76af6d.png"
}, {
  tokenAddress: "0x7663bc3ae9858cae71722aedee364e125c278bdf",
  name: 'Hai Stablecoin',
  symbol: "HAI",
  decimals: 18,
  systemType: "HECO",
  image: "https://graph.dogeswap.com/static/images/tokens/0x7663bc3ae9858cae71722aedee364e125c278bdf.png"
}, {
  tokenAddress: "0xa74b0514b403bdb573bf22df0062d43f6498a164",
  name: 'HKR',
  symbol: "HKR",
  decimals: 18,
  systemType: "HECO",
  image: "https://graph.dogeswap.com/static/images/tokens/0xa74b0514b403bdb573bf22df0062d43f6498a164.png"
}, {
  tokenAddress: "0xc38072aa3f8e049de541223a9c9772132bb48634",
  name: 'Poly-Peg SHIB',
  symbol: "SHIB",
  decimals: 18,
  systemType: "HECO",
  image: "https://graph.dogeswap.com/static/images/tokens/0xc38072aa3f8e049de541223a9c9772132bb48634.png"
}, {
  tokenAddress: "0xa71edc38d189767582c38a3145b5873052c3e47a",
  name: 'Heco-Peg USDT',
  symbol: "USDT",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0xa71edc38d189767582c38a3145b5873052c3e47a.png"
}, {
  tokenAddress: "0x64ff637fb478863b7468bc97d30a5bf3a428a1fd",
  name: 'Heco-Peg ETH',
  symbol: "ETH",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0x64ff637fb478863b7468bc97d30a5bf3a428a1fd.png"
}, {
  tokenAddress: "0xecb56cf772b5c9a6907fb7d32387da2fcbfb63b4",
  name: 'Heco-Peg HLTC',
  symbol: "HLTC",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0xecb56cf772b5c9a6907fb7d32387da2fcbfb63b4.png"
}, {
  tokenAddress: "0xa2c49cee16a5e5bdefde931107dc1fae9f7773e3",
  name: 'Heco-Peg HDOT',
  symbol: "HDOT",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0xa2c49cee16a5e5bdefde931107dc1fae9f7773e3.png"
}, {
  tokenAddress: "0x80c66d460e2bb9d31a8de54b4016fca986d0811f",
  name: '火币生态隐私拓展链',
  symbol: "HTM",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0x80c66d460e2bb9d31a8de54b4016fca986d0811f.png"
}, {
  tokenAddress: "0xe499ef4616993730ced0f31fa2703b92b50bb536",
  name: 'Heco-Peg HPT',
  symbol: "HPT",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0xe499ef4616993730ced0f31fa2703b92b50bb536.png"
}, {
  tokenAddress: "0xae3a768f9ab104c69a7cd6041fe16ffa235d1810",
  name: 'Heco-Peg HFIL',
  symbol: "HFIL",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0xae3a768f9ab104c69a7cd6041fe16ffa235d1810.png"
}, {
  tokenAddress: "0xe36ffd17b2661eb57144ceaef942d95295e637f0",
  name: 'FilDA on Heco',
  symbol: "FILDA",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0xe36ffd17b2661eb57144ceaef942d95295e637f0.png"
}, {
  tokenAddress: "0xef3cebd77e0c52cb6f60875d9306397b5caca375",
  name: 'Heco-Peg HBCH',
  symbol: "HBCH",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0xef3cebd77e0c52cb6f60875d9306397b5caca375.png"
}, {
  tokenAddress: "0xfd6ce15009d46c6327649218431e8643f82f6d64",
  name: 'HyperGraph',
  symbol: "HGT",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0xfd6ce15009d46c6327649218431e8643f82f6d64.png"
}, {
  tokenAddress: "0x98fc3b60ed4a504f588342a53746405e355f9347",
  name: 'HFI',
  symbol: "HFI",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0x98fc3b60ed4a504f588342a53746405e355f9347.png"
}, {
  tokenAddress: "0x8f67854497218043e1f72908ffe38d0ed7f24721",
  name: 'LendHub',
  symbol: "LHB",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0x8f67854497218043e1f72908ffe38d0ed7f24721.png"
}, {
  tokenAddress: "0x793cf59d2c4586d599165ca86cc96c1b405d34c4",
  name: 'Wallaby Token',
  symbol: "Wallaby",
  decimals: 18,
  systemType: "HECO",
  image: "data:image/png;base64,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"
}, {
  tokenAddress: "0x854bb58fdda85f20b5ab20b20d888f0554c02560",
  name: 'Decentralized Mining Coin',
  symbol: "DMC",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0x854bb58fdda85f20b5ab20b20d888f0554c02560.png"
}, {
  tokenAddress: "0xff96dccf2763d512b6038dc60b7e96d1a9142507",
  name: 'Booster-Token',
  symbol: "BOO",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0xff96dccf2763d512b6038dc60b7e96d1a9142507.png"
}, {
  tokenAddress: "0xeef1324343ca7bf6e743e21dd9e92dfa4efc3a56",
  name: 'CON',
  symbol: "CON",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0xeef1324343ca7bf6e743e21dd9e92dfa4efc3a56.png"
}, {
  tokenAddress: "0x7c07a0a5280c36b50d5ab1630a18edbe2f528582",
  name: 'SNDream',
  symbol: "Dream",
  decimals: 18,
  systemType: "HECO",
  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAQwElEQVRoQ9WZfYwc9XnHPzOzs7Oz73vva5/vjvM75s0EA8aAgQRCIJQU0jq0DiEhihIhtQlBqVArFCWgVm2SBiUqpZQ2DQEURAmIkMQESAjvLw4QjO347MPn8/nefG97uzs779VvXs7rF7Dhr2ak0e7e7M1+v8/zfV5H8n3f50MfPtWRbdijr6JMPoXm7SChjKCk6pD0QIlu7AKWhGdqOHYXlrQCq+WjJBadR3bxaciJ5IdGIH0YAr7nMLfrGXj3IbLVx0iUpqGoQr4FMotAXwqJdpB1QALPBGcGzHehtg8qUzBbx5vJUNU+gb3kOgqrPk5CS39gIh+YwPzQ67hvfZ+C8RBShw3tHdCyFvIXgbYaEj0glQEBXo4AecIF4E+COwzWHqg+D9MvwcRemIA5+ZM4J99M66qLPxCJEybg2g2mXrqb0tAdqG2TUG6FrkuhdBVopwGtIWDfA19opvmIVCrJIMW6mgdnN8xtgbHHYWQQdzzJbOct5DbcQjJTOiEiJ0TAmB3D+M03aDHug0XAkgtg0WbQzwY08IR1XZASkdUFSGF9KQIhCAgvCGJu9F1xWQu/Yv8Rxh+CocdgpMGsfwXKxu+T61p+XBLHJVA9uA/nyRspJp6CxWno3wTl64B2oHHoBzwffIEmBn8sAoKEExFxQm9JHsip8HXqaRj8L9i3n2plDe4l91HoXfu+JN6XQG1mFPvx6yhqz0J3CVZ8EdovByoY40NUpiooqkZruYyUXQwkwBFWFlI5BgEBeIGA+F7kFd8JpSWCvrIT9twN7+6kNrMC54pHKSxe/Z4k3pOAZdSYfWQzHTwK3UVYdSN0nsv4tld55qe/Zsfru6jM1FEUic7uds6/+iLOu1bEQ2tEQngjlpD4/VhC7/EqJCgIehmo7Yc998DgLubq60he+3P0QscxSbwngdEt36Y8fBv0pGDFddC5ntef+BX3f+cxbE9l1bmnctKa5Zh1k11bdzC8cw9rz1/KpltvJNfRA66QyJExIGqDBLLwTkxESEq8F3HigGGDrUF1Hwz8CN49wFjm83Rccw+yEieAQ1yOSeDgH5+jtOVilB4P+i+B/iuojI/yna/+N+19PfzF166mq78TEAUovOnO1/aw5X9+ycar13LGpeeBbUW/IkiI+BBa98GrUxkd4+DIFNXZeUzDQJIksgWdriWtFLvawE+GJGbegV0Pw946Y2fdT9c5f3WUF44iYDdqzP3kE7Qln4OTlkHvlZBOY9RrDA5VWH1WH7KeBMcILayKzCOOQiAZY66Grsf6j8CLywkF16jx6J2P8cLjb2KaImtJJJIqijgVmUIxxRnn93PpX56DpuvQkODA8zDwPJXpPpS/fpFMSdSY9/HA0PP30fPG9UhL0rD0o1DoBdmClAoFHWwbHA+SCdAk9ry4m2d/toO+la1csvk80HNgClnEMRDVAEXCtWyefmQ78wdNepYXyBQzaLqCmpRxLJfKbAN8h1UrCqRUOWg/MGow+CS8O8ZI/+0svvzv35uAbdaZ+dGldKgvQt8KWLQOVGE9CRJy+CpuLLSYVRnaOsQ9tz3DyJ4GqQx84baNrLvmTLBEMArgTTEgWi5xD1XHnJxkcv8s3Se3gZYBX8gtIir+d8YA0wbXBycBBwdgzyvMHCyTvOF1MqWuBRKHSWhi25MUfnk52hINej8ChU5IeBH4JgKaEkj/p//8MlufHGTF8iTD+yyWb+hn8zc3hsCdIwgIVWkSA8/u4cHvvsLI3gYbLu9m083noGVTICTleuH/BcCj9zZQr8PwVty9Bxk76z9ZfMGNxyaw/2dfp3v4e9DTBeXVoKuhxWPrxx7QE9hVk3u/9QrG+BRLujX2DTUor+3lun9YH95cgGk+kgrmTJ27/+459v5hmmJRYt6Q+NI3z2H5+YuhYoXAF8CLCu2Fp+XD5F7YO8CB1FWUb3gUKagzsOCBxvxBpu+9kLK+E6m7D1oWgSZcrkQkhJQiL2gKjuvzk398g8rQBO0dKsP7bS78/Bmc++l+qEWSaIphMip7X57gvttfp7Pgkc7I7BtxufJLp3H6pYthzjxEQJAQlhdesFywfZibxR/ZxcHJAtpnXyBfDtuMBQJTu1/Bf3ADxcUJEuVeyOUg2URAlcIcHsQDkNd45Zfj/PbH21E8lyXrurnyptVkM35osYUaFkkpp7LrdxP877++TXdHeHl8RuLavz2NvtMLkQeE52IvCBKCQOSFegN3fJja8ByzGx+k57zPHE5g9NWH0J7aRGZRhmRHF1ImDcnI+oGMmsAL74nMkdDY/kYNo+awZn2JbN6Huh2kx8OKsPgpTaYy5XL/HdswD8wFIdt5aifX3LSclOKC6YW9ngh+EQfC6sIDMQnDwj44QWNkmqk1t9N3ZZiNFjww9Kt/IvfmraTLWZKtrchpPUyVwvJB9ogICC+I2iVMKCSWT4XXDSsMxCB7NrcQsY58SCfZ9nKVVx4fodie4sJrFgXjBPOiajdbX8gnJhJ6wW80sKanaRyYZabny/RtuutwAnvu+yLFkXvRy1m0Ug5Fz0BSBHFs+Ug6AQGRSiOZxOleFi2CEhEQ15pJRJYVf9I1GoZMUvGRJQuqFnjSIQJBFmomICTp4hl1rEqFxmiFg4VPsfTGh5FkJfKA77Prnk9TmnqEdFcarZQhoWchqTUREF1DUxzExVYAF8CCz4JExOgI/Ig6EKT6qB+KLRyPCkFrFFk9joMgkAUBG9eoYlZqGOM1ppRzOenLW1D1XEhAzPUD/341+ZnHyXTppIppEuKipjdlIAEuIiHiIbB4JKUYvBR75chONMqnAYlobgiAN32OQQczT+SFKA58y8Q15jHn6tTGDaalM1l6069R08VDMbDjPzZRGH+IdJdOupgikckhJzNhrxMEsB91ksIL4r18iEBg+cgDMYkgwmLg0YfYCwJ8cIrmLiKyMB5EWciNiqHt4lt1HKNCY7ZBbcJgVr+IZV95gkRSP0Rg5wNfJbPrTjJdKdJFFTWTRdbySEJGQfqMGs+gHY4kc5gXhJTEICO8cOSmJtK44LEAPJJU87QpCMXWF+1UkI1sPKuCXatizNnUxuvMd32GVV98ILDQQhba+/S/4T5zE7lyikxJRctoyKkcsppt8oIAHgVoQCLSvyAXp9rmFBpbN3gVw35EYOG9WLk0jQPi79HYHA5uHr5ZxbPmsWoN6rMO1bE61sk3s3zTd4+oA288wdyDV1EoJ8m0JNGzCRQtjZzM4as6tu0gqQnUbCKcX2PZyBKe41CdbVCZs3AcH1mRSKgymWyCbCGJklPDmiJAibweyyX2Rpz/m+b+oBWxzQC8Z9Zo1GxqMw7zowbyxXfSf9nfHE5gdv929t15NsVWk0xrinQuQVJXkbUslpXAVYsBSDWtUConQ08EDZrMO7+f48WXZ9EyCZIpBdf2scVs7PokFJ9SxqfcrtLbn6G1Jxd2s43YI1EcxJYPSAjwFr5Tw7dq2A2TetWlNm0xN+ZQ+uwvWHT6ZYcTcCyD7T/8JJnZZ8h0ZkjnE+hpBSWZolH30FeeS31imqG39tJ7RplgbSMsqMC0IVN3ZIpFhaQqBWqxHJ+66TNb9ZgYMdi3Zw5z1qCgOpy1rkTf6lJYbeNtxkL2EalUgDfAqeGaDUzDpTbvUJ80mPOWsfLmF0jlxB6qqRKLD7t+/i+4z36DbJCJVNJZMWwkMGsuWv+pJLQE2361g2Jfme4VaiiFuCKLOBCWi7voOOUGsZEAL8H4lMtbW2doz3isPTUbEYiyUFwHXDsCX8e3G1imExiwNmdTH6thrvwSp9xw97Hb6Zl92xj6wQayuTrZNj2QkZiYrHkTre9kkq0tbHv8TfT2TpaeoocBKDJOczZqLgFxGg1eo2FIU8HwoC6WYXEajYLcFS21ie/WwW5g2y5mw8OYd6hOm1Qnbdq/sIXyqR87NgHx1233fA5l4MfoHWmyRZVUOoFjWGRWb0Bta+f39z9Fpq3EyjPEJCUCWmSiKB4C8FF9EBnR9bAMJwhA1/JQ9STZnIoivBUvIoIs5IAAHyyBDXyngWt7mJZPw3CozTkYkzWMwvmc8rUtQf6Pj6OG+vGB1xn+4YXkSzZ6i46elkkoMvl1n0Lu7GP3Tx/ArovhvhXkJEhq2AMFOd7DdWwc28UyRQpXcJUMnlogmU7C7F6M+QZti0skxfrddcGzw9VkYH0B3sIRScD2g8G/XnWoz5jMTzi0bn6E3rP/7LA56Zhrld0PfIXqa3eT6UiR0iHflqewYTN0rsUeeI7plx4hl3XQcplgG+fLKr6UxCWJr+Yg04qULqBqEkpSSMWAuWkm3hmkUtHoXtFCShOAnZCAK4YZIR0XxxHEfSzLpVF3qVVsahMN1N6PsfIrjyInUscn4M4OsO07l4E9Qq7g0bmqn8z6z+FnepHcOt7wa1hju8LCm0wjpXJIehFSRRRNRmIGjP0wOszowBTjwwbVCqRbCixbkyNfENaPwAfysfFcL9hKijpiWV6QeepVm/q0hVFPc/otP0ddvOEw8Edloear9R0P8dYPPkdHp0XvhjNJrPw4fqoL5ETQxgq3+yJfygKwADEPlUH8A28x++4wA+8Y7B1KUrd02soplq1M0NcnkdIdcITVw+Wu7/l4rh+Cd31sAb7hBkNSo2JROeiz4ro7KG645Sjw70tAXJx8+lvMv/RdTrpoDVLHGjyx90xkQYkeCYmlrDhdA8meQxrfyugLr/HoL/IMjrWycpXEOWf7LF/mkcqKVYvYNISvogMW4EXmFaEQgg91b9YdGlWL+UmP8oU3sPjTdzU9Vzicx/uv1z2HmUc+Rr7dRG7twxdBK6sQPNMSDVq06w/W5D5SbYLG7jd57dkKg6MFzlvvs3ypi6T44TOPuHsW2TPg4eOI0wmD1mq4WA0Hs2ozP+XSse4aej5zD6j5qGoeOWQcUciO5SPjiStQU6MopTK+yDhHdZrR3jPoDB2k6jD7X9vH4P4Ma06RKRXcqO0PO1JReAVwcboxeMsLpGObDmbFpjLjs+iCzXT/+fcgWXxP8MeVkMjP1ccuQ0uNkCh14CviQYTI21E3FjRjwpRhQMqeiTV6gN88aWOQ54L1Num0kEuIIegaIuACvOt4OLaHY3k4Qb53MRoa/Z/6Om0bbwVFe1/wxycAVLdcT6L6DFpbayihuFcQBUwQWcjhIh58fKPB7rdrDA5rrDkF8jk3kEtYJnxcN7S+5/gheNOlUXOoVSDbeyZ9V9+KvvzqSAzN271jxvCheeDYl6G69S54+1b0jmyQgcLKGz19DLKIsL6IhbBdkH2f8cEqfxxQ6F4CuUwkIdEmxdKxhVy8oMdp1EFtW8aSi6+nZd3nkXSxtg/oHvGA5EMSMCfeYf7hjWRbXGTRx8hC6/G9JfwgMsNxUnI9jKk6zz+vYDkyq5cZQTsdzCmutFBhbVtCUtPkek+n65xrya++Ejnf3wQ8NMaJHMd9yCduMv27O5Devp1UQQ3HSxGwwTQWnuIBReAV0UbPGvxhe4aK00JemUKWPRQtRSpTQMu3orV0k+tbS37Zhaitq0FU7oXjxKzeTOyECAiZzPz229g770X1ppATUviUKAAvglMK2xpPQe34CNn1t0GuF2d+Es/3g/WHopeQBFgxoh51fHDg8S1OiED8ZXNiO+bY27hzQ7jVsWDcE3VBy3egt/egFJeitK+N8vbxBPDhQR/uAVFBxMDxJ3p8IA/8f+T4J0/g/wAdf6rpHzLg8wAAAABJRU5ErkJggg=="
}, {
  tokenAddress: "0xbbe6c2337a2543239ff313bed370e4eaeda268ef",
  name: 'sHT',
  symbol: "sHT",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0xbbe6c2337a2543239ff313bed370e4eaeda268ef.png"
}, {
  tokenAddress: "0x25d2e80cb6b86881fd7e07dd263fb79f4abe033c",
  name: 'MDX Token',
  symbol: "MDX",
  decimals: 18,
  systemType: "HECO",
  image: "https://mdex.com/token-icons/heco/0x25d2e80cb6b86881fd7e07dd263fb79f4abe033c.png"
}, {
  tokenAddress: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  name: 'PancakeSwap Token',
  symbol: "Cake",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png"
}, {
  tokenAddress: "0x2bcF9c1861FaE2d5a7D2b3242b71e2a8d461F61e",
  name: 'Golff.finance',
  symbol: "GOF",
  decimals: 18,
  systemType: "BSC",
  image: "https://hecoinfo.com/token/images/gof_32.png"
}, {
  tokenAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
  name: 'Binance-Peg BUSD Token',
  symbol: "BUSD",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/logo.png"
}, {
  tokenAddress: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
  name: 'Binance-Peg BTCB Token',
  symbol: "BTCB",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c/logo.png"
}, {
  tokenAddress: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
  name: 'Binance-Peg Ethereum Token',
  symbol: "ETH",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x2170Ed0880ac9A755fd29B2688956BD959F933F8/logo.png"
}, {
  tokenAddress: "0x7083609fce4d1d8dc0c979aab8c869ea2c873402",
  name: 'Binance-Peg Polkadot Token',
  symbol: "DOT",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402/logo.png"
}, {
  tokenAddress: "0x55d398326f99059ff775485246999027b3197955",
  name: 'Tether USD',
  symbol: "USDT",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x55d398326f99059fF775485246999027B3197955/logo.png"
}, {
  tokenAddress: "0xa184088a740c695e156f91f5cc086a06bb78b827",
  name: 'AUTOv2',
  symbol: "AUTO",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xa184088a740c695E156F91f5cC086a06bb78b827/logo.png"
}, {
  tokenAddress: "0xe0e514c71282b6f4e823703a39374cf58dc3ea4f",
  name: 'BELT Token',
  symbol: "BELT",
  decimals: 18,
  systemType: "BSC",
  image: "data:image/png;base64,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"
}, {
  tokenAddress: "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47",
  name: 'Cardano Token',
  symbol: "ADA",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47/logo.png"
}, {
  tokenAddress: "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd",
  name: 'ChainLink Token',
  symbol: "LINK",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD/logo.png"
}, {
  tokenAddress: "0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51",
  name: 'Bunny Token',
  symbol: "BUNNY",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51/logo.png"
}, {
  tokenAddress: "0x47bead2563dcbf3bf2c9407fea4dc236faba485a",
  name: 'Swipe',
  symbol: "SXP",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A/logo.png"
}, {
  tokenAddress: "0xbf5140a22578168fd562dccf235e5d43a02ce9b1",
  name: 'Uniswap',
  symbol: "UNI",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xBf5140A22578168FD562DCcF235E5D43A02ce9B1/logo.png"
}, {
  tokenAddress: "0xa1faa113cbe53436df28ff0aee54275c13b40975",
  name: 'AlphaToken',
  symbol: "ALPHA",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xa1faa113cbE53436Df28FF0aEe54275c13B40975/logo.png"
}, {
  tokenAddress: "0x8f0528ce5ef7b51152a59745befdd91d97091d2f",
  name: 'AlpacaToken',
  symbol: "ALPACA",
  decimals: 18,
  systemType: "BSC",
  image: "data:image/png;base64,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"
}, {
  tokenAddress: "0xf21768ccbc73ea5b6fd3c687208a7c2def2d966e",
  name: 'Reef.finance',
  symbol: "REEF",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xF21768cCBC73Ea5B6fd3C687208a7c2def2d966e/logo.png"
}, {
  tokenAddress: "0x8b303d5bbfbbf46f1a4d9741e491e06986894e18",
  name: 'Woonkly Power',
  symbol: "WOOP",
  decimals: 18,
  systemType: "BSC",
  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAQwElEQVRoQ9WZfYwc9XnHPzOzs7Oz73vva5/vjvM75s0EA8aAgQRCIJQU0jq0DiEhihIhtQlBqVArFCWgVm2SBiUqpZQ2DQEURAmIkMQESAjvLw4QjO347MPn8/nefG97uzs779VvXs7rF7Dhr2ak0e7e7M1+v8/zfV5H8n3f50MfPtWRbdijr6JMPoXm7SChjKCk6pD0QIlu7AKWhGdqOHYXlrQCq+WjJBadR3bxaciJ5IdGIH0YAr7nMLfrGXj3IbLVx0iUpqGoQr4FMotAXwqJdpB1QALPBGcGzHehtg8qUzBbx5vJUNU+gb3kOgqrPk5CS39gIh+YwPzQ67hvfZ+C8RBShw3tHdCyFvIXgbYaEj0glQEBXo4AecIF4E+COwzWHqg+D9MvwcRemIA5+ZM4J99M66qLPxCJEybg2g2mXrqb0tAdqG2TUG6FrkuhdBVopwGtIWDfA19opvmIVCrJIMW6mgdnN8xtgbHHYWQQdzzJbOct5DbcQjJTOiEiJ0TAmB3D+M03aDHug0XAkgtg0WbQzwY08IR1XZASkdUFSGF9KQIhCAgvCGJu9F1xWQu/Yv8Rxh+CocdgpMGsfwXKxu+T61p+XBLHJVA9uA/nyRspJp6CxWno3wTl64B2oHHoBzwffIEmBn8sAoKEExFxQm9JHsip8HXqaRj8L9i3n2plDe4l91HoXfu+JN6XQG1mFPvx6yhqz0J3CVZ8EdovByoY40NUpiooqkZruYyUXQwkwBFWFlI5BgEBeIGA+F7kFd8JpSWCvrIT9twN7+6kNrMC54pHKSxe/Z4k3pOAZdSYfWQzHTwK3UVYdSN0nsv4tld55qe/Zsfru6jM1FEUic7uds6/+iLOu1bEQ2tEQngjlpD4/VhC7/EqJCgIehmo7Yc998DgLubq60he+3P0QscxSbwngdEt36Y8fBv0pGDFddC5ntef+BX3f+cxbE9l1bmnctKa5Zh1k11bdzC8cw9rz1/KpltvJNfRA66QyJExIGqDBLLwTkxESEq8F3HigGGDrUF1Hwz8CN49wFjm83Rccw+yEieAQ1yOSeDgH5+jtOVilB4P+i+B/iuojI/yna/+N+19PfzF166mq78TEAUovOnO1/aw5X9+ycar13LGpeeBbUW/IkiI+BBa98GrUxkd4+DIFNXZeUzDQJIksgWdriWtFLvawE+GJGbegV0Pw946Y2fdT9c5f3WUF44iYDdqzP3kE7Qln4OTlkHvlZBOY9RrDA5VWH1WH7KeBMcILayKzCOOQiAZY66Grsf6j8CLywkF16jx6J2P8cLjb2KaImtJJJIqijgVmUIxxRnn93PpX56DpuvQkODA8zDwPJXpPpS/fpFMSdSY9/HA0PP30fPG9UhL0rD0o1DoBdmClAoFHWwbHA+SCdAk9ry4m2d/toO+la1csvk80HNgClnEMRDVAEXCtWyefmQ78wdNepYXyBQzaLqCmpRxLJfKbAN8h1UrCqRUOWg/MGow+CS8O8ZI/+0svvzv35uAbdaZ+dGldKgvQt8KWLQOVGE9CRJy+CpuLLSYVRnaOsQ9tz3DyJ4GqQx84baNrLvmTLBEMArgTTEgWi5xD1XHnJxkcv8s3Se3gZYBX8gtIir+d8YA0wbXBycBBwdgzyvMHCyTvOF1MqWuBRKHSWhi25MUfnk52hINej8ChU5IeBH4JgKaEkj/p//8MlufHGTF8iTD+yyWb+hn8zc3hsCdIwgIVWkSA8/u4cHvvsLI3gYbLu9m083noGVTICTleuH/BcCj9zZQr8PwVty9Bxk76z9ZfMGNxyaw/2dfp3v4e9DTBeXVoKuhxWPrxx7QE9hVk3u/9QrG+BRLujX2DTUor+3lun9YH95cgGk+kgrmTJ27/+459v5hmmJRYt6Q+NI3z2H5+YuhYoXAF8CLCu2Fp+XD5F7YO8CB1FWUb3gUKagzsOCBxvxBpu+9kLK+E6m7D1oWgSZcrkQkhJQiL2gKjuvzk398g8rQBO0dKsP7bS78/Bmc++l+qEWSaIphMip7X57gvttfp7Pgkc7I7BtxufJLp3H6pYthzjxEQJAQlhdesFywfZibxR/ZxcHJAtpnXyBfDtuMBQJTu1/Bf3ADxcUJEuVeyOUg2URAlcIcHsQDkNd45Zfj/PbH21E8lyXrurnyptVkM35osYUaFkkpp7LrdxP877++TXdHeHl8RuLavz2NvtMLkQeE52IvCBKCQOSFegN3fJja8ByzGx+k57zPHE5g9NWH0J7aRGZRhmRHF1ImDcnI+oGMmsAL74nMkdDY/kYNo+awZn2JbN6Huh2kx8OKsPgpTaYy5XL/HdswD8wFIdt5aifX3LSclOKC6YW9ngh+EQfC6sIDMQnDwj44QWNkmqk1t9N3ZZiNFjww9Kt/IvfmraTLWZKtrchpPUyVwvJB9ogICC+I2iVMKCSWT4XXDSsMxCB7NrcQsY58SCfZ9nKVVx4fodie4sJrFgXjBPOiajdbX8gnJhJ6wW80sKanaRyYZabny/RtuutwAnvu+yLFkXvRy1m0Ug5Fz0BSBHFs+Ug6AQGRSiOZxOleFi2CEhEQ15pJRJYVf9I1GoZMUvGRJQuqFnjSIQJBFmomICTp4hl1rEqFxmiFg4VPsfTGh5FkJfKA77Prnk9TmnqEdFcarZQhoWchqTUREF1DUxzExVYAF8CCz4JExOgI/Ig6EKT6qB+KLRyPCkFrFFk9joMgkAUBG9eoYlZqGOM1ppRzOenLW1D1XEhAzPUD/341+ZnHyXTppIppEuKipjdlIAEuIiHiIbB4JKUYvBR75chONMqnAYlobgiAN32OQQczT+SFKA58y8Q15jHn6tTGDaalM1l6069R08VDMbDjPzZRGH+IdJdOupgikckhJzNhrxMEsB91ksIL4r18iEBg+cgDMYkgwmLg0YfYCwJ8cIrmLiKyMB5EWciNiqHt4lt1HKNCY7ZBbcJgVr+IZV95gkRSP0Rg5wNfJbPrTjJdKdJFFTWTRdbySEJGQfqMGs+gHY4kc5gXhJTEICO8cOSmJtK44LEAPJJU87QpCMXWF+1UkI1sPKuCXatizNnUxuvMd32GVV98ILDQQhba+/S/4T5zE7lyikxJRctoyKkcsppt8oIAHgVoQCLSvyAXp9rmFBpbN3gVw35EYOG9WLk0jQPi79HYHA5uHr5ZxbPmsWoN6rMO1bE61sk3s3zTd4+oA288wdyDV1EoJ8m0JNGzCRQtjZzM4as6tu0gqQnUbCKcX2PZyBKe41CdbVCZs3AcH1mRSKgymWyCbCGJklPDmiJAibweyyX2Rpz/m+b+oBWxzQC8Z9Zo1GxqMw7zowbyxXfSf9nfHE5gdv929t15NsVWk0xrinQuQVJXkbUslpXAVYsBSDWtUConQ08EDZrMO7+f48WXZ9EyCZIpBdf2scVs7PokFJ9SxqfcrtLbn6G1Jxd2s43YI1EcxJYPSAjwFr5Tw7dq2A2TetWlNm0xN+ZQ+uwvWHT6ZYcTcCyD7T/8JJnZZ8h0ZkjnE+hpBSWZolH30FeeS31imqG39tJ7RplgbSMsqMC0IVN3ZIpFhaQqBWqxHJ+66TNb9ZgYMdi3Zw5z1qCgOpy1rkTf6lJYbeNtxkL2EalUgDfAqeGaDUzDpTbvUJ80mPOWsfLmF0jlxB6qqRKLD7t+/i+4z36DbJCJVNJZMWwkMGsuWv+pJLQE2361g2Jfme4VaiiFuCKLOBCWi7voOOUGsZEAL8H4lMtbW2doz3isPTUbEYiyUFwHXDsCX8e3G1imExiwNmdTH6thrvwSp9xw97Hb6Zl92xj6wQayuTrZNj2QkZiYrHkTre9kkq0tbHv8TfT2TpaeoocBKDJOczZqLgFxGg1eo2FIU8HwoC6WYXEajYLcFS21ie/WwW5g2y5mw8OYd6hOm1Qnbdq/sIXyqR87NgHx1233fA5l4MfoHWmyRZVUOoFjWGRWb0Bta+f39z9Fpq3EyjPEJCUCWmSiKB4C8FF9EBnR9bAMJwhA1/JQ9STZnIoivBUvIoIs5IAAHyyBDXyngWt7mJZPw3CozTkYkzWMwvmc8rUtQf6Pj6OG+vGB1xn+4YXkSzZ6i46elkkoMvl1n0Lu7GP3Tx/ArovhvhXkJEhq2AMFOd7DdWwc28UyRQpXcJUMnlogmU7C7F6M+QZti0skxfrddcGzw9VkYH0B3sIRScD2g8G/XnWoz5jMTzi0bn6E3rP/7LA56Zhrld0PfIXqa3eT6UiR0iHflqewYTN0rsUeeI7plx4hl3XQcplgG+fLKr6UxCWJr+Yg04qULqBqEkpSSMWAuWkm3hmkUtHoXtFCShOAnZCAK4YZIR0XxxHEfSzLpVF3qVVsahMN1N6PsfIrjyInUscn4M4OsO07l4E9Qq7g0bmqn8z6z+FnepHcOt7wa1hju8LCm0wjpXJIehFSRRRNRmIGjP0wOszowBTjwwbVCqRbCixbkyNfENaPwAfysfFcL9hKijpiWV6QeepVm/q0hVFPc/otP0ddvOEw8Edloear9R0P8dYPPkdHp0XvhjNJrPw4fqoL5ETQxgq3+yJfygKwADEPlUH8A28x++4wA+8Y7B1KUrd02soplq1M0NcnkdIdcITVw+Wu7/l4rh+Cd31sAb7hBkNSo2JROeiz4ro7KG645Sjw70tAXJx8+lvMv/RdTrpoDVLHGjyx90xkQYkeCYmlrDhdA8meQxrfyugLr/HoL/IMjrWycpXEOWf7LF/mkcqKVYvYNISvogMW4EXmFaEQgg91b9YdGlWL+UmP8oU3sPjTdzU9Vzicx/uv1z2HmUc+Rr7dRG7twxdBK6sQPNMSDVq06w/W5D5SbYLG7jd57dkKg6MFzlvvs3ypi6T44TOPuHsW2TPg4eOI0wmD1mq4WA0Hs2ozP+XSse4aej5zD6j5qGoeOWQcUciO5SPjiStQU6MopTK+yDhHdZrR3jPoDB2k6jD7X9vH4P4Ma06RKRXcqO0PO1JReAVwcboxeMsLpGObDmbFpjLjs+iCzXT/+fcgWXxP8MeVkMjP1ccuQ0uNkCh14CviQYTI21E3FjRjwpRhQMqeiTV6gN88aWOQ54L1Num0kEuIIegaIuACvOt4OLaHY3k4Qb53MRoa/Z/6Om0bbwVFe1/wxycAVLdcT6L6DFpbayihuFcQBUwQWcjhIh58fKPB7rdrDA5rrDkF8jk3kEtYJnxcN7S+5/gheNOlUXOoVSDbeyZ9V9+KvvzqSAzN271jxvCheeDYl6G69S54+1b0jmyQgcLKGz19DLKIsL6IhbBdkH2f8cEqfxxQ6F4CuUwkIdEmxdKxhVy8oMdp1EFtW8aSi6+nZd3nkXSxtg/oHvGA5EMSMCfeYf7hjWRbXGTRx8hC6/G9JfwgMsNxUnI9jKk6zz+vYDkyq5cZQTsdzCmutFBhbVtCUtPkek+n65xrya++Ejnf3wQ8NMaJHMd9yCduMv27O5Devp1UQQ3HSxGwwTQWnuIBReAV0UbPGvxhe4aK00JemUKWPRQtRSpTQMu3orV0k+tbS37Zhaitq0FU7oXjxKzeTOyECAiZzPz229g770X1ppATUviUKAAvglMK2xpPQe34CNn1t0GuF2d+Es/3g/WHopeQBFgxoh51fHDg8S1OiED8ZXNiO+bY27hzQ7jVsWDcE3VBy3egt/egFJeitK+N8vbxBPDhQR/uAVFBxMDxJ3p8IA/8f+T4J0/g/wAdf6rpHzLg8wAAAABJRU5ErkJggg=="
}, {
  tokenAddress: "0xf859bf77cbe8699013d6dbc7c2b926aaf307f830",
  name: 'Berry Tributes',
  symbol: "BRY",
  decimals: 18,
  systemType: "BSC",
  image: "data:image/png;base64,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"
}, {
  tokenAddress: "0xf952fc3ca7325cc27d15885d37117676d25bfda6",
  name: 'Goose Golden Egg',
  symbol: "EGG",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xF952Fc3ca7325Cc27D15885d37117676d25BfdA6/logo.png"
}, {
  tokenAddress: "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe",
  name: 'XRP Token',
  symbol: "XRP",
  decimals: 18,
  systemType: "BSC",
  image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE/logo.png"
}];

var networks = [{
  networkName: 'HECO',
  networkType: 'HECO',
  symbolName: 'HT',
  tokenValue: '',
  insuranceCoin: 'HCZZ',
  abi: ABI_HECO,
  networkId: "128",
  chainId: '0x80',
  ntype: 2,
  decimals: 18,
  symbol: null,
  currency: null,
  route: 0,
  swap: [{
    name: "DogeSwap",
    image: "https://graph.dogeswap.com/static/images/tokens/0x099626783842d35c221e5d01694c2b928eb3b0ad.png",
    swaprouter: "0x539A9Fbb81D1D2DC805c698B55C8DF81cbA6b350",
    factoryAddress: "0x0419082bb45f47Fe5c530Ea489e16478819910F3",
    currentToken: "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
    initCodeHash: "0x06d32be9fe9b1c75a1ce7e2b362c735bcb731596b9330b99412fde52d753e3f0"
  }, {
    name: "mdex",
    image: "https://mdex.com/token-icons/heco/0x25d2e80cb6b86881fd7e07dd263fb79f4abe033c.png",
    swaprouter: "0xED7d5F38C79115ca12fe6C0041abb22F0A06C300",
    factoryAddress: "0xb0b670fc1F7724119963018DB0BfA86aDb22d941",
    currentToken: "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
    initCodeHash: "0x2ad889f82040abccb2649ea6a874796c1601fb67f91a747a80e08860c73ddf24"
  }],
  router: "0x93E00a89F5CBF9c66a50aF7206c9c6f54601EC15",
  weth: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
  currentToken: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f',
  czz: '0x112489c758D405874e9Ece0586FD50B315216fcA',
  explorerUrl: 'https://hecoinfo.com/',
  rpcUrls: 'https://http-mainnet-node.huobichain.com',
  provider: new Web3__default['default'].providers.HttpProvider("https://http-mainnet-node.huobichain.com"),
  image: 'https://cryptologos.cc/logos/huobi-token-ht-logo.svg'
}, {
  networkName: 'ETH',
  networkType: 'ETH',
  symbolName: 'ETH',
  tokenValue: '',
  insuranceCoin: 'ECZZ',
  abi: ABI_ETH,
  symbol: null,
  networkId: "1",
  chainId: '0x1',
  ntype: 1,
  decimals: 18,
  currency: null,
  route: 0,
  swap: [{
    name: "uniswap",
    image: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
    swaprouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    factoryAddress: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    currentToken: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    initCodeHash: "0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f" // 13281001066

  }, {
    name: "sushi",
    image: 'https://sushi.com/static/media/logo.dec926df.png',
    swaprouter: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
    factoryAddress: "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac",
    currentToken: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    initCodeHash: "0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303"
  }],
  router: "0xF0f50ce5054289a178fb45Ab2E373899580d12bf",
  weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  currentToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  czz: '0x150BbCfF6b1B4D528b48f1A300585Dea0b6490B6',
  explorerUrl: 'https://eth-mainnet.token.im/',
  rpcUrls: 'https://nodes.mewapi.io/rpc/eth',
  provider: new Web3__default['default'].providers.HttpProvider("https://eth-mainnet.token.im"),
  image: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg'
}, {
  networkName: 'BSC',
  networkType: 'BSC',
  symbolName: 'BNB',
  tokenValue: '',
  insuranceCoin: 'BCZZ',
  abi: ABI_BSC,
  networkId: "56",
  chainId: '0x38',
  ntype: 3,
  decimals: 18,
  symbol: null,
  currency: null,
  route: 0,
  swap: [// {
  //   name:"Bakery",
  //   image:"https://www.bakeryswap.org/static/media/logo.765c4d87.svg",
  //   factoryAddress:"0x01bf7c66c6bd861915cdaae475042d3c4bae16a7",
  //   swaprouter:"0xcde540d7eafe93ac5fe6233bee57e1270d3e330f",
  //   currentToken:"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
  //   initCodeHash:"0xe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3"
  // },
  {
    name: "Pancakeswap",
    image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png",
    swaprouter: "0x10ed43c718714eb63d5aa57b78b54704e256024e",
    factoryAddress: "0xca143ce32fe78f1f7019d7d551a6402fc5350c73",
    currentToken: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
    initCodeHash: "0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5"
  }],
  router: "0xdf10e0Caa2BBe67f7a1E91A3e6660cC1e34e81B9",
  weth: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  currentToken: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  czz: '0x2Fb9376cFf6fb7f5fe99665aE1Ec2FdDD5099134',
  explorerUrl: 'https://bscscan.com/',
  rpcUrls: 'https://bsc-dataseed1.ninicoin.io',
  provider: new Web3__default['default'].providers.HttpProvider("https://bsc-dataseed1.ninicoin.io"),
  image: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg'
}];

/**
 * @description: if  allowance  is true  can swap , else must call useApproveActions first
 * @param { CurrencyProps } fromCurrency      : swap from token info
 * @param { currentProvider } currentProvider : current wallet provider 
 * @param { string } accounts                 : user account info
 * @return { boolean }  
 */

function _catch$1(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

function _settle(pact, state, value) {
  if (!pact.s) {
    if (value instanceof _Pact) {
      if (value.s) {
        if (state & 1) {
          state = value.s;
        }

        value = value.v;
      } else {
        value.o = _settle.bind(null, pact, state);
        return;
      }
    }

    if (value && value.then) {
      value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
      return;
    }

    pact.s = state;
    pact.v = value;
    var observer = pact.o;

    if (observer) {
      observer(pact);
    }
  }
}

var _Pact = /*#__PURE__*/function () {
  function _Pact() {}

  _Pact.prototype.then = function (onFulfilled, onRejected) {
    var result = new _Pact();
    var state = this.s;

    if (state) {
      var callback = state & 1 ? onFulfilled : onRejected;

      if (callback) {
        try {
          _settle(result, 1, callback(this.v));
        } catch (e) {
          _settle(result, 2, e);
        }

        return result;
      } else {
        return this;
      }
    }

    this.o = function (_this) {
      try {
        var value = _this.v;

        if (_this.s & 1) {
          _settle(result, 1, onFulfilled ? onFulfilled(value) : value);
        } else if (onRejected) {
          _settle(result, 1, onRejected(value));
        } else {
          _settle(result, 2, value);
        }
      } catch (e) {
        _settle(result, 2, e);
      }
    };

    return result;
  };

  return _Pact;
}();

function _isSettledPact(thenable) {
  return thenable instanceof _Pact && thenable.s & 1;
}

function _for(test, update, body) {
  var stage;

  for (;;) {
    var shouldContinue = test();

    if (_isSettledPact(shouldContinue)) {
      shouldContinue = shouldContinue.v;
    }

    if (!shouldContinue) {
      return result;
    }

    if (shouldContinue.then) {
      stage = 0;
      break;
    }

    var result = body();

    if (result && result.then) {
      if (_isSettledPact(result)) {
        result = result.s;
      } else {
        stage = 1;
        break;
      }
    }

    if (update) {
      var updateValue = update();

      if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
        stage = 2;
        break;
      }
    }
  }

  var pact = new _Pact();

  var reject = _settle.bind(null, pact, 2);

  (stage === 0 ? shouldContinue.then(_resumeAfterTest) : stage === 1 ? result.then(_resumeAfterBody) : updateValue.then(_resumeAfterUpdate)).then(void 0, reject);
  return pact;

  function _resumeAfterBody(value) {
    result = value;

    do {
      if (update) {
        updateValue = update();

        if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
          updateValue.then(_resumeAfterUpdate).then(void 0, reject);
          return;
        }
      }

      shouldContinue = test();

      if (!shouldContinue || _isSettledPact(shouldContinue) && !shouldContinue.v) {
        _settle(pact, 1, result);

        return;
      }

      if (shouldContinue.then) {
        shouldContinue.then(_resumeAfterTest).then(void 0, reject);
        return;
      }

      result = body();

      if (_isSettledPact(result)) {
        result = result.v;
      }
    } while (!result || !result.then);

    result.then(_resumeAfterBody).then(void 0, reject);
  }

  function _resumeAfterTest(shouldContinue) {
    if (shouldContinue) {
      result = body();

      if (result && result.then) {
        result.then(_resumeAfterBody).then(void 0, reject);
      } else {
        _resumeAfterBody(result);
      }
    } else {
      _settle(pact, 1, result);
    }
  }

  function _resumeAfterUpdate() {
    if (shouldContinue = test()) {
      if (shouldContinue.then) {
        shouldContinue.then(_resumeAfterTest).then(void 0, reject);
      } else {
        _resumeAfterTest(shouldContinue);
      }
    } else {
      _settle(pact, 1, result);
    }
  }
}
/**
 * @description: 
 * @param { CurrencyProps } fromCurrency  : swap from token info
 * @param { CurrencyProps} toCurrency     : swap to token info
 * @param { string } accounts             : swap user account info
 * @param {boolean } isInsurance          : is use insurance
 * @return { 
 *        loading             :boolean, 
 *        resultState         :object,  { priceStatus: 0, swapFee: 0, fromTokenValue: "", miniReceived: 0,  resStatus: []}
 *        insuranceStatus     :boolean, 
 *        isToCzz             :boolean, 
 *        routerFrom          :string[], swap from token name array
 *        routerTo            :string[], swap to token name array
 *        bestFromArr         :string[], swap from token address array
 *        bestToArr           :string[]  swap to token address array
 * }

 */

function useGetTokenValue() {
  var _useState5 = react.useState(false),
      loading = _useState5[0],
      setLoading = _useState5[1];

  var _useState6 = react.useState(false),
      isToCzz = _useState6[0],
      setIsToCzz = _useState6[1];

  var _useState7 = react.useState([]),
      routerFrom = _useState7[0],
      setRouterFrom = _useState7[1];

  var _useState8 = react.useState([]),
      routerTo = _useState8[0],
      setRouterTo = _useState8[1];

  var _useState9 = react.useState(false),
      insuranceStatus = _useState9[0],
      setInsuranceStatus = _useState9[1];

  var _useState10 = react.useState([]),
      bestFromArr = _useState10[0],
      setBestFromArr = _useState10[1];

  var _useState11 = react.useState([]),
      bestToArr = _useState11[0],
      setBestToArr = _useState11[1];

  var _useState12 = react.useState({
    priceStatus: 0,
    swapFee: 0,
    fromTokenValue: "",
    changeAmount: 0,
    miniReceived: 0,
    resStatus: []
  }),
      resultState = _useState12[0],
      setResultState = _useState12[1];

  var newPools;
  var bestTokenArr;
  /**
   * @description: insurance Status
   * @param { CurrencyProps } to   : swap to token info
   * @param { number } amount      : amount
   * @return { insuranceStatus: boolean }
   */

  var changeInsuranceStatus = function changeInsuranceStatus(to, amount) {
    try {
      var _temp2 = function () {
        if (to != null && to.networkType && amount) {
          var decimals = 8;
          var _insuranceNetwork$to$ = insuranceNetwork[to == null ? void 0 : to.networkType],
              provider = _insuranceNetwork$to$.provider,
              securityPollAddress = _insuranceNetwork$to$.securityPollAddress;
          console.log(insuranceNetwork, provider, securityPollAddress);
          var contract = getContract(provider, securityPollAddress, ABI_SECURITY_POOL);
          var pid = Web3__default['default'].utils.numberToHex(0);
          return Promise.resolve(contract.methods.poolInfo(pid).call()).then(function (poolInfo) {
            var totalAmountBn = new BigNumber__default['default'](poolInfo.totalAmount);
            var tenPowDec = new BigNumber__default['default'](10).pow(decimals);
            poolInfo.totalAmountDisp = totalAmountBn.dividedBy(tenPowDec).toNumber();
            console.log(poolInfo);
            var status = new BigNumber__default['default'](poolInfo.totalAmount).comparedTo(new BigNumber__default['default'](amount)) > 0;
            setInsuranceStatus(status);
          });
        }
      }();

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  /**
   * @description: Get Burn amount Post
   * @param { CurrencyProps } pool         : swap token info must be from or to token
   * @param { number } tokenValue          : swap token value 
   * @param { boolean } isFrom             : only pool is from token then true , else  false
   * @return {  maxResult: number }        : compute all possible swap path , get the maxResult  by interface getAmountsOut
   */


  var swapBurnAmount = function swapBurnAmount(pool, tokenValue, isFrom) {
    if (pool === void 0) {
      pool = {};
    }

    if (isFrom === void 0) {
      isFrom = false;
    }

    try {
      return Promise.resolve(_catch$1(function () {
        var _pool = pool,
            czz = _pool.czz,
            currency = _pool.currency,
            provider = _pool.provider,
            router = _pool.router,
            networkName = _pool.networkName,
            weth = _pool.weth;
        var _pool$swap$pool$route = pool.swap[pool.route],
            swaprouter = _pool$swap$pool$route.swaprouter,
            currentToken = _pool$swap$pool$route.currentToken;
        return Promise.resolve(new Web3__default['default'](provider)).then(function (contract) {
          return Promise.resolve(new contract.eth.Contract(IUniswapV2Router02, swaprouter)).then(function (lpContract) {
            function _temp5() {
              maxResult = Math.max.apply(Math, resultEnd);
              maxResetInd = resultEnd.findIndex(function (item) {
                return item === maxResult;
              });
              bestTokenArr = tokenArray[maxResetInd];
              isFrom ? setBestFromArr(bestTokenArr) : setBestToArr(bestTokenArr);
              var nameArray = tokenArray[maxResetInd].map(function (item) {
                var _newPools$find$symbol, _newPools$find;

                return (_newPools$find$symbol = (_newPools$find = newPools.find(function (poolsItem) {
                  return poolsItem.tokenAddress === item;
                })) == null ? void 0 : _newPools$find.symbol) != null ? _newPools$find$symbol : '';
              });
              isFrom ? setRouterFrom(getRouter(pool, nameArray, 'FROM')) : setRouterTo(getRouter(pool, nameArray, 'TO'));
              console.log("SwapBurnGetAmount final result =", result);
              return maxResult;
            }

            var tokenAddress = (currency == null ? void 0 : currency.tokenAddress) || currentToken || router;
            var tokenArray = [];
            var tokenObj = {};

            if (networkName === "HECO") {
              tokenObj = {
                htToken: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f',
                ethToken: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
                dogToken: '0x099626783842d35c221e5d01694c2b928eb3b0ad',
                haiToken: '0x7663bc3ae9858cae71722aedee364e125c278bdf'
              };
            } else if (networkName === "ETH") {
              tokenObj = {
                ethToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
              };
            } else if (networkName === "BSC") {
              tokenObj = {
                bnbToken: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
                ethToken: '0x2170ed0880ac9a755fd29b2688956bd959f933f8'
              };
            }

            var tokenamount = Web3__default['default'].utils.numberToHex(new BigNumber__default['default'](tokenValue));
            tokenArray.push(isFrom ? [tokenAddress, czz] : [czz, tokenAddress]);

            for (var _i in tokenObj) {
              tokenArray.push(isFrom ? [tokenAddress, tokenObj[_i], czz] : [czz, tokenObj[_i], tokenAddress]);
            }

            var result = [];
            var resultEnd = [];
            var maxResult;
            var maxResetInd;
            var i = 0,
                len = tokenArray.length;

            var _temp4 = _for(function () {
              return i < len;
            }, function () {
              return i++;
            }, function () {
              var _temp3 = _catch$1(function () {
                return Promise.resolve(lpContract.methods.getAmountsOut(tokenamount, tokenArray[i]).call(null)).then(function (_lpContract$methods$g) {
                  result[i] = _lpContract$methods$g;
                  resultEnd[i] = Number(result[i][result[i].length - 1]);
                });
              }, function () {
                result[i] = [0];
                resultEnd[i] = 0;
              });

              if (_temp3 && _temp3.then) return _temp3.then(function () {});
            });

            return _temp4 && _temp4.then ? _temp4.then(_temp5) : _temp5(_temp4);
          });
        });
      }, function (error) {
        throw error;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  /**
   * @description: compute swap casting amount
   * @param { CurrencyProps } pool         : swap token info must be from or to token 
   * @param { boolean } setRouter          : is set swap router
   * @return { reust: number }             : swap casting amount
   */


  var swapCastingAmount = function swapCastingAmount(pool, isInsurance, setRouter) {
    if (pool === void 0) {
      pool = {};
    }

    try {
      return Promise.resolve(_catch$1(function () {
        var _pool2 = pool,
            czz = _pool2.czz,
            provider = _pool2.provider,
            networkName = _pool2.networkName,
            weth = _pool2.weth;
        var _pool$swap$pool$route2 = pool.swap[pool.route],
            swaprouter = _pool$swap$pool$route2.swaprouter,
            currentToken = _pool$swap$pool$route2.currentToken;
        return Promise.resolve(new Web3__default['default'](provider)).then(function (contract) {
          return Promise.resolve(contract.eth.getGasPrice(function (price) {
            return price;
          })).then(function (gasPrice) {
            var gas = gasPrice * 800000;

            if (networkName === "HECO") {
              gas = gasPrice * 1500000;
            }

            if (networkName === "BSC") {
              gas = gasPrice * 2500000;
            } // debugger


            if (networkName === "BSC" && isInsurance && !isToCzz) {
              gas = gasPrice * 500000;
            }

            if (networkName === "HECO" && isInsurance && !isToCzz) {
              gas = gasPrice * 500000;
            }

            if (networkName === "ETH" && isInsurance && !isToCzz) {
              gas = gasPrice * 400000;
            }

            var result_1 = new BigNumber__default['default'](Number(gas)).toString();
            return Promise.resolve(new contract.eth.Contract(IUniswapV2Router02, swaprouter)).then(function (lpContract) {
              var tokenArray = [];

              if (networkName === "HECO") {
                tokenArray = [currentToken, weth, czz];
              } else {
                tokenArray = [currentToken, czz];
              }

              return Promise.resolve(lpContract.methods.getAmountsOut(result_1, tokenArray).call(null)).then(function (result) {
                console.log("SwapBurnGetAmount result ===", result);
                return result[result.length - 1];
              });
            });
          });
        });
      }, function (error) {
        throw error;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  /**
   * @description: main method : swap token value info
   * @param { CurrencyProps } from          : swap from token info
   * @param { CurrencyProps } to            : swap from token info
   * @return { resultState : object}        : main method return all info
   */


  var swapTokenValue = function swapTokenValue(fromCurrency, toCurrency, isInsurance) {
    try {
      var _exit2;

      var fromNetwork = networks.filter(function (i) {
        return i.networkType === (fromCurrency == null ? void 0 : fromCurrency.systemType);
      });
      var toNetwork = networks.filter(function (i) {
        return i.networkType === (toCurrency == null ? void 0 : toCurrency.systemType);
      });

      var from = _extends({}, fromNetwork[0], {
        currency: fromCurrency,
        tokenValue: fromCurrency.tokenValue,
        route: fromCurrency.route
      });

      var to = _extends({}, toNetwork[0], {
        currency: toCurrency,
        tokenValue: toCurrency.tokenValue,
        route: toCurrency.route
      });

      newPools = [].concat(pools, [fromCurrency, toCurrency]);
      var resultStage = [];
      resultStage = [].concat(resultStage, ['initial']);
      return Promise.resolve(function () {
        if (from && from != null && from.currency && to != null && to.currency && from != null && from.tokenValue && Number(from == null ? void 0 : from.tokenValue) > 0) {
          return _catch$1(function () {
            function _temp10(_result2) {
              if (_exit2) return _result2;

              function _temp8() {
                var _to$currency, _to$currency2;

                console.log("SWAP AMOUNT ==", from.tokenValue, "miniReceived", miniReceived);
                resultStage = [].concat(resultStage, ['end']);
                setResultState(_extends({}, resultState, {
                  fromTokenValue: from.tokenValue,
                  miniReceived: miniReceived,
                  swapFee: swapFee,
                  changeAmount: changeAmount,
                  resStatus: [].concat(resultStage)
                }));
                setLoading(false);
                setIsToCzz(to != null && (_to$currency = to.currency) != null && _to$currency.symbol ? (to == null ? void 0 : (_to$currency2 = to.currency) == null ? void 0 : _to$currency2.symbol.indexOf('CZZ')) !== -1 : false);
              }

              var swapFee = 0;
              var miniReceived = 0;
              var tokenAddress = to.currency.tokenAddress ? to.currency.tokenAddress : to.currentToken;
              var totoken = new sdk.Token(to.networkId, tokenAddress, to.currency.decimals);
              console.log(to.currency.tokenAddress, to.czz);

              var _temp7 = function () {
                if (to.currency.tokenAddress !== to.czz) {
                  return Promise.resolve(swapBurnAmount(to, changeAmount, false)).then(function (result) {
                    return Promise.resolve(swapCastingAmount(to, isInsurance, false)).then(function (czzfee) {
                      var changeAmount2 = changeAmount - czzfee;
                      resultStage = [].concat(resultStage, ['to1']);
                      setResultState(_extends({}, resultState, {
                        resStatus: [].concat(resultStage)
                      }));

                      var _temp6 = function () {
                        if (changeAmount2 > 0) {
                          return Promise.resolve(swapBurnAmount(to, changeAmount2, false)).then(function (result1) {
                            var amounts1 = new sdk.TokenAmount(totoken, JSBI__default['default'].BigInt(result1));
                            swapFee = new sdk.TokenAmount(totoken, JSBI__default['default'].BigInt(result - result1)).toSignificant(6);
                            miniReceived = amounts1.toSignificant(6);
                            resultStage = [].concat(resultStage, ['to2']);
                            setResultState(_extends({}, resultState, {
                              resStatus: [].concat(resultStage)
                            }));
                          });
                        }
                      }();

                      if (_temp6 && _temp6.then) return _temp6.then(function () {});
                    });
                  });
                } else {
                  resultStage = [].concat(resultStage, ['to3']);
                  setResultState(_extends({}, resultState, {
                    resStatus: [].concat(resultStage)
                  }));
                  return Promise.resolve(swapCastingAmount(to, isInsurance, true)).then(function (czzfee) {
                    if (changeAmount - czzfee < 0) {
                      miniReceived = 0;
                    } else {
                      var nameArray = [to.currency.name];
                      setRouterTo(nameArray);
                      var amounts2 = new sdk.TokenAmount(totoken, JSBI__default['default'].BigInt(changeAmount - czzfee));
                      swapFee = new sdk.TokenAmount(totoken, JSBI__default['default'].BigInt(czzfee)).toSignificant(6);
                      miniReceived = amounts2.toSignificant(6);
                    }
                  });
                }
              }();

              return _temp7 && _temp7.then ? _temp7.then(_temp8) : _temp8(_temp7);
            }

            setLoading(true);
            resultStage = [].concat(resultStage, ['loading']);
            setResultState(_extends({}, resultState, {
              priceStatus: 0,
              resStatus: [].concat(resultStage)
            }));
            var changeAmount = 0;
            var inAmount = decToBn(from.tokenValue, from.currency.decimals).toString();
            changeInsuranceStatus(to);

            var _temp9 = function () {
              if (from.currency.tokenAddress !== from.czz) {
                console.log('inAmount == ', inAmount);
                return Promise.resolve(swapBurnAmount(from, inAmount, true)).then(function (inAmountRes) {
                  changeAmount = new BigNumber__default['default'](inAmountRes);
                  console.log('inAmountExchangeValue == ', changeAmount.toString());
                  resultStage = [].concat(resultStage, ['from']);
                  setResultState(_extends({}, resultState, {
                    resStatus: [].concat(resultStage)
                  }));

                  if (changeAmount === "0") {
                    resultStage = [].concat(resultStage, ['NONE_TRADE']);
                    setResultState(_extends({}, resultState, {
                      resStatus: [].concat(resultStage)
                    }));
                    setLoading(false);
                    _exit2 = 1;
                    return false;
                  }
                });
              } else {
                // from: HCZZ;BCZZ;ECZZ
                resultStage = [].concat(resultStage, ['from2']);
                setResultState(_extends({}, resultState, {
                  resStatus: [].concat(resultStage)
                }));
                var nameArray = [from.currency.name];
                setRouterFrom(nameArray);
                changeAmount = new BigNumber__default['default'](inAmount);
              }
            }();

            return _temp9 && _temp9.then ? _temp9.then(_temp10) : _temp10(_temp9);
          }, function (error) {
            var _to$currency3, _to$currency4;

            resultStage = [].concat(resultStage, ['NONE_TRADE']);
            setResultState(_extends({}, resultState, {
              resStatus: [].concat(resultStage)
            }));
            setLoading(false);
            setIsToCzz(to != null && (_to$currency3 = to.currency) != null && _to$currency3.symbol ? (to == null ? void 0 : (_to$currency4 = to.currency) == null ? void 0 : _to$currency4.symbol.indexOf('CZZ')) !== -1 : false);
            throw error;
          });
        }
      }());
    } catch (e) {
      return Promise.reject(e);
    }
  };
  /**
   * @description: replace token name where is ''
   * @param { CurrencyProps } pool         : swap token info must be from or to token
   * @param { string[] } arr               : swap token name array
   * @param { string : 'FROM'|'TO' } type  : swap token name type must be 'FROM' or 'TO'
   * @return { string[] }                  : get new token name array 
   */


  var getRouter = function getRouter(pool, arr, type) {
    var _pool3, _pool3$currency;

    if (pool === void 0) {
      pool = {};
    }

    var newArr = [].concat(arr);
    var systemType = (_pool3 = pool) == null ? void 0 : (_pool3$currency = _pool3.currency) == null ? void 0 : _pool3$currency.systemType;

    if (newArr.includes('')) {
      var ind = newArr.findIndex(function (item) {
        return !item;
      });

      switch (systemType) {
        case 'HECO':
          newArr[ind] = 'HT';
          break;

        case 'ETH':
          newArr[ind] = 'ETH';
          break;

        case 'BSC':
          newArr[ind] = 'BNB';
          break;
      }
    }

    return newArr;
  }; // useEffect(() => {
  //   setIsToCzz(to?.currency?.symbol ? to?.currency?.symbol.indexOf('CZZ') !== -1 : false)
  // }, [to?.currency?.symbol])
  // Get token Value Effect
  // useEffect(() => {
  //   if (from.currency && from?.tokenValue && to.currency?.symbol) {
  //     swapTokenValue(from, to)
  //   }
  // }, [from.tokenValue])


  return {
    loading: loading,
    resultState: resultState,
    insuranceStatus: insuranceStatus,
    isToCzz: isToCzz,
    routerFrom: routerFrom,
    routerTo: routerTo,
    bestFromArr: bestFromArr,
    bestToArr: bestToArr,
    swapTokenValue: swapTokenValue
  };
}

/**
 * @description: generate  pair address by tokenA and tokenB
 * @param { Token } tokenA              
 * @param { Token } tokenB
 * @param { string } factoryAddreaa
 * @param { string } initCodeHash
 * @return { string }  
 */

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}
/**
 * @description: generate token pair by tokenA and tokenB
 * @param { Token } tokenA
 * @param { Token } tokenB
 * @param { string } factoryAddress
 * @param { string } initCodeHash
 * @param { Web3.providers.HttpProvider } provider
 * @return { Pair }
 */


function _finallyRethrows(body, finalizer) {
  try {
    var result = body();
  } catch (e) {
    return finalizer(true, e);
  }

  if (result && result.then) {
    return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
  }

  return finalizer(false, result);
}

function getAddress(tokenA, tokenB, factoryAddreaa, initCodeHash) {
  var _PAIR_ADDRESS_CACHE, _PAIR_ADDRESS_CACHE$t;

  var PAIR_ADDRESS_CACHE = {};
  var tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]; // does safety checks

  if (((_PAIR_ADDRESS_CACHE = PAIR_ADDRESS_CACHE) == null ? void 0 : (_PAIR_ADDRESS_CACHE$t = _PAIR_ADDRESS_CACHE[tokens[0].address]) == null ? void 0 : _PAIR_ADDRESS_CACHE$t[tokens[1].address]) === undefined) {
    var _PAIR_ADDRESS_CACHE2, _extends2, _extends3;

    PAIR_ADDRESS_CACHE = _extends({}, PAIR_ADDRESS_CACHE, (_extends3 = {}, _extends3[tokens[0].address] = _extends({}, (_PAIR_ADDRESS_CACHE2 = PAIR_ADDRESS_CACHE) == null ? void 0 : _PAIR_ADDRESS_CACHE2[tokens[0].address], (_extends2 = {}, _extends2[tokens[1].address] = address.getCreate2Address(factoryAddreaa, solidity.keccak256(['bytes'], [solidity.pack(['address', 'address'], [tokens[0].address, tokens[1].address])]), initCodeHash), _extends2)), _extends3));
  }

  return PAIR_ADDRESS_CACHE[tokens[0].address][tokens[1].address];
}
var fetchPairData = function fetchPairData(tokenA, tokenB, factoryAddress, initCodeHash, provider) {
  try {
    var address = getAddress(tokenA, tokenB, factoryAddress, initCodeHash);
    var infoContract = new Web3__default['default'](provider);
    var lpContract = new infoContract.eth.Contract(IUniswapV2Pair, address);
    return Promise.resolve(_catch(function () {
      return Promise.resolve(lpContract.methods.getReserves().call(null)).then(function (result) {
        var reserves0 = result[0];
        var reserves1 = result[1];
        var balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
        return new sdk.Pair(new sdk.TokenAmount(tokenA, balances[0]), new sdk.TokenAmount(tokenB, balances[1]));
      });
    }, function (error) {
      console.log(error);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
/**
 * @description: get swap price info
 * @param { CurrencyProps } fromCurrency      : swap from token info 
 * @param { CurrencyProps } toCurrency        : swap to token info 
 * @param { string[] } bestFromArr            : swap from token address array
 * @param { string[] } bestToArr              : swap to token address array
 * @param { number } swapFee                  : swap fee
 * @return {
 *        loading : boolean, 
 *        impactPrice : number ,  important swap price 
 *        resultState : object   {
                ethRes: number,
                czzRes: number,
                midPrice: number,
                midProce2: number,
                priceStatus: number,   3|2|1|0  
                priceEffect: string,   'SWAP_IMPACT_HIGH'|'SWAP_IMPACT_WARN'|'SWAP_IMPACT_WARN'|'SWAP'
                price: string,
                resStatus: string[]
              }
 * }
 */

function useMidPrice() {
  var _useState = react.useState(false),
      loading = _useState[0],
      setLoading = _useState[1];

  var _useState2 = react.useState(0),
      impactPrice = _useState2[0],
      setImpactPrice = _useState2[1];

  var _useState3 = react.useState({
    ethRes: 0.0,
    czzRes: 0.0,
    midPrice: 0.0,
    midProce2: 0.0,
    priceStatus: 0,
    priceEffect: '',
    price: '',
    resStatus: []
  }),
      resultState = _useState3[0],
      setResultState = _useState3[1];
  /**
   * @description: 
   * @param { CurrencyProps } lp          : swap token info must be from or to token
   * @param { string[] } routerList       : the best path token address array
   * @return { number }                   : swap rate
   */


  var fetchPair = function fetchPair(lp, routerList) {
    try {
      var networkId = lp.networkId,
          currency = lp.currency,
          czz = lp.czz,
          provider = lp.provider,
          networkName = lp.networkName,
          weth = lp.weth;
      var _lp$swap$lp$route = lp.swap[lp.route],
          factoryAddress = _lp$swap$lp$route.factoryAddress,
          currentToken = _lp$swap$lp$route.currentToken,
          initCodeHash = _lp$swap$lp$route.initCodeHash;
      var newWethToken = weth; // debugger

      var isDirectSwap = false;

      if (routerList && routerList.length === 2) {
        newWethToken = czz;
        isDirectSwap = true;
      }

      if (routerList && routerList.length === 3) {
        newWethToken = routerList[1];
        isDirectSwap = false;
      }

      var From = new sdk.Token(Number(networkId), currency.tokenAddress ? currency.tokenAddress : currentToken, currency.tokenAddress ? currency.decimals : 18);
      var Eczz = new sdk.Token(Number(networkId), czz, 8);
      var WETH = new sdk.Token(Number(networkId), newWethToken, 18);
      return Promise.resolve(_catch(function () {
        function _temp2() {
          var from_weth = route0.midPrice.toSignificant(6);
          var eczz_weth = isDirectSwap ? 1 : route1.midPrice.toSignificant(6);
          return eczz_weth / from_weth;
        }

        var FromPair, route0, ToPair, route1;

        var _temp = function () {
          if (isDirectSwap) {
            return Promise.resolve(fetchPairData(Eczz, From, factoryAddress, initCodeHash, provider)).then(function (_fetchPairData) {
              FromPair = _fetchPairData;
              route0 = new sdk.Route([FromPair], Eczz);
            });
          } else {
            return Promise.resolve(fetchPairData(WETH, From, factoryAddress, initCodeHash, provider)).then(function (_fetchPairData2) {
              FromPair = _fetchPairData2;
              route0 = new sdk.Route([FromPair], WETH);
              return Promise.resolve(fetchPairData(WETH, Eczz, factoryAddress, initCodeHash, provider)).then(function (_fetchPairData3) {
                ToPair = _fetchPairData3;
                route1 = new sdk.Route([ToPair], WETH);
              });
            });
          }
        }();

        return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
      }, function (error) {
        throw new Error(error);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  /**
   * @description: main method 
   */


  var fetchPrice = react.useCallback(function (fromCurrency, toCurrency, bestFromArr, bestToArr, swapFee) {
    try {
      var fromNetwork = networks.filter(function (i) {
        return i.networkType === (fromCurrency == null ? void 0 : fromCurrency.systemType);
      });
      var toNetwork = networks.filter(function (i) {
        return i.networkType === (toCurrency == null ? void 0 : toCurrency.systemType);
      });

      var from = _extends({}, fromNetwork[0], {
        currency: fromCurrency,
        tokenValue: fromCurrency.tokenValue,
        route: fromCurrency.route
      });

      var to = _extends({}, toNetwork[0], {
        currency: toCurrency,
        tokenValue: toCurrency.tokenValue,
        route: toCurrency.route
      });

      var resultStage = [];
      resultStage = ['initial'];
      return Promise.resolve(function () {
        if (from.tokenValue && Number(swapFee) > 0) {
          return _finallyRethrows(function () {
            return _catch(function () {
              function _temp6() {
                function _temp4() {
                  var midPrice = ethRes / czzRes;
                  var midProce2 = Number(Number(Number(from.tokenValue) * midPrice).toFixed(to.currency.decimals));
                  var price = Number((midProce2 - Number(to.tokenValue) - Number(swapFee)) / midProce2 * 100).toFixed(2);
                  resultStage = [].concat(resultStage, ['end']);
                  setImpactPrice(price);
                  var priceEffect = changePriceStatus(price);
                  setResultState(_extends({}, resultState, {
                    ethRes: ethRes,
                    czzRes: czzRes,
                    midPrice: midPrice,
                    midProce2: midProce2,
                    price: price,
                    priceStatus: priceEffect.priceStatus,
                    priceEffect: priceEffect.priceEffect,
                    resStatus: [].concat(resultStage)
                  }));
                  setLoading(false);
                  console.log('fetchPrice1', resultState);
                }

                var czzRes = 1;

                var _temp3 = function () {
                  if (to.currency.tokenAddress !== to.czz) {
                    resultStage = [].concat(resultStage, ['czzRes']);
                    return Promise.resolve(fetchPair(to, bestToArr)).then(function (_fetchPair2) {
                      czzRes = _fetchPair2;
                    });
                  }
                }();

                return _temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3);
              }

              setLoading(true);
              resultStage = [].concat(resultStage, ['loading', 'FINDING_PRICE_ING']); // debugger

              var ethRes = 1;

              var _temp5 = function () {
                if (from.currency.tokenAddress !== from.czz) {
                  resultStage = [].concat(resultStage, ['ethRes']);
                  return Promise.resolve(fetchPair(from, bestFromArr)).then(function (_fetchPair) {
                    ethRes = _fetchPair;
                  });
                }
              }();

              return _temp5 && _temp5.then ? _temp5.then(_temp6) : _temp6(_temp5);
            }, function (error) {
              setLoading(false);
              resultStage = [].concat(resultStage, ['NONE_TRADE']);
              setResultState(_extends({}, resultState, {
                resStatus: [].concat(resultStage)
              }));
              setImpactPrice(0);
              console.log('fetchPrice2', resultState);
              throw error;
            });
          }, function (_wasThrown, _result2) {
            setLoading(false);
            if (_wasThrown) throw _result2;
            return _result2;
          });
        }
      }());
    } catch (e) {
      return Promise.reject(e);
    }
  }, []);
  /**
   * @description: change price status 
   * @param { price : number } 
   * @return {  
   *       priceStatus: number,   3|2|1|0
   *       priceEffect: string,   'SWAP_IMPACT_HIGH'|'SWAP_IMPACT_WARN'|'SWAP_IMPACT_WARN'|'SWAP'
   * }
   */

  var changePriceStatus = function changePriceStatus(val) {
    var price = Number(val);

    if (price > 15) {
      return {
        priceStatus: 3,
        priceEffect: 'SWAP_IMPACT_HIGH'
      };
    } else if (price > 5 && price < 15) {
      return {
        priceStatus: 2,
        priceEffect: 'SWAP_IMPACT_WARN'
      };
    } else if (price > 3 && price < 5) {
      return {
        priceStatus: 1,
        priceEffect: 'SWAP_IMPACT_WARN'
      };
    } else if (price < 3) {
      return {
        priceStatus: 0,
        priceEffect: 'SWAP'
      };
    }
  }; // useEffect(() => {
  //   if (to.currency && to.tokenValue) {
  //     fetchPrice()
  //   }
  // }, [to.tokenValue])


  return {
    loading: loading,
    impactPrice: impactPrice,
    resultState: resultState,
    fetchPrice: fetchPrice
  };
}

var numberToHex = Web3__default['default'].utils.numberToHex;
window.web3 = Web3__default['default'];
window.BigNumber = BigNumber__default['default'];
/**
 * @description: swap from one token to another
 */

function useSwapAndBurn() {
  var _useState = react.useState(null),
      receipt = _useState[0],
      setReceipt = _useState[1];

  var _useState2 = react.useState(null),
      hash = _useState2[0],
      setHash = _useState2[1];

  var _useState3 = react.useState(false),
      loading = _useState3[0],
      setLoading = _useState3[1];

  var _useState4 = react.useState([]),
      pending = _useState4[0],
      setPending = _useState4[1];

  var stopPending = function stopPending(id) {
    setLoading(false);
    setPending(pending.filter(function (i) {
      return i.id !== id;
    }));
  }; // reset swap token loop


  var swapSuccess = function swapSuccess(from, to, receipt) {
    successMessage(from, to, receipt); // debugger
    // resSwap()
  };
  /**
   * @description: swap main
   * @param { CurrencyProps } fromCurrency      : swap from token info
   * @param { CurrencyProps } toCurrency        : swap to token info
   * @param { Web3.providers.HttpProvider } provider  : Web3.providers.HttpProvider
   * @param { string } accounts                 : user account info
   * @param { SwapSettingProps } swapSetting    : swap setting
   * @param { number } changeAmount             : swap changeAmount
   * @param { string[] } bestFromArr            : swap from token address array
   * @param {boolean } isInsurance          : is use insurance
   * 
   */


  var fetchSwap = function fetchSwap(fromCurrency, toCurrency, currentProvider, accounts, swapSetting, changeAmount, bestFromArr, isInsurance) {
    var _from$currency, _from$currency2, _to$currency;

    setLoading(true); // setButtonText('SWAP_ING')

    var fromNetwork = networks.filter(function (i) {
      return i.networkType === (fromCurrency == null ? void 0 : fromCurrency.systemType);
    });
    var toNetwork = networks.filter(function (i) {
      return i.networkType === (toCurrency == null ? void 0 : toCurrency.systemType);
    });

    var from = _extends({}, fromNetwork[0], {
      currency: fromCurrency,
      tokenValue: fromCurrency.tokenValue,
      route: fromCurrency.route
    });

    var to = _extends({}, toNetwork[0], {
      currency: toCurrency,
      tokenValue: toCurrency.tokenValue,
      route: toCurrency.route
    });

    var tolerance = swapSetting.tolerance,
        deadline = swapSetting.deadline;
    var infoContract = new Web3__default['default'](currentProvider);
    var lpContract = new infoContract.eth.Contract(from.abi, from.router);
    var amountIn = decToBn(Number(from == null ? void 0 : from.tokenValue), (_from$currency = from.currency) == null ? void 0 : _from$currency.decimals); // debugger

    var tolerancAmount = changeAmount ? Web3__default['default'].utils.numberToHex(changeAmount.multipliedBy(100 - 3).dividedBy(100).integerValue(BigNumber__default['default'].ROUND_DOWN)) : 0; // history params

    console.log("swapSetting  ->  tolerance : " + tolerance + " , deadline : " + deadline);
    var swapTime = new Date().getTime();
    var deadlineVal = deadline ? swapTime + deadline : 100000000000000;
    var recentItem = {
      types: 'Swap',
      accounts: accounts,
      content: "Swap " + (from == null ? void 0 : from.tokenValue) + " " + ((_from$currency2 = from.currency) == null ? void 0 : _from$currency2.symbol) + " to " + (to == null ? void 0 : to.miniReceived) + " " + ((_to$currency = to.currency) == null ? void 0 : _to$currency.symbol)
    };

    var getHashUrl = function getHashUrl(address) {
      var _from$currency3, _to$currency2;

      return {
        explorerUrl: from.explorerUrl + "tx/" + address,
        fromUrl: from.explorerUrl,
        fromType: from.networkType,
        fromSymbol: (_from$currency3 = from.currency) == null ? void 0 : _from$currency3.symbol,
        toSymbol: (_to$currency2 = to.currency) == null ? void 0 : _to$currency2.symbol,
        toType: to.networkType,
        toUrl: to.explorerUrl,
        fromImage: from.currency.image,
        toImage: to.currency.image,
        fromRoute: from.swap[from.route],
        toRoute: to.swap[to.route]
      };
    };

    var swapTranscationHash = function swapTranscationHash(hashRes) {
      console.log('Swap Hash Result ===', hashRes);

      var swapResresult = _extends({}, recentItem, {
        status: 0,
        hash: hashRes
      }, getHashUrl(hashRes), {
        id: swapTime
      }); // setRecent([swapResresult, ...recent])


      setHash(swapResresult);
      setPending([].concat(pending, [swapResresult]));
    };

    var swapReceipt = function swapReceipt(receipt, id) {
      console.log('Swap receipt Result ===> ', receipt);
      setReceipt(receipt);
      swapSuccess(from, to, receipt);
      stopPending(swapTime);
    };

    var swapError = function swapError(error) {
      setLoading(false);
      stopPending(swapTime); // setButtonText('SWAP')

      console.log('Swap Error ===>', error);
    };

    var lpSwap = function lpSwap(swaprouter, toaddress) {
      var path = [];

      if ((bestFromArr == null ? void 0 : bestFromArr.length) > 0) {
        path = [].concat(bestFromArr);
      }

      lpContract.methods.swapAndBurnWithPath(numberToHex(new BigNumber__default['default'](amountIn)), tolerancAmount, // tolerancAmount, // 0
      to.ntype, toaddress, swaprouter, // change router setting
      path, // change weth setting
      deadlineVal).send({
        from: accounts
      }).on("transactionHash", swapTranscationHash).on("receipt", swapReceipt).on("error", swapError);
    };

    var czzSwap = function czzSwap(toaddress) {
      lpContract.methods.burn(numberToHex(new BigNumber__default['default'](amountIn)), to.ntype, toaddress).send({
        from: accounts
      }).on("transactionHash", swapTranscationHash).on("receipt", swapReceipt).on("error", swapError);
    };

    var ethSwap = function ethSwap(swaprouter, toaddress) {
      var path = [];

      if ((bestFromArr == null ? void 0 : bestFromArr.length) > 0) {
        path = [].concat(bestFromArr);
      }

      lpContract.methods.swapAndBurnEthWithPath(tolerancAmount, // tolerancAmount, // 0
      to.ntype, toaddress, swaprouter, // change router setting
      path, // change weth setting
      deadlineVal).send({
        from: accounts,
        value: new BigNumber__default['default'](amountIn)
      }).on("transactionHash", swapTranscationHash).on("receipt", swapReceipt).on("error", swapError);
    }; // debugger


    var toaddress = to.currency.tokenAddress ? to.currency.tokenAddress : "0x0000000000000000000000000000000000000000";

    if (to.currency.tokenAddress === to.czz) {
      toaddress = to.czz;
    }

    var swaprouter = from.swap[from.route].swaprouter;
    var swaprouter2 = to.swap[to.route].swaprouter;
    toaddress = toaddress + '#' + swaprouter2;

    if (to.currency.tokenAddress !== to.czz && isInsurance) {
      toaddress = toaddress + '#true';
    }

    if (from.currency.tokenAddress !== from.czz) {
      from.currency.tokenAddress ? lpSwap(swaprouter, toaddress) : ethSwap(swaprouter, toaddress);
    } else {
      czzSwap(toaddress);
    }
  };

  var successMessage = function successMessage(from, to, res) {
    //todo callback function
    console.log("successMessage : Swap " + (from == null ? void 0 : from.currency.symbol) + " to " + (to == null ? void 0 : to.currency.symbol) + "  process url  " + (from == null ? void 0 : from.explorerUrl) + "tx/" + res.transactionHash);
  };

  return {
    loading: loading,
    receipt: receipt,
    hash: hash,
    fetchSwap: fetchSwap,
    setHash: setHash
  };
}

exports.useGetTokenValue = useGetTokenValue;
exports.useMidPrice = useMidPrice;
exports.useSwapAndBurn = useSwapAndBurn;
