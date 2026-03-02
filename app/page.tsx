"use client";

import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
	useQuery,
} from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import Header from "@/components/Header";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import NumberInput from "@/components/NumberInput";
import PriceTable from "@/components/PriceTableLayout";
import SelectField from "@/components/SelectField";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { models as providers } from "@/data";
import type { IOUnits, Unit } from "@/types/util";

// Constants - moved outside component to prevent recreation
const UNIT_OPTIONS = ["Tokens", "Words", "Characters"] as const;

async function fetchCurrencyRates(): Promise<{
	date: string;
	usd: { [key: string]: number };
}> {
	const response = await fetch(
		"https://latest.currency-api.pages.dev/v1/currencies/usd.json",
	);
	if (!response.ok) throw new Error("Failed to fetch currency rates");
	return response.json();
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

	const {
		data: currencyData,
		status,
		error,
	} = useQuery({
		queryKey: ["currencyRates"],
		queryFn: fetchCurrencyRates,
		staleTime: 60 * 60 * 1000, // 1 hour
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

		const rate = currencyData.usd[currency.toLowerCase()];
		return typeof rate === "number" && rate > 0 ? rate : 1;
	}, [currency, currencyData]);

	// Reset currency to USD if it becomes invalid
	const handleCurrencyChange = useCallback(
		(newCurrency: string) => {
			if (allowedCurrencies.includes(newCurrency)) {
				setCurrency(newCurrency);
			} else {
				setCurrency("USD");
			}
		},
		[allowedCurrencies],
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="min-h-screen flex flex-col items-center justify-start">
				<Header />

				<main className="container mx-auto px-4">
					<p className="mb-4 text-justify px-2">
						This calculator helps you estimate the cost of using various
						language models. It calculates the cost based on the number of input
						and output tokens along with the number of calls you make. The cost
						is calculated in the currency of your choice. The input cost, output
						cost, and total cost are calculated for each provider.
					</p>
					<p className="mb-4 text-justify px-2">
						To access the public API, please visit:{" "}
						<a href="/api" className="text-blue-500 hover:underline">
							<code className="font-mono bg-accent px-0.5">/api</code>
						</a>
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
						<NumberInput
							label={`Input ${unit}`}
							value={ioUnits.inputUnits}
							onChange={updateInputUnits}
						/>
						<NumberInput
							label={`Output ${unit}`}
							value={ioUnits.outputUnits}
							onChange={updateOutputUnits}
						/>
						<NumberInput
							label="Number of Calls"
							value={ioUnits.numberOfCalls}
							onChange={updateNumberOfCalls}
						/>
					</div>

					<div className="flex flex-row gap-2 md:gap-4 p-2">
						<SelectField
							label="Currency"
							value={currency}
							onChange={handleCurrencyChange}
							options={allowedCurrencies}
						/>
						<SelectField
							label="Input Unit"
							value={unit}
							onChange={(val) => setUnit(val as Unit)}
							options={UNIT_OPTIONS}
						/>
					</div>

					{status === "pending" ? (
						<LoadingSkeleton />
					) : status === "error" ? (
						<Alert variant={"destructive"}>
							<AlertTitle>Error: {error.name}</AlertTitle>
							<AlertDescription>{error.message}</AlertDescription>
						</Alert>
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
