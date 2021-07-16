import Web3 from 'web3'

const insuranceNetwork ={
  ETH: {
    rpcURL: 'https://eth-mainnet.token.im',
    tokenAddress: '0x150BbCfF6b1B4D528b48f1A300585Dea0b6490B6',
    securityPollAddress: '0xBFc45060B171849Db8e63d547c60D906A3E2eb37',
    provider: new Web3.providers.HttpProvider("https://eth-mainnet.token.im"),

  },
  BSC: {
    rpcURL: 'https://bsc-dataseed1.ninicoin.io',
    tokenAddress: '0x2Fb9376cFf6fb7f5fe99665aE1Ec2FdDD5099134',
    securityPollAddress: '0x0929e604c4Cdd5361D2037D5b70c44477C0ca3F2',
    provider: new Web3.providers.HttpProvider("https://bsc-dataseed1.ninicoin.io"),
  },
  HECO: {
    rpcURL: 'https://http-mainnet-node.huobichain.com',
    tokenAddress: '0x112489c758D405874e9Ece0586FD50B315216fcA',
    securityPollAddress: '0xABe6ED40D861ee39Aa8B21a6f8A554fECb0D32a5',
    provider: new Web3.providers.HttpProvider("https://http-mainnet-node.huobichain.com"),
  },
}
export default insuranceNetwork
