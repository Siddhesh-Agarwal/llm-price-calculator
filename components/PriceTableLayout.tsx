import type { PriceTableFields } from "@/types/util";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

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
        <Table className="mt-4 w-full table-fixed border mb-2">
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
                        <TableCell className="border border-border px-2 py-1 text-center">
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
