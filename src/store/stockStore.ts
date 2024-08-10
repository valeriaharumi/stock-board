import { create } from 'zustand'

type StockStore = {
    stocks: Record<string,
        {
            currentPrice: number;
            previousPrice: number;
            status: 'up' | 'down';
            timestamp: number;
        }>;
    updateStock: (code: string, newPrice: number, timestamp: number) => void;
    getSortedStocks: () => [string, 
        { 
            currentPrice: number; 
            previousPrice: number; 
            status: 'up' | 'down'; 
            timestamp: number 
        }
        ][];
};

export const useStockStore = create<StockStore>((set, get) => ({
    stocks: {},
    updateStock: (code, newPrice, timestamp) =>
        set((state) => {
            const currentStock = state.stocks[code];
            const previousPrice = currentStock?.currentPrice || 0;
            const status = newPrice > previousPrice ? 'up' : 'down';

            return {
                stocks: {
                    ...state.stocks,
                    [code]: { currentPrice: newPrice, previousPrice, status, timestamp },
                },
            };
        }),
    getSortedStocks: () => {
        const stocksArray = Object.entries(get().stocks);
        return stocksArray.sort((a, b) => b[1].timestamp - a[1].timestamp);
    },
}));