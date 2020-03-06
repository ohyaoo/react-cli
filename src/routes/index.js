import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import H5 from '~/layouts/H5'
import Home from '~/containers/Home'

const routes = history => {
  return (
    <Router history={history}>
      <Route path="/" component={H5}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  )
}

export default routes
