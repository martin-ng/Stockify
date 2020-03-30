import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div id="top-level-container">
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
