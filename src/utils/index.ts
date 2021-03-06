import {useEffect, useState} from "react";

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: {[key:string]: unknown}) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}

/*export const debounce = (func, delay) => {
    let timeout;
    return () => {
        if (timeout) {
            clearInterval(timeout)
        }
        timeout = setTimeout(() => {
            func()
        }, delay)
    }
}*/

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        //每次在value变化之后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        //每次在上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}


//编写一个泛型
export const useArray = <T>(initialArray:T[]) =>{
    const [value, setValue] = useState(initialArray)
    return{
        value,
        setValue,
        add: (item:T) => setValue([...value, item]),
        clear: ()=> setValue([]),
        removeIndex: (index: number) =>{
            const copy = [...value]
            copy.splice(index,1)
            setValue(copy)
        }
    }
}