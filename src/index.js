import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Routes from 'Routes'
import { AuthProvider } from './contexts/AuthContext'
import reportWebVitals from './reportWebVitals'

import './scss/main.scss'
import 'antd/dist/antd.css'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <AuthProvider>
                    <Routes />
                </AuthProvider>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
