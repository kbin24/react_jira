import {SearchPanel} from './search-panel'
import {List, Project} from './list'
import React, {useEffect, useState} from "react";
import {Typography} from 'antd'
import {cleanObject, useDebounce, useMount} from "../../utils";
import * as qs from "qs";
import {useHttp} from "../../utils/http";
import styled from "@emotion/styled";
import {useAsync} from "../../utils/use-async";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";


const apiUrl = process.env.REACT_APP_API_URL



export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 2000)
    const {isLoading, error, data: list} = useProjects(debouncedParam)
    const {data:users} = useUsers()




    return <Container>
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam={setParam} users={users || []}/>
        {
            error ? <Typography.Text>{error.message}</Typography.Text> : null
        }
        <List loading={isLoading} dataSource={list || []} users={users || []}/>
    </Container>
}

const Container = styled.div`
padding: 3.2rem;
`