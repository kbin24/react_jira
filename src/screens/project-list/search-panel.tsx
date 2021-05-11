import React, {useState,useEffect} from 'react'
import {Input, Select, Form} from 'antd'
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

    return <Form layout={'inline'} style={{marginBottom:'2rem'}}>
        <Form.Item>
            <Input placeholder={'项目名'} type="text" value={param.name} onChange={
                e => setParam({
                    ...param,
                    name: e.target.value
                })
            }/>
        </Form.Item>
        <Form.Item>
            <Select placeholder={'负责人'} style={{width:'20rem'}}  allowClear value={param.personId} onChange={value => setParam({
                ...param,
                personId: value
            })}>
                {
                    users.map(user =>{
                       return <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
                    })
                }
            </Select>
        </Form.Item>
    </Form>
}