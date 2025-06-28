import type { PriceTableFields, Provider } from "@/types/util";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { cn } from "@/lib/utils";

function providerColor(provider: Provider): string {
    switch (provider) {
        case "OpenAI":
            return "text-foreground"
        case "Claude":
            return "text-[#d97757]"
        case "Google":
            return "text-[#4285f4]"
    }
}

export default function PriceTableLayout({
    headers,
    tableData,
    currency,
}: {
    headers: string[];
    tableData: PriceTableFields[];
    currency: string;
}) {
    return (
        <Table className="w-full border mb-2">
            <TableHeader>
                <TableRow>
                    {headers.map((header) => (
                        <TableHead
                            key={header}
                            className="font-bold border bg-primary text-center"
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
                        <TableCell className={cn("border border-border px-2 py-1 text-center", providerColor(row.provider))}>
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
    );
}
