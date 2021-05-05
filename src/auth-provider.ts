//在真实环境中，如果使用firebase泽中第三方auth服务的话，本文件不需要开发者进行开发

import {User} from "./screens/project-list/search-panel";
const apiUrl = process.env.REACT_APP_API_URL
const localStorageKey = '__auth__provider__token'

export const getToken = () =>{
    window.localStorage.getItem(localStorageKey)
}

export const handleUserResponse = ({user}: {user: User}) =>{
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

export const login = (data:{username:string, password: string}) =>{
   return  fetch(`${apiUrl}/login`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async res =>{
        if(res.ok){
            return handleUserResponse(await res.json())
        }else{
            return Promise.reject(data)
        }
    })
}


export const register = (data:{username:string, password: string}) =>{
    return  fetch(`${apiUrl}/register`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async res =>{
        if(res.ok){
            return handleUserResponse(await res.json())
        }else{
            return Promise.reject(data)
        }
    })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)