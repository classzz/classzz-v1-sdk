import React from "react";
import { useGetTokenValue } from 'classzz-v1-sdk'

export const GetTokenValue = () => {
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

    const { loading, resultState, insuranceStatus, isToCzz, routerFrom, routerTo, bestFromArr, bestToArr } = useGetTokenValue(from, to, "", true)

    return (
        <div>
            BestRoute
            <p>总状态：{resultState.resStatus.map((i) => { return i + "->" })}</p>
            <p>FROM优化后路径：{bestFromArr.map((i) => { return i + "->" })}</p>
            <p>TO优化后路径：{bestToArr.map((i) => { return i + "->" })}</p>
            <p>FROM优化后路径：{routerFrom.map((i) => { return i + "->" })}</p>
            <p>FROM优化后路径：{routerTo.map((i) => { return i + "->" })}</p>
            <p>状态：{loading}</p>
            <p>输入值：{resultState.fromTokenValue}</p>
            <p>输出值：{resultState.miniReceived}</p>
            <p>fee:{resultState.swapFee}</p>

        </div>
    )

}