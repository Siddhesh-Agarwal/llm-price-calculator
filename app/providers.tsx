"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import type * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { getQueryClient } from "./get-query-client";

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ThemeProvider>
	);
}
