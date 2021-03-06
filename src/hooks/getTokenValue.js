import { decToBn } from '../utils'
import { allowance, approve, getContract } from '../utils/erc20'
import Web3 from "web3"
import BigNumber from 'bignumber.js'
import { Token, TokenAmount } from '@uniswap/sdk'
import { IUniswapV2Router02 } from '../abi'
import JSBI from "jsbi"
import insuranceNetwork from './insuranceNetwork'
import { ABI_SECURITY_POOL } from '../abi'
import pools from '../utils/pools'
import networks from '../utils/networks'
import { czzAsync } from './czzAsync'

/**
 * @description: if  allowance  is true  can swap , else must call useApproveActions first
 * @param { CurrencyProps } fromCurrency      : swap from token info
 * @param { currentProvider } currentProvider : current wallet provider 
 * @param { string } accounts                 : user account info
 * @return { 'authorization':boolean, 'allowanceTotal':object }  
 */
const allowanceAsync = async (fromCurrency, currentProvider, accounts) => {
  const fromNetwork = networks.filter(i => i.networkType === fromCurrency?.systemType)
  const from = { ...fromNetwork[0], tokenValue: fromCurrency.tokenValue, currency: fromCurrency }
  const { currency, router: spender, tokenValue } = from
  const { tokenAddress } = currency
  const allowanceTotal = await allowance({ provider: currentProvider, tokenAddress, spender, accounts })
  const amountToken = new BigNumber(decToBn(tokenValue))
  const allonceNum = new BigNumber(decToBn(allowanceTotal))
  console.log('Allowance result==', allonceNum)
  return { 'authorization': allonceNum.comparedTo(amountToken) > 0, 'allowanceTotal': allowanceTotal }
}

export const allowanceAction = async (fromCurrency, currentProvider, accounts) => {
  const { run } = czzAsync()
  const res = await run(allowanceAsync(fromCurrency, currentProvider, accounts))
  return res
}

/**
 * @description: before swap must call this method , and  authorization must true 
 * @param { CurrencyProps } fromCurrency  swap from token info
 * @param { currentProvider } currentProvider : current wallet provider
 * @param { string } accounts user account info
 * @return { 'authorization': boolean, 'approveResult': object }
 */
const approveAsync = async (fromCurrency, currentProvider, accounts) => {

  let authorization, approveResult
  try {
    const fromNetwork = networks.filter(i => i.networkType === fromCurrency?.systemType)
    const from = { ...fromNetwork[0], tokenValue: fromCurrency.tokenValue, currency: fromCurrency }
    const { router: spender } = from
    const res = await approve({ provider: currentProvider, tokenAddress: fromCurrency?.tokenAddress, spender, accounts })
    authorization = true
    approveResult = res
  } catch (error) {
    authorization = false
    throw error
  }
  return { 'authorization': authorization, 'approveResult': approveResult }
}

export const approveActions = async (fromCurrency, currentProvider, accounts) => {
  const { run } = czzAsync()
  const res = await run(approveAsync(fromCurrency, currentProvider, accounts))
  return res
}


/**
 * @description: 
 * @param { CurrencyProps } fromCurrency  : swap from token info
 * @param { CurrencyProps} toCurrency     : swap to token info
 * @param { string } accounts             : swap user account info
 * @param {boolean } isInsurance          : is use insurance
 * @return { 
 *        resStatus           :string[], swap status
 *        insuranceStatus     :boolean,  insuranceStatus
 *        isToCzz             :boolean,  isToCzz
 *        routerFrom          :string[], swap from token name array
 *        routerTo            :string[], swap to token name array
 *        bestFromArr         :string[], swap from token address array
 *        bestToArr           :string[], swap to token address array
 *        priceStatus         :number,   0|1|2|3 
 *        swapFee:            :number,   swap fee
 *        fromTokenValue      :string,   swap from token value
 *        changeAmount        :number,   swap from amount
 *        miniReceived        :number,   swap to token value
 * }

 */

let state = {
  isToCzz: false,
  routerFrom: [],
  routerTo: [],
  insuranceStatus: false,
  bestFromArr: [],
  bestToArr: [],
  priceStatus: 0,
  swapFee: 0,
  fromTokenValue: "",
  changeAmount: 0,
  miniReceived: 0,
  resStatus: []
}

let newPools
let bestTokenArr

/**
 * @description: insurance Status
 * @param { CurrencyProps } to   : swap to token info
 * @param { number } amount      : amount
 * @return { insuranceStatus: boolean }
 */
const changeInsuranceStatus = async (to, amount) => {
  if (to?.networkType && amount) {
    const decimals = 8
    const { provider, securityPollAddress } = insuranceNetwork[to?.networkType]
    console.log(insuranceNetwork, provider, securityPollAddress)
    const contract = getContract(provider, securityPollAddress, ABI_SECURITY_POOL)
    const pid = Web3.utils.numberToHex(0)
    const poolInfo = await contract.methods.poolInfo(pid).call()
    const totalAmountBn = new BigNumber(poolInfo.totalAmount)
    const tenPowDec = new BigNumber(10).pow(decimals)
    poolInfo.totalAmountDisp = totalAmountBn.dividedBy(tenPowDec).toNumber()
    console.log(poolInfo)
    const status = new BigNumber(poolInfo.totalAmount).comparedTo(new BigNumber(amount)) > 0
    state.insuranceStatus = status
    return state
  }
}

