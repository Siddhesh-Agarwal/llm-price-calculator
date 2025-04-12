"use client";

import Image from "next/image";
import { useMemo, useState } from 'react'
import GitHubIcon from "@/asset/github.svg"
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IOUnits, ProviderDetails, Unit } from "@/types/util";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

// Helper functions
function round(number: number, precision: number): string {
    const pow = Math.pow(10, precision);
    const ans = Math.round((number / 1e6) * pow) / pow;
    return ans.toFixed(precision);
}

const queryClient = new QueryClient();

// Components
function Header() {
    return (
        <header className="bg-primary/40 w-full py-2 md:py-4 mb-4 flex flex-row justify-between px-4 md:px-6 shadow shadow-accent">
            <Link className='font-bold text-2xl text-gray-900 dark:text-gray-100' href='/'>
                LLMPrice.fyi
            </Link>
            <Link href="https://github.com/Siddhesh-Agarwal/llm-price-calculator" target="_blank" rel="noreferrer" className='hover:bg-slate-300 dark:hover:bg-slate-700 py-1 px-2 rounded-lg'>
                <Image src={GitHubIcon} alt="GitHub" className='w-6 h-6 rounded' />
            </Link>
        </header>
    )
}

function PriceTable({ providers, unit, currency, ioUnits, conversionRate, precision }: { providers: ProviderDetails[], unit: Unit, currency: string, ioUnits: IOUnits, conversionRate: number, precision: number }) {
    const { inputUnits, outputUnits, numberOfCalls } = ioUnits;
    return (
        <Table className='mt-4 w-full table-fixed border mb-2'>
            <TableHeader>
                <TableRow>
                    {['Provider', 'Model', `Input Cost (${currency})`, `Output Cost (${currency})`, `Total Cost (${currency})`].map((header) => (
                        <TableHead key={header} className='font-bold border bg-slate-300 dark:bg-slate-700 text-center'>{header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody className='font-mono text-sm'>
                {
                    providers.map((provider: ProviderDetails, index: number) => {
                        const numberOfTokensPerUnit = unit === 'Words' ? 1.333 : unit === 'Characters' ? 0.400 : 1;
                        const inputCost = provider.price.inputCostInDollarsPerMillionTokens * numberOfTokensPerUnit * inputUnits * conversionRate * numberOfCalls;
                        const outputCost = provider.price.outputCostInDollarsPerMillionTokens * numberOfTokensPerUnit * outputUnits * conversionRate * numberOfCalls;
                        const totalCost = inputCost + outputCost;
                        return (
                            <TableRow key={index}>
                                <TableCell className='border border-slate-300 dark:border-slate-700 px-2 py-1 text-center'>{provider.name}</TableCell>
                                <TableCell className='border border-slate-300 dark:border-slate-700 px-2 py-1 text-center'>{provider.model}</TableCell>
                                <TableCell className='border border-slate-300 dark:border-slate-700 px-2 py-1 text-center'>{round(inputCost, precision)}</TableCell>
                                <TableCell className='border border-slate-300 dark:border-slate-700 px-2 py-1 text-center'>{round(outputCost, precision)}</TableCell>
                                <TableCell className='border border-slate-300 dark:border-slate-700 px-2 py-1 text-center'>{round(totalCost, precision)}</TableCell>
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        </Table>
    )
}

// Constants
const precision: number = 3;
const allowedCurrency: string[] = ['AED', 'AUD', 'CAD', 'CNY', 'EUR', 'GBP', 'HKD', 'INR', 'JPY', 'SGD', 'USD', 'BNB', 'BTC', 'DOGE', 'ETH', 'SOL', 'USDT', 'XRP'];

// API fetching functions
const fetchProviders = async (): Promise<ProviderDetails[]> => {
    const response = await fetch("https://api.llmprice.fyi/", { cache: "force-cache" });
    if (!response.ok) throw new Error('Failed to fetch providers');
    return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchCurrencyRates = async (): Promise<any> => {
    const response = await fetch("https://latest.currency-api.pages.dev/v1/currencies/usd.json", { cache: "force-cache" });
    if (!response.ok) throw new Error('Failed to fetch currency rates');
    return response.json();
};


function App() {
    // State variables
    const [unit, setUnit] = useState<Unit>('Tokens');
    const [ioUnits, setIOUnits] = useState<IOUnits>({ inputUnits: 0, outputUnits: 0, numberOfCalls: 1 });
    const [currency, setCurrency] = useState<string>('USD');

    // Query for providers data
    const {
        data: providers = [],
        isLoading: isLoadingProviders,
        isError: isProviderError
    } = useQuery({
        queryKey: ['providers'],
        queryFn: fetchProviders,
    });

    // Query for currency conversion data
    const {
        data: currencyData,
        isLoading: isLoadingCurrency,
        isError: isCurrencyError
    } = useQuery({
        queryKey: ['currencyRates'],
        queryFn: fetchCurrencyRates,
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    // Compute conversion rate (pure function, no side effects)
    const conversionRate = useMemo(() => {
        if (currency === 'USD') return 1;
        if (!currencyData) return 1;

        const rate = currencyData.usd?.[currency.toLowerCase()];
        return typeof rate === 'number' ? rate : 1;
    }, [currency, currencyData]);

    // create an input field for input tokens and output tokens and calculate the cost for each provider 
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className='min-h-screen flex flex-col items-center justify-start bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100'>
                <Header />

                <main className="container">
                    <p className="mb-4 text-gray-900 dark:text-gray-300 text-justify p-2">
                        This calculator helps you estimate the cost of using various language models. It calculates the cost based on the number of input and output tokensalong with the number of calls you make. The cost is calculated in the currency or crypto of your choice. The input cost, output cost, and total cost are calculated for each provider.
                    </p>
                    <div className="grid grid-cols-3 gap-4 md:gap-4 p-2">
                        {[
                            {
                                id: 'input-tokens',
                                label: `Input ${unit}`,
                                value: ioUnits.inputUnits,
                                setValue: (val: number) => setIOUnits({ ...ioUnits, inputUnits: val }),
                                min: 0
                            },
                            {
                                id: 'output-tokens',
                                label: `Output ${unit}`,
                                value: ioUnits.outputUnits,
                                setValue: (val: number) => setIOUnits({ ...ioUnits, outputUnits: val }),
                                min: 0
                            },
                            {
                                id: 'call-count',
                                label: 'Number of Calls',
                                value: ioUnits.numberOfCalls,
                                setValue: (val: number) => setIOUnits({ ...ioUnits, numberOfCalls: val }),
                                min: 1
                            }
                        ].map(({ id, label, value, setValue, min }) => (
                            <fieldset key={id} className="relative">
                                <Label htmlFor={id} className="text-gray-700 dark:text-gray-300">
                                    {label}
                                </Label>
                                <Input
                                    type="number"
                                    id={id}
                                    value={value}
                                    onChange={(e) => setValue(Math.floor(Number(e.target.value)))}
                                    min={min}
                                    className="rounded flex-1 appearance-none border border-slate-300 dark:border-slate-700 w-full py-1 px-4 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono"
                                    name={id}
                                />
                            </fieldset>
                        ))}
                    </div>

                    <div className="flex flex-row">
                        {[
                            { id: 'currency', label: 'Currency', value: currency, setValue: setCurrency, options: allowedCurrency },
                            { id: 'input-unit', label: 'Input Unit', value: unit, setValue: setUnit, options: ['Tokens', 'Words', 'Characters'] }
                        ].map(({ id, label, value, setValue, options }) => (
                            <fieldset key={id} className="relative p-2">
                                <Label htmlFor={id} className="text-gray-700 dark:text-gray-300 mr-1">
                                    {label}
                                </Label>
                                <Select value={value} onValueChange={(val) => setValue(val as Unit)}>
                                    <SelectTrigger id={id} name={id}>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* <SelectPrimitive.Viewport> */}
                                        {options.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                <Select>{option}</Select>
                                            </SelectItem>
                                        ))}
                                        {/* </SelectPrimitive.Viewport> */}
                                    </SelectContent>
                                </Select>
                            </fieldset>
                        ))}
                    </div>

                    {(isLoadingCurrency || isLoadingProviders) ? (
                        <div className="flex flex-col gap-2 w-full">
                            <Skeleton className="h-6 w-full rounded" />
                            <Skeleton className="h-6 w-full rounded" />
                            <Skeleton className="h-6 w-full rounded" />
                            <Skeleton className="h-6 w-full rounded" />
                            <Skeleton className="h-6 w-full rounded" />
                            <Skeleton className="h-6 w-full rounded" />
                            <Skeleton className="h-6 w-full rounded" />
                            <Skeleton className="h-6 w-full rounded" />
                        </div>
                    ) : (isCurrencyError || isProviderError ? (
                        <div className="bg-destructive/25 border border-red-500 text-red-500 py-2 px-4 text-lg rounded-lg">
                            Error in fetching Data.
                        </div>
                    ) : (
                        <PriceTable providers={providers} unit={unit} currency={currency} ioUnits={ioUnits} conversionRate={conversionRate} precision={precision} />
                    ))}
                </main>

            </div>
        </HydrationBoundary>
    )
}

export default App
