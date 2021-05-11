import React, {ReactNode} from "react";
import {AuthProvider} from "context/auth-context";
import {QueryClient, QueryClientProvider} from "react-query"

//当这里的值改变时，里面的组件会被重新渲染
export const AppProviders = ({children}:{children: ReactNode}) =>{
    return <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
            {children}
        </AuthProvider>
    </QueryClientProvider>
}