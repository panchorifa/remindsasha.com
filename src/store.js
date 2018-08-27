import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { createLogger}  from 'redux-logger'
import thunk from 'redux-thunk'
// import { offline } from '@redux-offline/redux-offline';
// import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

import calendarApp from './reducers'

const middleware = applyMiddleware(
  createLogger(),
  routerMiddleware(),
  thunk
)

const store = () => {
  // const middlewares = [thunk]
  // if(process.env.NODE_ENV !== 'production') {
  //   middlewares.push(createLogger())
  // }

  return createStore(
    calendarApp,
    compose(
      middleware,
      // offline(offlineConfig)
    )
  )
}

export default store
