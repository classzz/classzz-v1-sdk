import React from "react";
import { useGetTokenValue, useMidPrice } from 'classzz-v1-sdk'

export const CheckSwap = () => {
    const from = {
        "tokenAddress": "0xa71edc38d189767582c38a3145b5873052c3e47a",
        "name": "Heco-Peg USDT",
        "symbol": "USDT",
        "decimals": 18,
        "systemType": "HECO",
        "image": "https://mdex.com/token-icons/heco/0xa71edc38d189767582c38a3145b5873052c3e47a.png",
        "route": 0,
        "tokenValue": "1"
    }

    const to = {
        "tokenAddress": "0x2bcF9c1861FaE2d5a7D2b3242b71e2a8d461F61e",
        "name": "Golff.finance",
        "symbol": "GOF",
        "decimals": 18,
        "systemType": "BSC",
        "image": "https://docs.classzz.com/images/0x2bcF9c1861FaE2d5a7D2b3242b71e2a8d461F61e.png",
        "route": 0,
        "tokenValue": "0"
    }
    const { loading, resultState, insuranceStatus, isToCzz, routerFrom, routerTo, bestFromArr, bestToArr, swapTokenValue } = useGetTokenValue()
    const { loading: midpriceStatus, impactPrice, resultState: midResult, fetchPrice } = useMidPrice()

    const [canFetchPrice, SetCanFetchPrice] = useState(false)

    const swapTokenValueContent = (
        < button onClick={() => swapTokenValue(from, to, true)}> useGetTokenValue</button >
    )
    const fetchPriceContent = (
        < button onClick={() =>
            fetchPrice(from, to, bestFromArr, bestToArr, resultState.swapFee)}> useMidPrice</button >
    )
    useEffect(() => {
        if (bestFromArr.length > 0 && bestToArr.length > 0 && resultState.swapFee > 0) {
            SetCanFetchPrice(true)
        }
    }, [bestFromArr, bestToArr, resultState.swapFee])
    return (
        <div>
            BestRoute

            <p>{swapTokenValueContent}</p>
            <p>{canFetchPrice ? fetchPriceContent : ''}</p>
            <p>useGetTokenValue总状态：{resultState.resStatus.map((i) => { return i + "->" })}</p>
            <p>FROM优化后路径：{bestFromArr.map((i) => { return i + "->" })}</p>
            <p>TO优化后路径：{bestToArr.map((i) => { return i + "->" })}</p>
            <p>FROM优化后路径：{routerFrom.map((i) => { return i + "->" })}</p>
            <p>TO 优化后路径：{routerTo.map((i) => { return i + "->" })}</p>
            <p>状态：{loading ? 'true' : 'false'}</p>
            <p>输入值：{resultState.fromTokenValue}</p>
            <p>输出值：{resultState.miniReceived}</p>
            <p>fee:{resultState.swapFee}</p>
            <hr></hr>
            <p>useMidPrice总状态：{midResult.resStatus.map((i) => { return i + "->" })}</p>
            <p>midpriceStatus: {midpriceStatus ? 'true' : 'false'}</p>
            <p>impactPrice: {impactPrice}</p>
            <p>czzRes: {midResult.czzRes}</p>
            <p>ethRes: {midResult.ethRes}</p>
            <p>price: {midResult.price}</p>
            <p>midPrice: {midResult.midPrice}</p>
            <p>midProce2: {midResult.midProce2}</p>
            <p>priceStatus: {midResult.priceStatus}</p>
            <p>priceEffect: {midResult.priceEffect}</p>

        </div>
    )
}