import qs from "qs"
import * as auth from 'auth-provider'
import {useAuth} from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
    token?: string;
    data?: object;
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
    const config = {
        method: 'GET', //默认值为GET 如果customConfig有method传进来就会覆盖掉这里的值
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }

    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }

    return window.fetch(`${apiUrl}/${endpoint}`, config).then(async res => {
        //token过期的时候
        if (res.status === 401) {
            await auth.logout() //退出重新登录
            window.location.reload() //页面刷新
            return Promise.reject({message: '请重新登录'})
        }
        const data = await res.json()
        if (res.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

//只有Hook里面可以使用其他的Hook
export const useHttp = () => {
    const {user} = useAuth()
    //utility type的用法：用泛型给它传入一个其它类型，然后utility type对这个类型进行某种操作
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}