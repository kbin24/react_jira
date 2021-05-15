import React from 'react'
import {User} from "./search-panel";
import {Table} from 'antd'
import dayjs from "dayjs";
import {TableProps} from "antd/es/table"

export interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string
    created: string
}

//继承于 TableProps 这样TableProps上的属性ListProps都有 就不用每新增一个属性就写一遍了
interface ListProps extends TableProps<Project>{
    users: User[]
}



export const List = ({users, ...props}: ListProps) => {

    return <Table rowKey={'id'} pagination={false} {...props} columns={[
        {
            title: '名称',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: '部门',
            dataIndex: 'organization',
        },
        {
            title: '负责人',
            render(value, project) {
                return <span>
                    {users.find(user => user.id === project.personId)?.name || '未知'}
                </span>
            }
        },
        {
            title: '创建时间',
            dataIndex: 'created',
            render(value, project) {
                return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD') : ''}
                </span>
            }
        },
    ]}/>

}