import React from 'react'
import { Route } from 'react-router'

import Auth from 'containers/Auth'
import Dashboard from 'containers/Dashboard'

const Routes = () => {
    return (
        <>
            <Route exact path="/" component={Auth} />
            <Route path="/dashboard" component={Dashboard} />
        </>
    )
}

export default Routes
