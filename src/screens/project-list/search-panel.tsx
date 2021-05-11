import React, {useState,useEffect} from 'react'
import {Input, Select} from 'antd'
export interface User {
    id: string;
    name: string;
    personId: string;
    organization: string;
    token: string;
}

interface SearchPanelProps{
    param: {
        name: string;
        personId: string;
    }
    setParam : (param: SearchPanelProps['param'])=> void;
    users: User[]
}


export const SearchPanel = ({param, setParam, users}: SearchPanelProps)=>{

    return <form>
        <div>
            <Input style={{width: 200}} type="text" value={param.name} onChange={
                e => setParam({
                    ...param,
                    name: e.target.value
                })
            }/>
            <Select style={{width: 200}} allowClear value={param.personId} onChange={value => setParam({
                ...param,
                personId: value
            })}>
                {
                    users.map(user =>{
                       return <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
                    })
                }
            </Select>
        </div>
    </form>
}