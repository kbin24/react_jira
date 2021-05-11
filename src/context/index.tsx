import React, {ReactNode} from "react";
import {AuthProvider} from "./auth-context";

//当这里的值改变时，里面的组件会被重新渲染
export const AppProviders = ({children}:{children: ReactNode}) =>{
    return <AuthProvider>
        {children}
    </AuthProvider>
}