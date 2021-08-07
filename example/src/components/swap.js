import React, { useState, useEffect } from 'react'
import { useWallet } from '../hooks/useWallet'
import { useWalletConnect } from '../hooks/useWalletConnect'
import { approveActions, allowanceAction, getTokenValue, getMidPrice, swapAndBurn } from 'classzz-v1-sdk'
import metamaskSvg from '../asset/metamask-fox.svg'
import walletSvg from '../asset/walletConnectIcon.svg'

export const Connect = () => {
    const { connectWallet, currentProvider, disConnect } = useWallet()
    const { walletconnectAction } = useWalletConnect()
    const [accounts, setAccounts] = useState()

    const [isCanSwap, setIsCanSwap] = useState(false)
    const [canFetchPrice, SetCanFetchPrice] = useState(false)
    const [isAllowance, setIsAllowance] = useState(false)
    const [isNeedApprove, setIsNeedApprove] = useState(false)

    const [resGetTokenValue, SetResGetTokenValue] = useState({
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
    })

    const [resGetMidPrice, SetResGetMidPrice] = useState({
        impactPrice: 0.0,
        ethRes: 0.0,
        czzRes: 0.0,
        midPrice: 0.0,
        midProce2: 0.0,
        priceStatus: 0,
        priceEffect: '',
        price: '',
        resStatus: []
    })

    const [resSwap, setResSwap] = useState({
        receipt: null,
        hash: null
    })


    const swapSetting = { tolerance: 0.03, deadline: 5 }

    const from = {
        "tokenAddress": "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
        "name": "HECO",
        "symbol": "HT",
        "decimals": 18,
        "systemType": "HECO",
        "image": "https://docs.classzz.com/svg/HECO.svg",
        "route": 0,
        "tokenValue": "0.11"
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


    const connectMetaMask = async () => {
        const newAccounts = await connectWallet()
        if (newAccounts) setAccounts(newAccounts[0])
    }

    const swap = async () => {
        if (accounts && resGetTokenValue.bestFromArr.length > 0) {

            if (isAllowance) {
                const res = await swapAndBurn(from, to, currentProvider, accounts, swapSetting, resGetTokenValue, resGetMidPrice, false)
                if (res.data) {
                    setResSwap(res.data)
                }
            } else {
                approve()
            }
            console.log('fetchSwap', resSwap);
        }
    }

    useEffect(() => {
        if (resGetTokenValue.changeAmount > 0 && resGetTokenValue.swapFee > 0 && resGetTokenValue.miniReceived > 0 && resGetMidPrice.impactPrice > 0) {
            setIsCanSwap(true)
        }
    }, [isAllowance, resGetTokenValue, resGetMidPrice, accounts])

    useEffect(() => {
        if (resGetTokenValue.bestFromArr.length > 0 && resGetTokenValue.bestToArr.length > 0 && resGetTokenValue.swapFee > 0) {
            SetCanFetchPrice(true)
        }
    }, [resGetTokenValue])


    useEffect(() => {
        console.log('receipt', resSwap?.receipt);
        console.log('hash', resSwap?.hash);
    }, [resSwap])

    const swapTokenValue = async (e) => {
        const res = await getTokenValue(from, to, true)
        if (res.data) {
            SetResGetTokenValue(res.data)
        }
    }

    const fetchPrice = async (e) => {
        const res = await getMidPrice(from, to, resGetTokenValue)
        if (res.data) {
            SetResGetMidPrice(res.data)
        }
    }

    const swapTokenValueContent = (
        <div>
            < button onClick={(e) => {
                swapTokenValue(e)
                e.target.disabled = true
            }}> 1、 useGetTokenValue</button >
            <p>useGetTokenValue总状态：{resGetTokenValue?.resStatus.map((i) => { return i + "->" })}</p>
            <p>FROM优化后路径：{resGetTokenValue?.bestFromArr.map((i) => { return i + "->" })}</p>
            <p>TO优化后路径：{resGetTokenValue?.bestToArr.map((i) => { return i + "->" })}</p>
            <p>FROM优化后路径：{resGetTokenValue?.routerFrom.map((i) => { return i + "->" })}</p>
            <p>TO 优化后路径：{resGetTokenValue?.routerTo.map((i) => { return i + "->" })}</p>
            <p>输入值：{resGetTokenValue?.fromTokenValue}</p>
            <p>输出值：{resGetTokenValue?.miniReceived}</p>
            <p>changeAmount：{resGetTokenValue?.changeAmount.toString()}</p>
            <p>insuranceStatus：{resGetTokenValue?.insuranceStatus ? 'true' : 'false'}</p>
            <p>isToCzz：{resGetTokenValue?.isToCzz ? 'true' : 'false'}</p>
            <p>fee:{resGetTokenValue?.swapFee}</p>
        </div>
    )
    const fetchPriceContent = (
        <div>
            < button onClick={(e) => {
                fetchPrice(e)
                e.target.disabled = true
            }}> 2、useMidPrice</button >

            <p>useMidPrice总状态：{resGetMidPrice?.resStatus.map((i) => { return i + "->" })}</p>
            <p>impactPrice: {resGetMidPrice?.impactPrice}</p>
            <p>czzRes: {resGetMidPrice?.czzRes}</p>
            <p>ethRes: {resGetMidPrice?.ethRes}</p>
            <p>price: {resGetMidPrice?.price}</p>
            <p>midPrice: {resGetMidPrice?.midPrice}</p>
            <p>midProce2: {resGetMidPrice?.midProce2}</p>
            <p>priceStatus: {resGetMidPrice?.priceStatus}</p>
            <p>priceEffect: {resGetMidPrice?.priceEffect}</p>

        </div>
    )

    const allowance = async () => {
        const res = await allowanceAction(from, currentProvider, accounts)
        setIsAllowance(res.data.authorization)
        if (!res.data.authorization) {
            setIsNeedApprove(true)
        }
        console.log('allowance', res);
    }

    const allowanceCheck = (
        <button onClick={(e) => {
            allowance()
            e.target.disabled = true
        }
        }>3、allowance</button>
    )

    const approve = async () => {
        const res = await approveActions(from, currentProvider, accounts)
        if (res) {
            if (res.data.authorization) {
                setIsAllowance(true)
            }
            console.log(res);

        }
    }

    const approveCheck = (
        <button onClick={(e) => {
            approve()
            e.target.disabled = true
        }}>4、 approve</button>
    )

    const swapCheck = (
        <button onClick={(e) => {
            swap()
            // e.target.disabled = true
        }}>5、swap</button>
    )

    const walletList = [
        {
            icon: metamaskSvg,
            name: 'metaMask',
            actions: connectMetaMask,
            text: "metamask"
        },
        {
            icon: walletSvg,
            name: 'walletConnect',
            actions: walletconnectAction,
            text: "wallet"
        }
    ]

    const walletContent = (
        <div>{
            walletList.map((item, index) => {
                return (
                    <div key={index} style={{ width: 200, heigth: 200, display: 'inline' }}>
                        <img src={item.icon} alt={item.name} style={{ width: 100, height: 100 }} />

                        <button onClick={() => item.actions()}>{item.text}</button>
                    </div>
                )
            })
        }</div>)

    const accountsContent = (
        <div>
            <div className="f-c-sb">
                <h4>Connected </h4>
                <div className="f-c">
                    <button className="button-min" onClick={() => disConnect().then(() => { setAccounts('') })}>Disconnect</button>
                </div>
            </div>
            <div className="f-c-sb">
                <div>
                    <h3>{accounts}</h3>
                </div>
            </div>
        </div>
    )


    return (
        <div>
            <div>
                {walletContent}

                {accountsContent}
                <hr />
                <p>{swapTokenValueContent}</p>

                <p>{canFetchPrice ? fetchPriceContent : ''}</p>
                <hr />
                {allowanceCheck}
                <hr />

                {isNeedApprove ? approveCheck : ''}

                <hr />
                {isAllowance && isCanSwap ? swapCheck : ''}

            </div>
        </div>
    )
}


