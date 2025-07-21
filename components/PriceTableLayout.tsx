import type { PriceTableFields, PriceTableProps } from "@/types/util";
import { formatCost } from "@/lib/utils";
import { useMemo } from "react";
import { DataTable } from "./ui/data-table";
import { columns } from "./Columns";

const PRECISION = 3;
const TOKEN_CONVERSION_RATES = {
  Words: 1.333,
  Characters: 0.4,
  Tokens: 1,
} as const;

export default function PriceTable({
  providers,
  unit,
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

  return <DataTable columns={columns} data={tableData} />;
}
