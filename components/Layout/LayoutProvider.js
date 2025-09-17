"use client"

import { getQueryClient } from "@/app/getReactquery"
import { QueryClientProvider } from "@tanstack/react-query"

export default function LayoutProvider({ children }) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}