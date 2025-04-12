'use client';

import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from './get-query-client'
import { ThemeProvider } from "next-themes"
import type * as React from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient()

    return (
        <ThemeProvider
            attribute="class"
            enableSystem
            enableColorScheme
        >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ThemeProvider>
    )
}