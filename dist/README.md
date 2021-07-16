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
## use 

import { useGetTokenValue,useMidPrice } from 'classzz-v1-sdk'

    const { loading, resultState, insuranceStatus, isToCzz, routerFrom, routerTo, bestFromArr, bestToArr } = useGetTokenValue(from, to, "", true)

    const { loading: midpriceStatus, impactPrice,resultState:midResult } = useMidPrice(from, to, bestFromArr, bestToArr, 118)

## dependencies
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