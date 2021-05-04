import React, {useState,useEffect} from 'react'

export const SearchPanel = ({param, setParam, users})=>{

    return <form>
        <div>
            <input type="text" value={param.value} onChange={
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