import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'react-emotion'
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
    <Container>
      <Router>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Container>
  )
}

export default hot(module)(App)


const Container = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
`
