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
export interface CzzState<D> {
    error: Error | null;
    data: D | null;
    stat: "idle" | "loading" | "error" | "success";
}
export interface CzzResult<D> {
    isIdle: boolean;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: Error | null;
    data: D | null;
    stat: "idle" | "loading" | "error" | "success";
}
export interface ResultGetTokenValue {
    isToCzz: boolean;
    routerFrom: string[];
    routerTo: string[];
    insuranceStatus: boolean;
    bestFromArr: string[];
    bestToArr: string[];
    priceStatus: number;
    swapFee: number;
    fromTokenValue: string;
    changeAmount: number;
    miniReceived: number;
    resStatus: string[];
}
export interface ResultGetMidPrice {
    impactPrice: number;
    ethRes: number;
    czzRes: number;
    midPrice: number;
    midProce2: number;
    priceStatus: number;
    priceEffect: string;
    price: string;
    resStatus: string[];
}
export interface ResultSwapAndBurn<T> {
    receipt: T | null;
    hash: T | null;
}
interface InsuranceNetwork {
    rpcURL: string;
    tokenAddress: string;
    securityPollAddress: string;
    provider: provider;
}
interface SwapSettingProps {
    tolerance: number;
    deadline: number;
}
declare const insuranceNetwork: { [key: string]: InsuranceNetwork; };
export declare const czzAsync: <D>() => { run: (promise: Promise<D>) => Promise<CzzResult<D>>; };
export declare const approveActions: (fromCurrency: CurrencyProps, currentProvider: provider, accounts: string) => Promise<CzzResult<unknown>>;
export declare const allowanceAction: (fromCurrency: CurrencyProps, currentProvider: provider, accounts: string) => Promise<CzzResult<unknown>>;
export declare const getTokenValue: (fromCurrency: CurrencyProps, toCurrency: CurrencyProps, isInsurance: boolean) => Promise<CzzResult<ResultGetTokenValue | unknown>>;

export declare function getAddress(tokenA: Token, tokenB: Token, factoryAddreaa: string, initCodeHash: string): string;
export declare const fetchPairData: (tokenA: Token, tokenB: Token, factoryAddress: string, initCodeHash: string, provider: provider) => Promise<void>;
export declare const getMidPrice: (fromCurrency: CurrencyProps, toCurrency: CurrencyProps, resGetTokenTokenValue: ResultGetTokenValue) => Promise<CzzResult<ResultGetMidPrice | unknown>>;

export declare const swapAndBurn: <T>(fromCurrency: CurrencyProps, toCurrency: CurrencyProps, currentProvider: provider, accounts: string, swapSetting: SwapSettingProps, resGetTokenTokenValue: ResultGetTokenValue, resresGetMidPrice: ResultGetMidPrice, isInsurance: boolean) => Promise<CzzResult<ResultSwapAndBurn<T> | unknown>>;