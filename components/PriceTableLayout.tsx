import type { PriceTableFields, PriceTableProps, Provider } from "@/types/util";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { cn, formatCost } from "@/lib/utils";
import { useMemo } from "react";

const PRECISION = 3;
const TOKEN_CONVERSION_RATES = {
    Words: 1.333,
    Characters: 0.4,
    Tokens: 1,
} as const;
const TABLE_HEADERS = [
    "Provider",
    "Model",
    "Input Cost",
    "Output Cost",
    "Total Cost",
];

function providerColor(provider: Provider): string {
    switch (provider) {
        case "OpenAI":
            return "text-[#080808] dark:text-white";
        case "Claude":
            return "text-[#DE7356]";
        case "Google":
            return "text-[#4285f4]";
        case "Moonshot":
            return "text-[#2D3250] dark:text-[#7C7CE0]";
        case "Deepseek":
            return "text-[#003366] dark:text-[#4A709E]";
    }
}

export default function PriceTable({
    providers,
    unit,
    currency,
    ioUnits,
    conversionRate,
}: PriceTableProps) {
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
            <Table className="w-full border mb-2">
                <TableHeader>
                    <TableRow>
                        {TABLE_HEADERS.map((header) => (
                            <TableHead
                                key={header}
                                className="font-bold border bg-primary text-center px-2 py-1"
                            >
                                {header === "Input Cost" ||
                                    header === "Output Cost" ||
                                    header === "Total Cost"
                                    ? `${header} (${currency})`
                                    : header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="font-mono text-sm">
                    {tableData.map((row, index) => (
                        <TableRow key={`${row.provider}-${row.model}-${index}`}>
                            <TableCell
                                className={cn(
                                    "border border-border px-2 py-1 text-center",
                                    providerColor(row.provider)
                                )}
                            >
                                {row.provider}
                            </TableCell>
                            <TableCell className="border border-border px-2 py-1 text-center">
                                {row.model}
                            </TableCell>
                            <TableCell className="border border-border px-2 py-1 text-center">
                                {row.inputCost}
                            </TableCell>
                            <TableCell className="border border-border px-2 py-1 text-center">
                                {row.outputCost}
                            </TableCell>
                            <TableCell className="border border-border px-2 py-1 text-center">
                                {row.totalCost}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
