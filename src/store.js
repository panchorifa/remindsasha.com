import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { createLogger}  from 'redux-logger'
import thunk from 'redux-thunk'

import calendarApp from './reducers'

const middleware = applyMiddleware(
  createLogger(),
  routerMiddleware(),
  thunk
)

const store = () => {
  return createStore(
    calendarApp,
    compose(
      middleware
    )
  )
}

export default store