/**
 * @description: Get Burn amount Post
 * @param { CurrencyProps } pool         : swap token info must be from or to token
 * @param { number } tokenValue          : swap token value 
 * @param { boolean } isFrom             : only pool is from token then true , else  false
 * @return {  maxResult: number }        : compute all possible swap path , get the maxResult  by interface getAmountsOut
 */
const swapBurnAmount = async (pool = {}, tokenValue, isFrom = false) => {
  try {
    const { czz, currency, provider, router, networkName, weth } = pool
    const { swaprouter, currentToken } = pool.swap[pool.route]
    const contract = await new Web3(provider)
    const lpContract = await new contract.eth.Contract(IUniswapV2Router02, swaprouter)
    const tokenAddress = currency?.tokenAddress || currentToken || router
    let tokenArray = []
    let tokenObj = {}

    if (networkName === "HECO") {
      tokenObj = {
        htToken: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f',
        ethToken: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
        dogToken: '0x099626783842d35c221e5d01694c2b928eb3b0ad',
        haiToken: '0x7663bc3ae9858cae71722aedee364e125c278bdf'
      }
    } else if (networkName === "ETH") {
      tokenObj = {
        ethToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
      }
    } else if (networkName === "BSC") {
      tokenObj = {
        bnbToken: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        ethToken: '0x2170ed0880ac9a755fd29b2688956bd959f933f8'
      }
    }
    const tokenamount = Web3.utils.numberToHex(new BigNumber(tokenValue))
    tokenArray.push(isFrom ? [tokenAddress, czz] : [czz, tokenAddress])

    for (let i in tokenObj) {
      tokenArray.push(isFrom ? [tokenAddress, tokenObj[i], czz] : [czz, tokenObj[i], tokenAddress])
    }

    let result = []
    let resultEnd = []
    let maxResult
    let maxResetInd
    for (let i = 0, len = tokenArray.length; i < len; i++) {
      try {
        result[i] = await lpContract.methods.getAmountsOut(tokenamount, tokenArray[i]).call(null)
        resultEnd[i] = Number(result[i][result[i].length - 1])
      } catch (e) {
        result[i] = [0]
        resultEnd[i] = 0
      }
    }
    maxResult = Math.max(...resultEnd)
    maxResetInd = resultEnd.findIndex(item => item === maxResult)

    bestTokenArr = tokenArray[maxResetInd]
    isFrom ? state.bestFromArr = [...bestTokenArr] : state.bestToArr = [...bestTokenArr]

    let nameArray = tokenArray[maxResetInd].map(item => newPools.find(poolsItem => poolsItem.tokenAddress === item)?.symbol ?? '')
    isFrom ? state.routerFrom = [...getRouter(pool, nameArray, 'FROM')] : state.routerTo = [...getRouter(pool, nameArray, 'TO')]
    console.log("SwapBurnGetAmount final result =", result)
    return maxResult
  } catch (error) {
    throw error
  }
}

/**
 * @description: compute swap casting amount
 * @param { CurrencyProps } pool         : swap token info must be from or to token 
 * @param { boolean } setRouter          : is set swap router
 * @return { reust: number }             : swap casting amount
 */
const swapCastingAmount = async (pool = {}, isInsurance, isToCzz, setRouter = false) => {
  try {
    const { czz, provider, networkName, weth } = pool
    const { swaprouter, currentToken } = pool.swap[pool.route]
    const contract = await new Web3(provider)
    const gasPrice = await contract.eth.getGasPrice((price) => price)

    let gas = gasPrice * 800000
    if (networkName === "HECO") {
      gas = gasPrice * 1500000
    }

    if (networkName === "BSC") {
      gas = gasPrice * 2500000
    }
    if (networkName === "BSC" && isInsurance && !isToCzz) {
      gas = gasPrice * 500000
    }

    if (networkName === "HECO" && isInsurance && !isToCzz) {
      gas = gasPrice * 500000
    }

    if (networkName === "ETH" && isInsurance && !isToCzz) {
      gas = gasPrice * 400000
    }

    const result_1 = new BigNumber(Number(gas)).toString()
    const lpContract = await new contract.eth.Contract(IUniswapV2Router02, swaprouter)
    let tokenArray = []
    if (networkName === "HECO") {
      tokenArray = [currentToken, weth, czz]
    } else {
      tokenArray = [currentToken, czz]
    }
    const result = await lpContract.methods.getAmountsOut(result_1, tokenArray).call(null)
    console.log("SwapBurnGetAmount result ===", result)
    return result[result.length - 1]
  } catch (error) {
    throw error
  }
}

/**
 * @description: main method : swap token value info
 * @param { CurrencyProps } from          : swap from token info
 * @param { CurrencyProps } to            : swap from token info
 * @return { resultState : object}        : main method return all info
 */
