/*
// Title: Form Builder
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 17/09/2025
*/

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "./getReactquery";
import { fetchFormBuilderData } from "@/lib/dataFetching";
import FormBuilder from "@/components/FormBuilder/FormBuilder";

export default async function Home() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['data'],
        queryFn: fetchFormBuilderData
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <section className="max-w-7xl mx-auto px-6">
                <FormBuilder />
            </section>
        </HydrationBoundary>
    );
}
