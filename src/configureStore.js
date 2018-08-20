import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { createLogger}  from 'redux-logger'
import thunk from 'redux-thunk'
import calendarApp from './reducers'

const middleware = applyMiddleware(
  createLogger(),
  routerMiddleware(),
  thunk
)

const configureStore = () => {
  // const middlewares = [thunk]
  // if(process.env.NODE_ENV !== 'production') {
  //   middlewares.push(createLogger())
  // }

  return createStore(
    calendarApp,
    middleware
  )
}

export default configureStore
