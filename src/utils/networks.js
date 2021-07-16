import Web3 from 'web3'
import { ABI_ETH, ABI_HECO, ABI_BSC } from '../abi'

const networks = [
  {
    networkName: 'HECO',
    networkType:'HECO',
    symbolName: 'HT',
    tokenValue: '',
    insuranceCoin:'HCZZ',
    abi:ABI_HECO,
    networkId:"128",
    chainId: '0x80',
    ntype:2,
    decimals:18,
    symbol: null,
    currency: null,
    route:0,
    swap:[
      {
        name:"DogeSwap",
        image:"https://graph.dogeswap.com/static/images/tokens/0x099626783842d35c221e5d01694c2b928eb3b0ad.png",
        swaprouter:"0x539A9Fbb81D1D2DC805c698B55C8DF81cbA6b350",
        factoryAddress:"0x0419082bb45f47Fe5c530Ea489e16478819910F3",
        currentToken:"0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
        initCodeHash:"0x06d32be9fe9b1c75a1ce7e2b362c735bcb731596b9330b99412fde52d753e3f0",
      },
      {
        name:"mdex",
        image:"https://mdex.com/token-icons/heco/0x25d2e80cb6b86881fd7e07dd263fb79f4abe033c.png",
        swaprouter:"0xED7d5F38C79115ca12fe6C0041abb22F0A06C300",
        factoryAddress:"0xb0b670fc1F7724119963018DB0BfA86aDb22d941",
        currentToken:"0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
        initCodeHash:"0x2ad889f82040abccb2649ea6a874796c1601fb67f91a747a80e08860c73ddf24",
      }
    ],
    router: "0x93E00a89F5CBF9c66a50aF7206c9c6f54601EC15",
    weth: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
    currentToken: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f',
    czz:'0x112489c758D405874e9Ece0586FD50B315216fcA',
    explorerUrl:'https://hecoinfo.com/',
    rpcUrls:'https://http-mainnet-node.huobichain.com',
    provider: new Web3.providers.HttpProvider("https://http-mainnet-node.huobichain.com"),
    image:'https://cryptologos.cc/logos/huobi-token-ht-logo.svg'
  },
  {
    networkName:'ETH',
    networkType:'ETH',
    symbolName: 'ETH',
    tokenValue: '',
    insuranceCoin:'ECZZ',
    abi:ABI_ETH,
    symbol: null,
    networkId: "1",
    chainId: '0x1',
    ntype:1,
    decimals:18,
    currency: null,
    route:0,
    swap:[{
      name: "uniswap",
      image:'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
      swaprouter:"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      factoryAddress:"0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      currentToken:"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      initCodeHash:"0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f",  // 13281001066
    },{
      name: "sushi",
      image:'https://sushi.com/static/media/logo.dec926df.png',
      swaprouter:"0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
      factoryAddress:"0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac",
      currentToken:"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      initCodeHash:"0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303",
    }],
    router: "0xF0f50ce5054289a178fb45Ab2E373899580d12bf",
    weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    currentToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    czz: '0x150BbCfF6b1B4D528b48f1A300585Dea0b6490B6',
    explorerUrl: 'https://eth-mainnet.token.im/',
    rpcUrls:'https://nodes.mewapi.io/rpc/eth',
    provider: new Web3.providers.HttpProvider("https://eth-mainnet.token.im"),
    image:'https://cryptologos.cc/logos/ethereum-eth-logo.svg'
  },
  {
    networkName: 'BSC',
    networkType:'BSC',
    symbolName: 'BNB',
    tokenValue: '',
    insuranceCoin:'BCZZ',
    abi:ABI_BSC,
    networkId:"56",
    chainId:'0x38',
    ntype: 3,
    decimals:18,
    symbol: null,
    currency: null,
    route:0,
    swap:[
      // {
      //   name:"Bakery",
      //   image:"https://www.bakeryswap.org/static/media/logo.765c4d87.svg",
      //   factoryAddress:"0x01bf7c66c6bd861915cdaae475042d3c4bae16a7",
      //   swaprouter:"0xcde540d7eafe93ac5fe6233bee57e1270d3e330f",
      //   currentToken:"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
      //   initCodeHash:"0xe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3"
      // },
      {
        name:"Pancakeswap",
        image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png",
        swaprouter:"0x10ed43c718714eb63d5aa57b78b54704e256024e",
        factoryAddress:"0xca143ce32fe78f1f7019d7d551a6402fc5350c73",
        currentToken:"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
        initCodeHash:"0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5",
      }
    ],
    router: "0xdf10e0Caa2BBe67f7a1E91A3e6660cC1e34e81B9",
    weth: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    currentToken: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    czz:'0x2Fb9376cFf6fb7f5fe99665aE1Ec2FdDD5099134',
    explorerUrl:'https://bscscan.com/',
    rpcUrls:'https://bsc-dataseed1.ninicoin.io',
    provider: new Web3.providers.HttpProvider("https://bsc-dataseed1.ninicoin.io"),
    image:'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg'
  }
]
export default networks
