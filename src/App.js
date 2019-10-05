import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Scanner from './Scanner'
import VideoScanner from './VideoScanner'

function App() {
  const appRoutes = [
    {
      exact: true,
      path: '/',
      component: Scanner,
    },
    {
      exact: true,
      path: '/video',
      component: VideoScanner,
    },
  ]
  return (
    <Router>
      <div className="section">
        <Switch>
          {appRoutes.map(route => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </div>
    </Router>
  )
}

export default App
