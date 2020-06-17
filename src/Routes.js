import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App'
import Signup from './auth/Signup'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={ App } />
                <Route path="/signup" component={ Signup } />
            </Switch>
        </Router>
    )
}

export default Routes