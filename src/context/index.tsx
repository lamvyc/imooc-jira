import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";


export const AppProviders = ({ children }: { children: ReactNode }) => {
    // return <AuthProvider>{children}</AuthProvider>;
    // 两种写法等价
    // return <AuthProvider children={children}></AuthProvider>;

    const queryClient = new QueryClient()
    console.log(children)
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    );
};
