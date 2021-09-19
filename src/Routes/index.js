import React from 'react'
import { Route } from 'react-router'

import Auth from 'containers/Auth'
import Dashboard from 'containers/Dashboard'
import Analytics from 'containers/Analytics'
import LiveStuff from 'containers/LiveStuff'

const Routes = () => {
    return (
        <>
            <Route exact path="/" component={Auth} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/analytics" component={Analytics} />
            <Route exact path="/live-stuff" component={LiveStuff} />
        </>
    )
}

export default Routes
