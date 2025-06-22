"use client";

import { useMemo, useState, useCallback } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IOUnits, PriceTableProps, ProviderDetails, Unit } from "@/types/util";
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";
import Header from '@/components/Header';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import SelectField from '@/components/SelectField';
import NumberInput from '@/components/NumberInput';

// Constants - moved outside component to prevent recreation
const PRECISION = 3;
const ALLOWED_CURRENCIES = ['AED', 'AUD', 'CAD', 'CNY', 'EUR', 'GBP', 'HKD', 'INR', 'JPY', 'SGD', 'USD', 'BNB', 'BTC', 'DOGE', 'ETH', 'SOL', 'USDT', 'XRP'] as const;
const UNIT_OPTIONS = ['Tokens', 'Words', 'Characters'] as const;
const TABLE_HEADERS = ['Provider', 'Model', 'Input Cost', 'Output Cost', 'Total Cost'] as const;

// Token conversion rates - precomputed constants
const TOKEN_CONVERSION_RATES = {
    'Words': 1.333,
    'Characters': 0.400,
    'Tokens': 1
} as const;

// Optimized helper function with memoization potential
const formatCost = (cost: number, precision: number): string => {
    const pow = Math.pow(10, precision);
    return (Math.round((cost / 1e6) * pow) / pow).toFixed(precision);
};

// API functions - moved outside to prevent recreation
const fetchProviders = async (): Promise<ProviderDetails[]> => {
    const response = await fetch("https://api.llmprice.fyi/", { cache: "force-cache" });
    if (!response.ok) throw new Error('Failed to fetch providers');
    return response.json();
};

const fetchCurrencyRates = async () => {
    const response = await fetch("https://latest.currency-api.pages.dev/v1/currencies/usd.json", { cache: "force-cache" });
    if (!response.ok) throw new Error('Failed to fetch currency rates');
    return response.json();
};

// Singleton query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
        },
    },
});


