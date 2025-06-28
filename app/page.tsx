"use client";

import { useMemo, useState, useCallback } from "react";
import type {
    IOUnits,
    PriceTableFields,
    PriceTableProps,
    ProviderDetails,
    Unit,
} from "@/types/util";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
    useQuery,
} from "@tanstack/react-query";
import Header from "@/components/Header";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import SelectField from "@/components/SelectField";
import NumberInput from "@/components/NumberInput";
import PriceTableLayout from "@/components/PriceTableLayout";

// Constants - moved outside component to prevent recreation
const PRECISION = 3;
const UNIT_OPTIONS = ["Tokens", "Words", "Characters"] as const;
const TABLE_HEADERS = [
    "Provider",
    "Model",
    "Input Cost",
    "Output Cost",
    "Total Cost",
];

// Token conversion rates - precomputed constants
const TOKEN_CONVERSION_RATES = {
    Words: 1.333,
    Characters: 0.4,
    Tokens: 1,
} as const;

// Optimized helper function with memoization potential
const formatCost = (cost: number, precision: number): string => {
    const pow = Math.pow(10, precision);
    return (Math.round((cost / 1e6) * pow) / pow).toFixed(precision);
};

// API functions - moved outside to prevent recreation
async function fetchProviders(): Promise<ProviderDetails[]> {
    const response = await fetch("/api");
    if (!response.ok) throw new Error("Failed to fetch providers");
    const json = await response.json();
    console.log("Price Info", json);
    return json;
}

async function fetchCurrencyRates() {
    const response = await fetch(
        "https://latest.currency-api.pages.dev/v1/currencies/usd.json"
    );
    if (!response.ok) throw new Error("Failed to fetch currency rates");
    const json = await response.json();
    console.log("Currency Info", json);
    return json;
}

// Singleton query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
            refetchOnWindowFocus: false,
        },
    },
});

const PriceTable = ({
    providers,
    unit,
    currency,
    ioUnits,
    conversionRate,
}: PriceTableProps) => {
    const { inputUnits, outputUnits, numberOfCalls } = ioUnits;

    // Memoize expensive calculations
    const tableData: PriceTableFields[] = useMemo(() => {
        if (!providers || providers.length === 0) return [];

        const tokensPerUnit = TOKEN_CONVERSION_RATES[unit];

        return providers.map((provider) => {
            const baseCostMultiplier = tokensPerUnit * conversionRate * numberOfCalls;
            const inputCost =
                provider.price.inputCostInDollarsPerMillionTokens *
                inputUnits *
                baseCostMultiplier;
            const outputCost =
                provider.price.outputCostInDollarsPerMillionTokens *
                outputUnits *
                baseCostMultiplier;

            return {
                provider: provider.name,
                model: provider.model,
                inputCost: formatCost(inputCost, PRECISION),
                outputCost: formatCost(outputCost, PRECISION),
                totalCost: formatCost(inputCost + outputCost, PRECISION),
            };
        });
    }, [providers, unit, inputUnits, outputUnits, numberOfCalls, conversionRate]);

    return (
        <div className="w-full mt-4 overflow-x-auto">
            <PriceTableLayout
                headers={TABLE_HEADERS}
                tableData={tableData}
                currency={currency}
            />
        </div>
    );
};

// Error component
const ErrorMessage = ({ message }: { message?: string }) => (
    <div className="bg-destructive/25 border border-red-500 text-red-500 py-2 px-4 text-lg rounded-lg">
        {message || "Error in fetching Data."}
    </div>
);

export default function App() {
    // State with better initial values
    const [unit, setUnit] = useState<Unit>("Tokens");
    const [ioUnits, setIOUnits] = useState<IOUnits>({
        inputUnits: 1000000,
        outputUnits: 1000000,
        numberOfCalls: 1,
    });
    const [currency, setCurrency] = useState<string>("USD");

    // Optimized update functions with useCallback
    const updateInputUnits = useCallback((inputUnits: number) => {
        setIOUnits((prev) => ({ ...prev, inputUnits }));
    }, []);

    const updateOutputUnits = useCallback((outputUnits: number) => {
        setIOUnits((prev) => ({ ...prev, outputUnits }));
    }, []);

    const updateNumberOfCalls = useCallback((numberOfCalls: number) => {
        setIOUnits((prev) => ({ ...prev, numberOfCalls }));
    }, []);

    // Queries with better configuration
    const {
        data: providers = [],
        isLoading: isLoadingProviders,
        isError: isProviderError,
        error: providerError,
    } = useQuery({
        queryKey: ["providers"],
        queryFn: fetchProviders,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    const {
        data: currencyData,
        isLoading: isLoadingCurrency,
        isError: isCurrencyError,
        error: currencyError,
    } = useQuery({
        queryKey: ["currencyRates"],
        queryFn: fetchCurrencyRates,
        staleTime: 60 * 60 * 1000, // 1 hour
        enabled: currency !== "USD", // Only fetch if not USD
    });

    // Memoize allowed currencies with better error handling
    const allowedCurrencies = useMemo(() => {
        const baseCurrencies = ["USD"];

        if (!currencyData?.usd) return baseCurrencies;

        try {
            const additionalCurrencies = Object.keys(currencyData.usd)
                .map((key: string) => key.toUpperCase())
                .filter((curr) => curr !== "USD");

            return [...baseCurrencies, ...additionalCurrencies];
        } catch (error) {
            console.error("Error processing currency data:", error);
            return baseCurrencies;
        }
    }, [currencyData]);

    // Optimized conversion rate calculation
    const conversionRate = useMemo(() => {
        if (currency === "USD") return 1;
        if (!currencyData?.usd) return 1;

        const rate = currencyData["usd"][currency.toLowerCase()];
        return typeof rate === "number" && rate > 0 ? rate : 1;
    }, [currency, currencyData]);

    const isLoading =
        isLoadingProviders || (currency !== "USD" && isLoadingCurrency);
    const hasError = isProviderError || isCurrencyError;

    const errorMessage = useMemo(() => {
        if (isProviderError && providerError) {
            return `Provider Error: ${providerError.message}`;
        }
        if (isCurrencyError && currencyError) {
            return `Currency Error: ${currencyError.message}`;
        }
        return undefined;
    }, [isProviderError, isCurrencyError, providerError, currencyError]);

    // Reset currency to USD if it becomes invalid
    const handleCurrencyChange = useCallback(
        (newCurrency: string) => {
            if (allowedCurrencies.includes(newCurrency)) {
                setCurrency(newCurrency);
            } else {
                setCurrency("USD");
            }
        },
        [allowedCurrencies]
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="min-h-screen flex flex-col items-center justify-start">
                <Header />

                <main className="container mx-auto px-4">
                    <p className="mb-4 text-justify p-2">
                        This calculator helps you estimate the cost of using various
                        language models. It calculates the cost based on the number of input
                        and output tokens along with the number of calls you make. The cost
                        is calculated in the currency of your choice. The input cost, output
                        cost, and total cost are calculated for each provider.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
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

                    <div className="flex flex-col md:flex-row gap-4 p-2">
                        <SelectField
                            id="currency"
                            label="Currency"
                            value={currency}
                            onChange={handleCurrencyChange}
                            options={allowedCurrencies}
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
                        <ErrorMessage message={errorMessage} />
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
