import React from "react";
import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";

export const AuthenticatedApp = () => {
    const {logout} = useAuth()
    return <div>
        <PageHeader>

            <button onClick={logout}>登出</button>
        </PageHeader>
        <Main>
            <ProjectListScreen/>
        </Main>
    </div>
}


const PageHeader = styled.header`
height: 6rem;
background-color: antiquewhite;
`

const Main = styled.main`
height: calc(100vh - 6rem);
`