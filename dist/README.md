# classzz-v1-sdk

> Classzz swap sdk

## Install

Using npm:

```sh
npm install --save-dev classzz-v1-sdk
```

or using yarn:

```sh
yarn add classzz-v1-sdk
```
## use 

   import { approveActions, allowanceAction, getTokenValue, getMidPrice ,swapAndBurn}  from 'classzz-v1-sdk'

    const resGetTokenValue = await getTokenValue(from, to, true)

    const resGetMidPrice = await getMidPrice(from, to, resGetTokenValue)

    const resAllowance = await allowanceAction(from, currentProvider, accounts)

    const resApprove = await approveActions(from, currentProvider, accounts)

    const resSwap = await swapAndBurn(from, to, currentProvider, accounts, swapSetting, resGetTokenValue,resGetMidPrice, false)

   
    swap step:
    1、swapTokenValue  (must)
    2、fetchPrice     (must)
    3、check account  (must) if  true  continue else end
    4、allowanceAction (must) if  true  continue  else must call 5、approveAction 
    5、approveAction (optional ) if  true  continue  else end
    6、fetchSwap ( include  call allowanceAction)

## dependencies
    "@ethersproject/address": "^5.4.0",
    "@ethersproject/contracts": "^5.4.0",
    "@ethersproject/networks": "^5.4.1",
    "@ethersproject/providers": "^5.4.1",
    "@ethersproject/solidity": "^5.4.0",
    "@uniswap/sdk": "^3.0.3",
    "bignumber.js": "^9.0.1",
    "jsbi": "^3.1.5",
    "web3": "^1.4.0"