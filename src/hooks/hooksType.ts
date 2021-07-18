export interface CurrencyProps {
    symbol: string;
    decimals: number;
    name: string;
    tokenAddress: string;
    systemType: string;
    image: string;
    balance: number;
    route: 0 | 1;
    tokenValue: string;
}

export interface ResultProps {
    priceStatus: number;
    swapFee: number;
    fromTokenValue: string;
    miniReceived: number;
    resStatus: string[];
}