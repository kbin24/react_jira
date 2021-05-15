import React, {FormEvent, FormEventHandler} from 'react'
import {useAuth} from "../context/auth-context";
import {Button, Form, Input} from "antd";
import {LongButton} from 'unauthenticated-app';
import {useAsync} from "../utils/use-async";


export const RegisterScreen = ({onError}: { onError: (error: Error) => void }) => {

    const {register, user} = useAuth()
    const {run, isLoading} = useAsync()

    const handleSubmit = async ({newPassword, ...values}:{ username: string, password: string, newPassword: string }) => {
        if(newPassword !== values.password){
            onError(new Error('请确认两次输入的密码相同'))
            return
        }
        try {
           await run(register(values)) //这里是异步函数 所以catch里面的代码执行完之后才会执行该部分的代码 所以为了正确执行代码 需要加上 async await
        } catch (e) {
            onError(e)
        }
    }

    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
            <Input placeholder="用户名" type="text" id={'username'}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}>
            <Input placeholder={'密码'} type="password" id={'password'}/>
        </Form.Item>
        <Form.Item name={'newPassword'} rules={[{required: true, message: '请确认密码'}]}>
            <Input placeholder={'确认密码'} type="password" id={'newPassword'}/>
        </Form.Item>
        <Form.Item>
            <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>注册</LongButton>
        </Form.Item>
    </Form>
}