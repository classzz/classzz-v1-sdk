import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import Web3 from 'web3'

export function useWallet(from) {
  const [loading, setLoading] = useState(false)
  const [accounts, setAccounts] = useState()
  const [currentProvider, setCurrentProvider] = useState()

  const onboarding = useRef()
  var storage = window.localStorage

  const initWalletInfo = async () => {
    let web3Provider
    if (window.ethereum) {
      web3Provider = window.ethereum
    } else if (window.web3) {
      web3Provider = window.web3.currentProvider
      console.log("MetaMask Legacy dapp browsers")
    }
    try {
      let provider = new Web3()
      provider.setProvider(web3Provider)
      setCurrentProvider(provider)
    } catch (err) {
      console.log('error', err)
    }
  }

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  const handleNewAccounts = newAccounts => {
    setAccounts(newAccounts[0])
    storage.setItem('address', newAccounts[0])
    initWalletInfo()
  }

  // const checktCurrentNetwork = id => {
  //   let currentChainId = window?.ethereum?.switchIdentity?.chainId || id || window?.ethereum?.chainId
  //   currentChainId = detectMobile() ? Web3.utils.numberToHex(currentChainId) : currentChainId
  //   return currentChainId === from?.chainId
  // }

  // chainId changed
  const handlenNewChainId = id => {
    let currentChainId = window?.ethereum?.currentIdentity?.chainId || id || window?.ethereum?.chainId
    currentChainId = detectMobile() ? Web3.utils.numberToHex(currentChainId) : currentChainId
    // const isSupportNetwork = networks.some(i => i.chainId === currentChainId)
    // console.log('handlenNewChainId', isSupportNetwork, currentChainId)
    // setState({
    //   wallet: {
    //     ...wallet,
    //     chainId: currentChainId
    //   },
    // isCurrentNetwork:currentChainId === from?.chainId,
    //   currentChainId,
    //   isSupportNetwork
    // })
  }

  // initialize wallet
  const initWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled() && storage.getItem('address')) {
      const newAccount = await window.ethereum.request({ method: 'eth_requestAccounts' })
      // window?.ethereum.request({ method: 'eth_requestAccounts' })
      initWalletInfo()
      handleNewAccounts(newAccount)
      handlenNewChainId()
      // listener chain Change
      window.ethereum.on('chainChanged', chainId => {
        initWalletInfo()
        handlenNewChainId(chainId)
      })
      window.ethereum.on('accountsChanged', handleNewAccounts)
      window.ethereum.on('connect', id => {
        console.log('connect', id)
      })
      window.ethereum.on('disconnect', () => {
        console.log('wallet disconnect')
      })
      window.ethereum.on('message', message => {
        console.log('wallet message', message)
      })
      window.ethereum.on('notification', message => {
        console.log('wallet notification', message)
      })
      return () => {
        window.ethereum.off('accountsChanged', handleNewAccounts)
      }
    }
  }

  // network chainchange
  const disConnect = async () => {
    if (window.ethereum.on) {
      await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [
          {
            eth_accounts: {}
          }
        ]
      })
      storage.removeItem('address')
      const state = {
        accounts: null,
        wallet: {},
      }
      // setState(state)
      return state
    }
  }

  // connect wallet
  const connectWallet = async () => {
    try {
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        setLoading(true)
        const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        handleNewAccounts(newAccounts)
        setLoading(false)
        initWalletInfo()
        handlenNewChainId()
        return newAccounts
      } else {
        onboarding.current.startOnboarding()
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  // switch networks
  const [switchLoading, setSwitchLoading] = useState(false)
  const [networkNode, setNetworkNode] = useState({})

  // get current network node
  const getNetworkNode = () => {
    const { chainId, rpcUrls, networkName: chainName, decimals, explorerUrl, symbolName } = from
    const nativeCurrency = { name: symbolName, decimals, symbol: symbolName }
    return {
      chainId,
      rpcUrls: [rpcUrls],
      chainName,
      nativeCurrency,
      blockExplorerUrls: [explorerUrl],
    }
  }

  useEffect(() => {
    if (from?.currency) setNetworkNode(getNetworkNode())
  }, [from?.currency])

  // wallet new network
  const switchChainNormal = async (pool = from) => {
    const item = getNetworkNode()
    const params = [item]
    const chinIdSwitch = [
      {
        chainId: pool.chainId
      }
    ]
    // debugger
    if (window.ethereum) {
      try {
        setSwitchLoading(true)
        const res = pool.chainId === '0x1' || pool.chainId === '0x3' || pool.chainId === '0x4'
          ? await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: chinIdSwitch })
          : await window.ethereum.request({ method: 'wallet_addEthereumChain', params })
        // setButtonText('SWAP')
        const { currency } = pool
        watchAsset(currency)
        return res
      } catch (error) {
        // setButtonText('ERROR_NETWORK')
        throw error
      } finally {
        setSwitchLoading(false)
      }
    }
  }

  // bitkeep switch network
  const switchNetworkForBitkeep = chainId => {
    // const item = networks.filter(i => i.chainId === chainId)[0]
    // const chainName = item?.symbolName.toLowerCase()
    // chainName && window?.ethereum?.switchIdentity(chainName)
    // setState({
    //   isCurrentNetwork: true
    // })
  }


  // switch network
  const addEthereum = () => {
    // alert('change'+ from?.chainId)
    window?.isBitKeep ? switchNetworkForBitkeep(from?.chainId) : switchChainNormal(from)
  }

  // watch walletAsset token
  const watchAsset = async (pool = {}) => {
    const { symbol, tokenAddress: address, decimals, image } = pool
    if (symbol && address) {
      // debugger
      const options = {
        address,
        symbol,
        decimals,
        image
      }
      try {
        const success = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options
          },
          id: Math.round(Math.random() * 100000),
        })
        if (success) {
          console.log(`${symbol} successfully added to wallet!`)
        }
      } catch (error) {
        throw error
      }
    }
  }

  const detectMobile = () => {
    /* eslint-disable */
    var check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  // accounts change 
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts?.length > 0) {
        // setWalletButtonText(formatAddress(accounts))
        onboarding.current?.stopOnboarding()
      } else {
        // setWalletButtonText(CONNECT_TEXT)
      }
    }
  }, [accounts])

  // init wallet effect
  useLayoutEffect(() => {
    initWallet()
  }, [])

  // useEffect(() => {
  //   if (isSupportNetwork && currentChainId) {
  //     // setState({
  //     //   isCurrentNetwork: checktCurrentNetwork(currentChainId)
  //     // })
  //   }
  // }, [currentChainId, from?.chainId, isSupportNetwork])

  return { accounts, currentProvider, connectWallet, loading, addEthereum, switchLoading, disConnect, networkNode }
}
