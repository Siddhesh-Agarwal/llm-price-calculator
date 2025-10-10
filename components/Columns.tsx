import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, SortAsc, SortDesc } from "lucide-react";
import type { PriceTableFields, Provider } from "@/types/util";
import { Button } from "./ui/button";

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

export const columns: ColumnDef<PriceTableFields>[] = [
  {
    accessorKey: "provider",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Provider
          {column.getIsSorted() === false ? (
            <ArrowUpDown />
          ) : column.getIsSorted() === "asc" ? (
            <SortAsc />
          ) : (
            <SortDesc />
          )}
        </Button>
      );
    },
    cell: (info) => {
      return (
        <span className={providerColor(info.row.original.provider)}>
          {info.row.original.provider}
        </span>
      );
    },
  },
  {
    accessorKey: "model",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model
          {column.getIsSorted() === false ? (
            <ArrowUpDown />
          ) : column.getIsSorted() === "asc" ? (
            <SortAsc />
          ) : (
            <SortDesc />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "inputCost",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Input Cost
          {column.getIsSorted() === false ? (
            <ArrowUpDown />
          ) : column.getIsSorted() === "asc" ? (
            <SortAsc />
          ) : (
            <SortDesc />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "outputCost",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Output Cost
          {column.getIsSorted() === false ? (
            <ArrowUpDown />
          ) : column.getIsSorted() === "asc" ? (
            <SortAsc />
          ) : (
            <SortDesc />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "totalCost",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Cost
          {column.getIsSorted() === false ? (
            <ArrowUpDown />
          ) : column.getIsSorted() === "asc" ? (
            <SortAsc />
          ) : (
            <SortDesc />
          )}
        </Button>
      );
    },
  },
];
