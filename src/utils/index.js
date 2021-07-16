import BigNumber from 'bignumber.js'

export const decToBn = (dec, decimals = 18) => {
  let num = new BigNumber(dec).decimalPlaces(decimals)
  return num.multipliedBy(new BigNumber(10).pow(decimals))
}