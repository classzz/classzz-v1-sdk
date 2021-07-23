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

export interface InsuranceNetwork {
    rpcURL: string;
    tokenAddress: string;
    securityPollAddress: string;
    provider: object;
}
export const insuranceNetwork: {
    [key: string]: InsuranceNetwork;
}

export declare const useApproveActions: (from: CurrencyProps, accounts: string) => Promise<{
    authorization: boolean;
    isApprove: boolean;
    approveLoading: boolean;
}>;
export declare const allowanceAction: (from: CurrencyProps, accounts: string) => Promise<boolean>;

export declare function useGetTokenValue(fromCurrency: CurrencyProps, toCurrency: CurrencyProps, accounts: string, isInsurance: boolean): {
    loading: boolean;
    routerFrom: string[];
    routerTo: string[];
    insuranceStatus: boolean;
    bestFromArr: string[];
    bestToArr: string[];
    isToCzz: boolean;
    resultState: ResultProps;
};

export declare function getAddress(tokenA: Token, tokenB: Token, factoryAddreaa: string, initCodeHash: string): string;
export declare const fetchPairData: (tokenA: Token, tokenB: Token, factoryAddress: string, initCodeHash: string, provider: provider) => Promise<void>;
export declare function useMidPrice(fromCurrency: CurrencyProps, toCurrency: CurrencyProps, swapFee: string, bestFromArr: string[], bestToArr: string[]): {
    loading: boolean;
    impactPrice: number;
    resultState: ResultProps;
};
interface SwapSettingProps {
    tolerance: number;
    deadline: number;
};
export declare function useSwapAndBurn(): {
    loading: boolean;
    receipt: any;
    hash: any;
    fetchSwap: (fromCurrency: CurrencyProps, toCurrency: CurrencyProps, currentProvider: provider, accounts: string, swapSetting: SwapSettingProps, changeAmount: string, bestFromArr: string[], isInsurance: boolean) => void;
    setHash: import("react").Dispatch<import("react").SetStateAction<any>>;
};