const swapTokenValue = async (fromCurrency, toCurrency, isInsurance) => {
  const fromNetwork = networks.filter(i => i.networkType === fromCurrency?.systemType)
  const toNetwork = networks.filter(i => i.networkType === toCurrency?.systemType)
  const from = { ...fromNetwork[0], currency: fromCurrency, tokenValue: fromCurrency.tokenValue, route: fromCurrency.route }
  const to = { ...toNetwork[0], currency: toCurrency, tokenValue: toCurrency.tokenValue, route: toCurrency.route }

  state.insuranceStatus = isInsurance
  newPools = [...pools, fromCurrency, toCurrency]
  let resultStage = []
  resultStage = [...resultStage, 'initial']
  if (from && from?.currency && to?.currency && from?.tokenValue && Number(from?.tokenValue) > 0) {
    try {
      if (isInsurance && to.currency.tokenAddress == to.czz) {
        throw 'if to.currency.tokenAddress == to.czz do not use insurance '
      }
      state.isToCzz = (to?.currency?.symbol ? to?.currency?.symbol.indexOf('CZZ') !== -1 : false)
      resultStage = [...resultStage, 'loading']
      let changeAmount = 0
      const inAmount = decToBn(from.tokenValue, from.currency.decimals).toString()
      changeInsuranceStatus(to)
      if (from.currency.tokenAddress !== from.czz) {
        console.log('inAmount == ', inAmount)
        const inAmountRes = await swapBurnAmount(from, inAmount, true)
        changeAmount = new BigNumber(inAmountRes)
        console.log('inAmountExchangeValue == ', changeAmount.toString())
        resultStage = [...resultStage, 'from']
        if (changeAmount === "0") {
          resultStage = [...resultStage, 'NONE_TRADE']
          return false
        }
      } else {
        // from: HCZZ;BCZZ;ECZZ
        resultStage = [...resultStage, 'from2']
        let nameArray = [from.currency.name]
        state.routerFrom = [...nameArray]
        changeAmount = new BigNumber(inAmount)
      }

      let swapFee = 0
      let miniReceived = 0
      const tokenAddress = to.currency.tokenAddress ? to.currency.tokenAddress : to.currentToken
      const totoken = new Token(to.networkId, tokenAddress, to.currency.decimals)
      console.log(to.currency.tokenAddress, to.czz);
      if (to.currency.tokenAddress !== to.czz) {
        const result = await swapBurnAmount(to, changeAmount, false)
        const czzfee = await swapCastingAmount(to, isInsurance, state.isToCzz, false)
        const changeAmount2 = changeAmount - czzfee
        resultStage = [...resultStage, 'to1']
        if (changeAmount2 > 0) {
          const result1 = await swapBurnAmount(to, changeAmount2, false)
          const amounts1 = new TokenAmount(totoken, JSBI.BigInt(result1))
          swapFee = new TokenAmount(totoken, JSBI.BigInt(result - result1)).toSignificant(6)
          miniReceived = amounts1.toSignificant(6)
          resultStage = [...resultStage, 'to2']
        }
      } else {
        resultStage = [...resultStage, 'to3']
        const czzfee = await swapCastingAmount(to, isInsurance, state.isToCzz, true)
        if (changeAmount - czzfee < 0) {
          miniReceived = 0
        } else {
          let nameArray = [to.currency.name]
          state.routerTo = [...nameArray]
          const amounts2 = new TokenAmount(totoken, JSBI.BigInt(changeAmount - czzfee))
          swapFee = new TokenAmount(totoken, JSBI.BigInt(czzfee)).toSignificant(6)
          miniReceived = amounts2.toSignificant(6)
        }
      }
      console.log("SWAP AMOUNT ==", from.tokenValue, "miniReceived", miniReceived)
      resultStage = [...resultStage, 'end']

      state.fromTokenValue = from.tokenValue
      state.miniReceived = miniReceived
      state.swapFee = swapFee
      state.changeAmount = changeAmount
      state.resStatus = [...resultStage]
    } catch (error) {
      resultStage = [...resultStage, 'NONE_TRADE']
      state.resStatus = [...resultStage]
      throw error
    }
    return state
  }
}

/**
 * @description: replace token name where is ''
 * @param { CurrencyProps } pool         : swap token info must be from or to token
 * @param { string[] } arr               : swap token name array
 * @param { string : 'FROM'|'TO' } type  : swap token name type must be 'FROM' or 'TO'
 * @return { string[] }                  : get new token name array 
 */
const getRouter = (pool = {}, arr, type = 'FROM') => {
  let newArr = [...arr]
  let systemType = pool?.currency?.systemType
  if (newArr.includes('')) {
    let ind = newArr.findIndex(item => !item)
    switch (systemType) {
      case 'HECO': newArr[ind] = 'HT'; break;
      case 'ETH': newArr[ind] = 'ETH'; break;
      case 'BSC': newArr[ind] = 'BNB'; break;
    }
  }
  return newArr
}


export const getTokenValue = async (fromCurrency, toCurrency, isInsurance) => {
  const { run } = czzAsync()
  const res = await run(swapTokenValue(fromCurrency, toCurrency, isInsurance))
  console.log('GetTokenValue result==', res);
  return res
}
