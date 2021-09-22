import React from 'react'
import { Route } from 'react-router'

import Auth from 'containers/Auth'
import Dashboard from 'containers/Dashboard'
import Analytics from 'containers/Analytics'
import LiveStuff from 'containers/LiveStuff'
import DesignSystem from 'components/DesignSystem/Index'
import Goals from 'containers/Goals'

const Routes = () => {
    return (
        <>
            <Route exact path="/" component={Auth} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/design-system" component={DesignSystem} />
            <Route exact path="/analytics" component={Analytics} />
            <Route exact path="/live-stuff" component={LiveStuff} />
            <Route exact path="/goals" component={Goals} />
        </>
    )
}

export default Routes
