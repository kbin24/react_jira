import React, {ReactNode, useState} from 'react'
import * as auth from 'auth-provider'
import {User} from "../screens/project-list/search-panel";
import {http} from "../utils/http";
import {useMount} from "../utils";


const AuthContext = React.createContext<{
    user: User | null,
    login: (form:AuthForm) => Promise<void>,
    register: (form:AuthForm) => Promise<void>,
    logout: () => Promise<void>,
}|undefined>(undefined)

AuthContext.displayName = 'AuthContext'

interface AuthForm {
    username: string;
    password: string;
}

//初始化user
const bootstrapUser = async () =>{
    let user = null
    const token =auth.getToken()
    if(token){
        const data = await http('me', {token})
        user = data.user
    }
    return user
}

export const AuthProvider = ({children}:{children: ReactNode}) =>{
    const [user, setUser] = useState<User | null>(null)

    //point free
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
    const logout = () => auth.logout().then(() => setUser(null))

    //初始加载的时候
    useMount(()=>{
        bootstrapUser().then(setUser)
    })

    return <AuthContext.Provider children={children} value={{user,login,register, logout}}></AuthContext.Provider>
}

export const useAuth = () =>{
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}