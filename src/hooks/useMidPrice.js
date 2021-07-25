import { useEffect, useState, useCallback, useRef } from 'react'
import { Token, Route, TokenAmount, Pair } from '@uniswap/sdk'
import { getCreate2Address } from '@ethersproject/address'
import { pack, keccak256 } from '@ethersproject/solidity'
import IUniswapV2Pair from '../abi/IUniswapV2Pair.json'
import networks from '../utils/networks'
import Web3 from "web3"

/**
 * @description: generate  pair address by tokenA and tokenB
 * @param { Token } tokenA              
 * @param { Token } tokenB
 * @param { string } factoryAddreaa
 * @param { string } initCodeHash
 * @return { string }  
 */
export function getAddress(tokenA, tokenB, factoryAddreaa, initCodeHash) {
  let PAIR_ADDRESS_CACHE = {}
  const tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks
  if (PAIR_ADDRESS_CACHE?.[tokens[0].address]?.[tokens[1].address] === undefined) {
    PAIR_ADDRESS_CACHE = {
      ...PAIR_ADDRESS_CACHE,
      [tokens[0].address]: {
        ...PAIR_ADDRESS_CACHE?.[tokens[0].address],
        [tokens[1].address]: getCreate2Address(
          factoryAddreaa,
          keccak256(['bytes'], [pack(['address', 'address'], [tokens[0].address, tokens[1].address])]),
          initCodeHash
        )
      }
    }
  }
  return PAIR_ADDRESS_CACHE[tokens[0].address][tokens[1].address]
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
export const fetchPairData = async (tokenA, tokenB, factoryAddress, initCodeHash, provider) => {
  const address = getAddress(tokenA, tokenB, factoryAddress, initCodeHash)
  const infoContract = new Web3(provider)
  const lpContract = new infoContract.eth.Contract(
    IUniswapV2Pair,
    address
  )
  try {
    const result = await lpContract.methods.getReserves().call(null)
    const reserves0 = result[0]
    const reserves1 = result[1]
    const balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0]
    return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]))
  } catch (error) {
    console.log(error)
  }
}

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
export function useMidPrice() {
  const [loading, setLoading] = useState(false)
  const [impactPrice, setImpactPrice] = useState(0)

  const [resultState, setResultState] = useState({
    ethRes: 0.0,
    czzRes: 0.0,
    midPrice: 0.0,
    midProce2: 0.0,
    priceStatus: 0,
    priceEffect: '',
    price: '',
    resStatus: []
  })
  /**
   * @description: 
   * @param { CurrencyProps } lp          : swap token info must be from or to token
   * @param { string[] } routerList       : the best path token address array
   * @return { number }                   : swap rate
   */
  const fetchPair = async (lp, routerList) => {
    const { networkId, currency, czz, provider, networkName, weth } = lp
    const { factoryAddress, currentToken, initCodeHash } = lp.swap[lp.route]
    let newWethToken = weth
    // debugger
    let isDirectSwap = false
    if (routerList && routerList.length === 2) {
      newWethToken = czz
      isDirectSwap = true
    }
    if (routerList && routerList.length === 3) {
      newWethToken = routerList[1]
      isDirectSwap = false
    }
    const From = new Token(Number(networkId), currency.tokenAddress ? currency.tokenAddress : currentToken, currency.tokenAddress ? currency.decimals : 18)
    const Eczz = new Token(Number(networkId), czz, 8)
    const WETH = new Token(Number(networkId), newWethToken, 18)
    try {
      let FromPair, route0, ToPair, route1
      if (isDirectSwap) {
        FromPair = await fetchPairData(Eczz, From, factoryAddress, initCodeHash, provider)
        route0 = new Route([FromPair], Eczz)

      } else {
        FromPair = await fetchPairData(WETH, From, factoryAddress, initCodeHash, provider)
        route0 = new Route([FromPair], WETH)
        ToPair = await fetchPairData(WETH, Eczz, factoryAddress, initCodeHash, provider)
        route1 = new Route([ToPair], WETH)

      }

      const from_weth = route0.midPrice.toSignificant(6)
      const eczz_weth = isDirectSwap ? 1 : route1.midPrice.toSignificant(6)
      return eczz_weth / from_weth
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * @description: main method 
   */
  const fetchPrice = useCallback(async (fromCurrency, toCurrency, bestFromArr, bestToArr, swapFee) => {
    const fromNetwork = networks.filter(i => i.networkType === fromCurrency?.systemType)
    const toNetwork = networks.filter(i => i.networkType === toCurrency?.systemType)
    const from = { ...fromNetwork[0], currency: fromCurrency, tokenValue: fromCurrency.tokenValue, route: fromCurrency.route }
    const to = { ...toNetwork[0], currency: toCurrency, tokenValue: toCurrency.tokenValue, route: toCurrency.route }
    let resultStage = []
    resultStage = ['initial']
    if (from.tokenValue && Number(swapFee) > 0) {
      try {
        setLoading(true)
        resultStage = [...resultStage, 'loading', 'FINDING_PRICE_ING']
        // debugger
        let ethRes = 1
        if (from.currency.tokenAddress !== from.czz) {
          resultStage = [...resultStage, 'ethRes']
          ethRes = await fetchPair(from, bestFromArr)
        }
        let czzRes = 1
        if (to.currency.tokenAddress !== to.czz) {
          resultStage = [...resultStage, 'czzRes']
          czzRes = await fetchPair(to, bestToArr)
        }
        const midPrice = ethRes / czzRes
        const midProce2 = Number(Number(Number(from.tokenValue) * midPrice).toFixed(to.currency.decimals))
        const price = Number(((midProce2 - Number(to.tokenValue) - Number(swapFee)) / midProce2) * 100).toFixed(2)
        resultStage = [...resultStage, 'end']
        setImpactPrice(price)
        const priceEffect = changePriceStatus(price)
        setResultState({ ...resultState, ethRes, czzRes, midPrice, midProce2, price, priceStatus: priceEffect.priceStatus, priceEffect: priceEffect.priceEffect, resStatus: [...resultStage] })
        setLoading(false)
        console.log('fetchPrice1', resultState);
      } catch (error) {
        setLoading(false)
        resultStage = [...resultStage, 'NONE_TRADE']
        setResultState({ ...resultState, resStatus: [...resultStage] })
        setImpactPrice(0)
        console.log('fetchPrice2', resultState);
        throw error
      } finally {
        setLoading(false)
      }
    }
  }, [])

  /**
   * @description: change price status 
   * @param { price : number } 
   * @return {  
   *       priceStatus: number,   3|2|1|0
   *       priceEffect: string,   'SWAP_IMPACT_HIGH'|'SWAP_IMPACT_WARN'|'SWAP_IMPACT_WARN'|'SWAP'
   * }
   */
  const changePriceStatus = val => {
    let price = Number(val)
    if (price > 15) {
      return { priceStatus: 3, priceEffect: 'SWAP_IMPACT_HIGH' }
    } else if (price > 5 && price < 15) {
      return { priceStatus: 2, priceEffect: 'SWAP_IMPACT_WARN' }
    } else if (price > 3 && price < 5) {
      return { priceStatus: 1, priceEffect: 'SWAP_IMPACT_WARN' }
    } else if (price < 3) {
      return { priceStatus: 0, priceEffect: 'SWAP' }
    }
  }

  // useEffect(() => {
  //   if (to.currency && to.tokenValue) {
  //     fetchPrice()
  //   }
  // }, [to.tokenValue])

  return { loading, impactPrice, resultState, fetchPrice }
}
