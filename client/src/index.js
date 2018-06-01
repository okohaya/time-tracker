import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducers'
import App from './components/App'

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(reducer)
  })
}

const root = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
)
