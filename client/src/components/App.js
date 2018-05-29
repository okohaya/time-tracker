import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import IndexPage from '../containers/IndexPage'

function NotFound() {
  return (
    <div>
      Not Found
    </div>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default hot(module)(App)
