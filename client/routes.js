import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Router, Redirect} from 'react-router-dom'
import history from './history'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  PortfolioHome,
  TransactionsHome,
  TradeHome
} from './components'

import {me} from './store'
import portfolioHome from './components/portfolio/portfolioHome'

const Routes = props => {
  useEffect(
    () => {
      props.loadInitialData()
    },
    [props.isloggedIn]
  )
  const {isLoggedIn} = props

  return (
    <div id="routes-container">
      {/* Routes placed here are available to all visitors */}
      {!isLoggedIn && (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      )}

      {isLoggedIn && (
        <Router history={history}>
          {/* Routes placed here are only available after logging in */}
          <Switch>
            <Route exact path="/" component={PortfolioHome} />
            <Route path="/portfolio" component={PortfolioHome} />
            <Route path="/transactions" component={TransactionsHome} />
            <Route component={PortfolioHome} />
          </Switch>

          <Route component={TradeHome} />
        </Router>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => dispatch(me())
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))
