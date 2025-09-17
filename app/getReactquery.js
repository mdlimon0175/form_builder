import { isServer, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000 // 1 minute
            }
        }
    });
}

let browserClient;

export function getQueryClient() {
    if(isServer) {
        return makeQueryClient();
    }

    if(!browserClient) {
        browserClient = makeQueryClient()
    }
    return browserClient;
}