const PriceTable = ({ providers, unit, currency, ioUnits, conversionRate }: PriceTableProps) => {
    const { inputUnits, outputUnits, numberOfCalls } = ioUnits;

    // Memoize expensive calculations
    const tableData = useMemo(() => {
        const tokensPerUnit = TOKEN_CONVERSION_RATES[unit];

        return providers.map((provider) => {
            const baseCostMultiplier = tokensPerUnit * conversionRate * numberOfCalls;
            const inputCost = provider.price.inputCostInDollarsPerMillionTokens * inputUnits * baseCostMultiplier;
            const outputCost = provider.price.outputCostInDollarsPerMillionTokens * outputUnits * baseCostMultiplier;

            return {
                provider: provider.name,
                model: provider.model,
                inputCost: formatCost(inputCost, PRECISION),
                outputCost: formatCost(outputCost, PRECISION),
                totalCost: formatCost(inputCost + outputCost, PRECISION)
            };
        });
    }, [providers, unit, inputUnits, outputUnits, numberOfCalls, conversionRate]);

    return (
        <Table className='mt-4 w-full table-fixed border mb-2'>
            <TableHeader>
                <TableRow>
                    {TABLE_HEADERS.map((header) => (
                        <TableHead
                            key={header}
                            className='font-bold border bg-slate-300 dark:bg-slate-700 text-center'
                        >
                            {header === 'Input Cost' || header === 'Output Cost' || header === 'Total Cost'
                                ? `${header} (${currency})`
                                : header
                            }
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody className='font-mono text-sm'>
                {tableData.map((row, index) => (
                    <TableRow key={`${row.provider}-${row.model}-${index}`}>
                        <TableCell className='border border-slate-300 dark:border-slate-700 px-2 py-1 text-center'>
                            {row.provider}
                        </TableCell>
                        <TableCell className='border border-slate-300 dark:border-slate-700 px-2 py-1 text-center'>
                            {row.model}
                        </TableCell>
                        <TableCell className='border border-slate-300 dark:border-slate-700 px-2 py-1 text-center'>
                            {row.inputCost}
                        </TableCell>
                        <TableCell className='border border-slate-300 dark:border-slate-700 px-2 py-1 text-center'>
                            {row.outputCost}
                        </TableCell>
                        <TableCell className='border border-slate-300 dark:border-slate-700 px-2 py-1 text-center'>
                            {row.totalCost}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

// Error component
const ErrorMessage = () => (
    <div className="bg-destructive/25 border border-red-500 text-red-500 py-2 px-4 text-lg rounded-lg">
        Error in fetching Data.
    </div>
);

export default function App() {
    // State with better initial values
    const [unit, setUnit] = useState<Unit>('Tokens');
    const [ioUnits, setIOUnits] = useState<IOUnits>({
        inputUnits: 0,
        outputUnits: 0,
        numberOfCalls: 1
    });
    const [currency, setCurrency] = useState<string>('USD');

    // Optimized update functions with useCallback
    const updateInputUnits = useCallback((inputUnits: number) => {
        setIOUnits(prev => ({ ...prev, inputUnits }));
    }, []);

    const updateOutputUnits = useCallback((outputUnits: number) => {
        setIOUnits(prev => ({ ...prev, outputUnits }));
    }, []);

    const updateNumberOfCalls = useCallback((numberOfCalls: number) => {
        setIOUnits(prev => ({ ...prev, numberOfCalls }));
    }, []);

    // Queries with better configuration
    const {
        data: providers = [],
        isLoading: isLoadingProviders,
        isError: isProviderError
    } = useQuery({
        queryKey: ['providers'],
        queryFn: fetchProviders,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    const {
        data: currencyData,
        isLoading: isLoadingCurrency,
        isError: isCurrencyError
    } = useQuery({
        queryKey: ['currencyRates'],
        queryFn: fetchCurrencyRates,
        staleTime: 60 * 60 * 1000, // 1 hour
        enabled: currency !== 'USD', // Only fetch if not USD
    });

    // Optimized conversion rate calculation
    const conversionRate = useMemo(() => {
        if (currency === 'USD') return 1;
        const rate = currencyData.usd[currency.toLowerCase()];
        return (typeof rate === 'number' && rate > 0) ? rate : 1;
    }, [currency, currencyData]);

    const isLoading = isLoadingProviders || (currency !== 'USD' && isLoadingCurrency);
    const hasError = isProviderError || isCurrencyError;

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className='min-h-screen flex flex-col items-center justify-start bg-background'>
                <Header />

                <main className="container">
                    <p className="mb-4 text-gray-900 dark:text-gray-300 text-justify p-2">
                        This calculator helps you estimate the cost of using various language models. It calculates the cost based on the number of input and output tokens along with the number of calls you make. The cost is calculated in the currency or crypto of your choice. The input cost, output cost, and total cost are calculated for each provider.
                    </p>

                    <div className="grid grid-cols-3 gap-4 md:gap-4 p-2">
                        <NumberInput
                            id="input-tokens"
                            label={`Input ${unit}`}
                            value={ioUnits.inputUnits}
                            onChange={updateInputUnits}
                            min={0}
                        />
                        <NumberInput
                            id="output-tokens"
                            label={`Output ${unit}`}
                            value={ioUnits.outputUnits}
                            onChange={updateOutputUnits}
                            min={0}
                        />
                        <NumberInput
                            id="call-count"
                            label="Number of Calls"
                            value={ioUnits.numberOfCalls}
                            onChange={updateNumberOfCalls}
                            min={1}
                        />
                    </div>

                    <div className="flex flex-row">
                        <SelectField
                            id="currency"
                            label="Currency"
                            value={currency}
                            onChange={setCurrency}
                            options={ALLOWED_CURRENCIES}
                        />
                        <SelectField
                            id="input-unit"
                            label="Input Unit"
                            value={unit}
                            onChange={(val) => setUnit(val as Unit)}
                            options={UNIT_OPTIONS}
                        />
                    </div>

                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : hasError ? (
                        <ErrorMessage />
                    ) : (
                        <PriceTable
                            providers={providers}
                            unit={unit}
                            currency={currency}
                            ioUnits={ioUnits}
                            conversionRate={conversionRate}
                        />
                    )}
                </main>
            </div>
        </HydrationBoundary>
    );
}