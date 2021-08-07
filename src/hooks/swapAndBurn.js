import { decToBn } from '../utils'
import networks from '../utils/networks'
import { czzAsync } from './czzAsync'
import { allowanceAction } from './getTokenValue'
import Web3 from 'web3'
import BigNumber from "bignumber.js"
const { numberToHex } = Web3.utils

/**
 * @description: swap from one token to another
 */


let state = {
  receipt: null,
  hash: null
}

// reset swap token loop
const resSwap = () => {

}

// Swap Success
const swapSuccess = (from, to, receipt) => {
  successMessage(from, to, receipt)
  // debugger
  // resSwap()
}

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

const fetchSwap = async (fromCurrency, toCurrency, currentProvider, accounts, swapSetting, resGetTokenValue, resGetMidPrice, isInsurance) => {
  return new Promise(async function (resolve, reject) {
    try {
      let canSwap = false
      if (resGetTokenValue.changeAmount > 0 && resGetTokenValue.swapFee > 0 && resGetTokenValue.miniReceived > 0 && resGetTokenValue.bestFromArr.length > 0 && resGetMidPrice.impactPrice > 0 && accounts) {
        canSwap = true
      }
      if (!canSwap) {
        reject('please check params : result getTokenValue, result getMidPrice , accounts')
      }

      //allowanceAction  authorization
      let authorization = false
      const resAllow = await allowanceAction(fromCurrency, currentProvider, accounts)
      authorization = resAllow.data.authorization
      if (!authorization) {
        reject('please call approveActions first')
      }

    } catch {
      reject('please check params : result getTokenValue, result getMidPrice , accounts, ...')
    }
    try {
      const fromNetwork = networks.filter(i => i.networkType === fromCurrency?.systemType)
      const toNetwork = networks.filter(i => i.networkType === toCurrency?.systemType)
      const from = { ...fromNetwork[0], currency: fromCurrency, tokenValue: fromCurrency.tokenValue, route: fromCurrency.route }
      const to = { ...toNetwork[0], currency: toCurrency, tokenValue: toCurrency.tokenValue, route: toCurrency.route }
      const { tolerance, deadline } = swapSetting
      const infoContract = new Web3(currentProvider)
      const lpContract = new infoContract.eth.Contract(
        from.abi,
        from.router
      )

      const getHashUrl = address => {
        return {
          explorerUrl: `${from.explorerUrl}tx/${address}`,
          fromUrl: from.explorerUrl,
          fromType: from.networkType,
          fromSymbol: from.currency?.symbol,
          toSymbol: to.currency?.symbol,
          toType: to.networkType,
          toUrl: to.explorerUrl,
          fromImage: from.currency.image,
          toImage: to.currency.image,
          fromRoute: from.swap[from.route],
          toRoute: to.swap[to.route]
        }
      }

      const swapTranscationHash = hashRes => {
        console.log('Swap Hash Result ===', hashRes)
        const swapResresult = { ...recentItem, status: 0, hash: hashRes, ...getHashUrl(hashRes), id: swapTime }
        state.hash = swapResresult
        if (state.receipt) {
          resolve(state)
        }
      }

      const swapReceipt = (receipt) => {
        console.log('Swap receipt Result ===> ', receipt)
        state.receipt = receipt
        swapSuccess(from, to, receipt)
        if (state.hash) {
          resolve(state)
        }
      }

      const swapError = (error) => {
        console.log('Swap Error ===>', error)
        reject(error)
      }

      const lpSwap = (swaprouter, toaddress) => {
        let path = []
        if (resGetTokenValue.bestFromArr?.length > 0) {
          path = [...resGetTokenValue.bestFromArr]
        }
        lpContract.methods.swapAndBurnWithPath(
          numberToHex(new BigNumber(amountIn)),
          tolerancAmount, // tolerancAmount, // 0
          to.ntype,
          toaddress,
          swaprouter,              // change router setting
          path,                    // change weth setting
          deadlineVal
        )
          .send({ from: accounts })
          .on("transactionHash", swapTranscationHash)
          .on("receipt", swapReceipt)
          .on("error", swapError)
      }

      const czzSwap = (toaddress) => {
        lpContract.methods.burn(
          numberToHex(new BigNumber(amountIn)),
          to.ntype,
          toaddress
        )
          .send({ from: accounts })
          .on("transactionHash", swapTranscationHash)
          .on("receipt", swapReceipt)
          .on("error", swapError)
      }

      const ethSwap = (swaprouter, toaddress) => {

        let path = []
        if (resGetTokenValue.bestFromArr?.length > 0) {
          path = [...resGetTokenValue.bestFromArr]
        }
        lpContract.methods.swapAndBurnEthWithPath(
          tolerancAmount, // tolerancAmount, // 0
          to.ntype,
          toaddress,
          swaprouter, // change router setting
          path,       // change weth setting
          deadlineVal
        ).send({ from: accounts, value: new BigNumber(amountIn) })
          .on("transactionHash", swapTranscationHash)
          .on("receipt", swapReceipt)
          .on("error", swapError)
      }

      const amountIn = decToBn(Number(from?.tokenValue), from.currency?.decimals)
      // debugger
      const tolerancAmount = resGetTokenValue.changeAmount ? Web3.utils.numberToHex(resGetTokenValue.changeAmount.multipliedBy(100 - 3).dividedBy(100).integerValue(BigNumber.ROUND_DOWN)) : 0
      // history params
      console.log(`swapSetting  ->  tolerance : ${tolerance} , deadline : ${deadline}`);
      const swapTime = new Date().getTime()
      const deadlineVal = deadline ? swapTime + deadline : 100000000000000
      const recentItem = {
        types: 'Swap',
        accounts,
        content: `Swap ${from?.tokenValue} ${from.currency?.symbol} to ${to?.miniReceived} ${to.currency?.symbol}`
      }

      // debugger
      let toaddress = to.currency.tokenAddress ? to.currency.tokenAddress : "0x0000000000000000000000000000000000000000"
      if (to.currency.tokenAddress === to.czz) {
        toaddress = to.czz
      }

      const { swaprouter } = from.swap[from.route]
      const { swaprouter: swaprouter2 } = to.swap[to.route]
      toaddress = toaddress + '#' + swaprouter2
      if (to.currency.tokenAddress !== to.czz && isInsurance) {
        toaddress = toaddress + '#true'
      }
      if (from.currency.tokenAddress !== from.czz) {
        if (from.currency.tokenAddress === from.swap[from.route].currentToken || from.currency.tokenAddress === from.router) {
          ethSwap(swaprouter, toaddress)
        } else {
          from.currency.tokenAddress ? lpSwap(swaprouter, toaddress) : ethSwap(swaprouter, toaddress)
        }

      } else {
        czzSwap(toaddress)
      }
    }
    catch (error) {
      reject(error)
    }
  })

}

const successMessage = (from, to, res) => {
  //todo callback function
  console.log(`successMessage : Swap ${from?.currency.symbol} to ${to?.currency.symbol}  process url  ${from?.explorerUrl}tx/${res.transactionHash}`);
}

export const swapAndBurn = async (fromCurrency, toCurrency, currentProvider, accounts, swapSetting, resGetTokenValue, resGetMidPrice, isInsurance) => {
  const { run } = czzAsync()
  const res = await run(fetchSwap(fromCurrency, toCurrency, currentProvider, accounts, swapSetting, resGetTokenValue, resGetMidPrice, isInsurance))
  console.log('SwapAndBurn result==', res);
  return res
}