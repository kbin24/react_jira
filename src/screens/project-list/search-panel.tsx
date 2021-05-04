import React, {useState,useEffect} from 'react'

export interface User {
    id: string;
    name: string;
    personId: string;
    organization: string
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
            <input type="text" value={param.name} onChange={
                e => setParam({
                    ...param,
                    name: e.target.value
                })
            }/>
            <select value={param.personId} onChange={e => setParam({
                ...param,
                personId: e.target.value
            })}>
                {
                    users.map(user =>{
                       return <option key={user.id} value={user.id}>{user.name}</option>
                    })
                }
            </select>
        </div>
    </form>
}