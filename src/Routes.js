import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import Activate from './auth/Activate'
import Private from './core/Private'
import PrivateRoute from './auth/PrivateRoute'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={ App } />
                <Route path="/signup" component={ Signup } />
                <Route path="/signin" component={ Signin } />
                <Route path="/auth/activate/:token" component={ Activate } />
                <PrivateRoute path="/private" component={ Private } />
            </Switch>
        </Router>
    )
}

export default Routes