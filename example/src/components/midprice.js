import React from "react";
import { useMidPrice } from 'classzz-v1-sdk'

export const MidPrice = () => {
    const to = {
        "tokenAddress": "0x488E0369f9BC5C40C002eA7c1fe4fd01A198801c",
        "name": "Golff.finance",
        "symbol": "GOF",
        "decimals": 18,
        "systemType": "ETH",
        "image": "https://hecoinfo.com/token/images/gof_32.png",
        "route": 0,
        "tokenValue": "114"
    }
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

    const bestFromArr = ['0xa71edc38d189767582c38a3145b5873052c3e47a', '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f', '0x112489c758D405874e9Ece0586FD50B315216fcA']
    const bestToArr = ['0x150BbCfF6b1B4D528b48f1A300585Dea0b6490B6', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x488E0369f9BC5C40C002eA7c1fe4fd01A198801c']

    const { loading: midpriceStatus, impactPrice,resultState:midResult } = useMidPrice(from, to, bestFromArr, bestToArr, 118)
    return (
        <div>
            <p>总状态：{midResult.resStatus.map((i) => { return i + "->" })}</p>
            <p>midpriceStatus: {midpriceStatus}</p>
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