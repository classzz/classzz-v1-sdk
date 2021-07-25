import React, { useState, useEffect } from 'react'
import { useWallet } from '../hooks/useWallet'
import { useWalletConnect } from '../hooks/useWalletConnect'
import { useApproveActions, allowanceAction, useGetTokenValue, useMidPrice, useSwapAndBurn } from 'classzz-v1-sdk'

import metamaskSvg from '../asset/metamask-fox.svg'
import walletSvg from '../asset/walletConnectIcon.svg'


export const SwapConnect = () => {

    const { connectWallet, currentProvider, disConnect } = useWallet()
    const { walletconnectAction } = useWalletConnect()
    const [accounts, setAccounts] = useState()

    const { approveLoading, authorization, approveResult, pending, approveAction } = useApproveActions()
    const { loading, resultState, insuranceStatus, isToCzz, routerFrom, routerTo, bestFromArr, bestToArr, swapTokenValue } = useGetTokenValue()
    const { loading: midpriceStatus, impactPrice, resultState: midResult, fetchPrice } = useMidPrice()
    const { loading: swapling, receipt, hash, fetchSwap, setHash } = useSwapAndBurn()

    const [isCanSwap, setIsCanSwap] = useState(false)
    const [canFetchPrice, SetCanFetchPrice] = useState(false)
    const [isAllowance, setIsAllowance] = useState(false)

    const swapSetting = { tolerance: 0.03, deadline: 5 }

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


    const connectMetaMask = async () => {
        const newAccounts = await connectWallet()
        if (newAccounts) setAccounts(newAccounts[0])
    }




    useEffect(() => {
        if (bestFromArr.length > 0 && bestToArr.length > 0 && resultState.swapFee > 0) {
            SetCanFetchPrice(true)
        }
    }, [bestFromArr, bestToArr, resultState.swapFee])

    const swap = async () => {
        if (accounts && bestFromArr.length > 0) {
            const allow = await allowanceAction(from, currentProvider, accounts)

            if (allow) {
                fetchSwap(from, to, currentProvider, accounts, swapSetting, resultState.changeAmount, bestFromArr, false)
            } else {
                approve()
            }
            console.log('fetchSwap', receipt);
        }
    }

    useEffect(() => {
        if (isAllowance && resultState.changeAmount > 0 && resultState.swapFee > 0 && resultState.miniReceived > 0 && impactPrice > 0) {
            setIsCanSwap(true)
        }
    }, [isAllowance, resultState, bestFromArr, midResult, impactPrice, accounts])

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

    const swapTokenValueContent = (
        < button onClick={(e) => {
            swapTokenValue(from, to, true)
            e.target.disabled = true

        }}> 1、 useGetTokenValue</button >
    )
    const fetchPriceContent = (
        < button onClick={(e) => {
            fetchPrice(from, to, bestFromArr, bestToArr, resultState.swapFee)
            e.target.disabled = true
        }}> 2、useMidPrice</button >
    )

    const allowance = async () => {
        const allow = await allowanceAction(from, currentProvider, accounts)
        setIsAllowance(allow)
        console.log('allowance', allow);
    }

    const allowanceCheck = (
        <button onClick={(e) => {
            allowance()
            console.log(e);
        }
        }>3、allowance test</button>
    )

    const approve = async () => {
        const res = await approveAction(from, currentProvider, accounts)
        if (res) {
            console.log(approveResult);
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
            e.target.disabled = true
        }}>5、swap</button>
    )

    useEffect(() => {
        console.log('receipt', receipt);
        console.log('hash', hash);
    }, [receipt, hash])

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
                {isAllowance ? '' : approveCheck}

                <hr />
                {isAllowance && isCanSwap ? swapCheck : ''}

            </div>
        </div>
    )
}



