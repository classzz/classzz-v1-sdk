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

    const resGetMidPrice = await getMidPrice(from, to, resGetTokenValue.bestFromArr, resGetTokenValue.bestToArr, resGetTokenValue.swapFee)

    const resAllowance = await allowanceAction(from, currentProvider, accounts)

    const resApprove = await approveActions(from, currentProvider, accounts)

    if (resAllowance.data.allow && resGetTokenValue.changeAmount > 0 && resGetTokenValue.swapFee > 0 && resGetTokenValue.miniReceived > 0 && resGetMidPrice.impactPrice > 0) {
            const res = await swapAndBurn(from, to, currentProvider, accounts, swapSetting, resGetTokenValue.changeAmount, resGetTokenValue.bestFromArr, false)
        }

   
    swap step:
    1、swapTokenValue  
    2、fetchPrice     
    3、check account  if  true  continue else end
    4、approveAction  if true  continue  else must call 5、approveAction 
    5、approveAction  if  true  continue  else end
    6、fetchSwap

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