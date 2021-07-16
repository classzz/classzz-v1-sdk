# classzz-v1-sdk

> Classzz swap sdk

## Install

Using npm:

```sh
npm install --save-dev classzz-v1-sdk
```

or using yarn:

```sh
yarn add classzz-v1-sdk -D
```

## build sdk 
Using npm:

```sh
npm run build
```

or using yarn:

```sh
yarn build
```


## build doc 
Using npm:

```sh
npm run api:doc
```

or using yarn:

```sh
yarn api:doc
```



## use sdk

import { useGetTokenValue,useMidPrice } from 'classzz-v1-sdk'

    const from = {
        "tokenAddress": "0xa71edc38d189767582c38a3145b5873052c3e47a",
        "name": "Heco-Peg USDT",
        "symbol": "USDT",
        "decimals": 18,
        "systemType": "HECO",
        "image": "https://mdex.com/token-icons/heco/0xa71edc38d189767582c38a3145b5873052c3e47a.png",
        "route": 0,
        "tokenValue": "100"
    }

    const to = {
        "tokenAddress": "0x488E0369f9BC5C40C002eA7c1fe4fd01A198801c",
        "name": "Golff.finance",
        "symbol": "GOF",
        "decimals": 18,
        "systemType": "ETH",
        "image": "https://hecoinfo.com/token/images/gof_32.png",
        "route": 0,
        "tokenValue": "0"
    }

    const { loading, resultState, insuranceStatus, isToCzz, routerFrom, routerTo, bestFromArr, bestToArr } = useGetTokenValue(from, to, "", true)

    const { loading: midpriceStatus, impactPrice,resultState:midResult } = useMidPrice(from, to, bestFromArr, bestToArr, 118)



## dependencies
    "microbundle": "^0.13.3",
    "typedoc": "^0.21.4",
    "typescript": "^4.3.5"

## sdk dependencies
    "@ethersproject/address": "^5.4.0",
    "@ethersproject/contracts": "^5.4.0",
    "@ethersproject/networks": "^5.4.1",
    "@ethersproject/providers": "^5.4.1",
    "@ethersproject/solidity": "^5.4.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.0.1",
    "@uniswap/sdk": "^3.0.3",
    "bignumber.js": "^9.0.1",
    "jsbi": "^3.1.5",
    "web3": "^1.4.0"
