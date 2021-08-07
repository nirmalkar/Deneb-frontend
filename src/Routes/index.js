import React from "react"
import { Route } from "react-router"

import Auth from "containers/Auth"

const Routes = () =>{
    return (
        <>
        <Route  path="/" component={Auth}/>
        </>
    )
}

export default Routes 