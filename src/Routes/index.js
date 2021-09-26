import React, { Suspense } from 'react'
import { Route } from 'react-router'

import Auth from 'containers/Auth'
import { GoalsProvider } from 'contexts/GoalsContext'

const Dashboard = React.lazy(() => import('containers/Dashboard'))
const Goals = React.lazy(() => import('containers/Goals'))
const Goal = React.lazy(() => import('containers/Goals/components/Goal'))
const Analytics = React.lazy(() => import('containers/Analytics'))
const LiveStuff = React.lazy(() => import('containers/LiveStuff'))
const DesignSystem = React.lazy(() => import('components/DesignSystem'))

const Routes = () => {
    return (
        <>
            <Route exact path="/" component={Auth} />
            <Suspense fallback={<div>Loading...</div>}>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/design-system" component={DesignSystem} />
                <Route exact path="/analytics" component={Analytics} />
                <Route exact path="/live-stuff" component={LiveStuff} />
                <GoalsProvider>
                    <Route exact path="/goals" component={Goals} />
                    <Route exact path="/goals/:id" component={Goal} />
                </GoalsProvider>
            </Suspense>
        </>
    )
}

export default Routes
