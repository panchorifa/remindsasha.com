import "babel-polyfill"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "material-design-icons/iconfont/material-icons.css"

import React from "react"
import { render } from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './store'
import Root from './components/Root'

const store = configureStore()
render(
  <Root store={store}/>,
  document.getElementById('root')
)
registerServiceWorker();
