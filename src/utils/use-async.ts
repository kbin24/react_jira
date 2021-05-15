//定义一个泛型
import {useState} from "react";

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

//初始默认值
const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}


export const useAsync = <D>(initialState?: State<D>) => {
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState //用户传进来的优先级比默认值高
    })

    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null
    })

    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })

    //该方法用来触发异步请求
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('请传入Promise类型数据')
        }

        setState({...state, stat: 'loading'}) //加载状态
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            setError(error)
            return error
        })
    }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }
}