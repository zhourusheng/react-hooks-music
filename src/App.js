import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'

import routes from './route'
import { GlobalStyle } from './style'
import { IconStyle } from './assets/iconfont/iconfont'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        <IconStyle />
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  )
}

export default App
