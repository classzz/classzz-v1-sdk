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

export declare const useApproveActions: () => {
    authorization: boolean;
    isApprove: boolean;
    approveLoading: boolean;
    approveAction: (fromCurrency: CurrencyProps, currentProvider: provider, accounts: string) => Promise<void>;
};
export declare const allowanceAction: (fromCurrency: CurrencyProps, currentProvider: provider, accounts: string) => Promise<boolean>;
export declare function useGetTokenValue(): {
    loading: boolean;
    resultState: ResultProps;
    routerFrom: string[];
    routerTo: string[];
    insuranceStatus: boolean;
    bestFromArr: string[];
    bestToArr: string[];
    isToCzz: boolean;
    swapTokenValue: (fromCurrency: CurrencyProps, toCurrency: CurrencyProps, isInsurance: boolean) => Promise<false | undefined>;
};

export declare function getAddress(tokenA: Token, tokenB: Token, factoryAddreaa: string, initCodeHash: string): string;
export declare const fetchPairData: (tokenA: Token, tokenB: Token, factoryAddress: string, initCodeHash: string, provider: provider) => Promise<void>;
export declare function useMidPrice(): {
    loading: boolean;
    impactPrice: number;
    resultState: ResultProps;
    fetchPrice: (fromCurrency: CurrencyProps, toCurrency: CurrencyProps, bestFromArr: string[], bestToArr: string[], swapFee: string) => Promise<void>;
};
interface SwapSettingProps {
    tolerance: number;
    deadline: number;
}

export declare function useSwapAndBurn(): {
    loading: boolean;
    receipt: undefined;
    hash: undefined;
    fetchSwap: (fromCurrency: CurrencyProps, toCurrency: CurrencyProps, currentProvider: provider, accounts: string, swapSetting: SwapSettingProps, changeAmount: string, bestFromArr: string[], isInsurance: boolean) => void;
    setHash: import("react").Dispatch<import("react").SetStateAction<undefined>>;
};