import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Router} from 'react-router-dom'
import history from './history'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  PortfolioHome,
  TransactionsHome,
  TradeHome
} from './components'

import {me} from './store'

/**
 * COMPONENT
 */

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
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route component={Login} />
        </Switch>
      )}

      {isLoggedIn && (
        <Router history={history}>
          {/* Routes placed here are only available after logging in */}

          <Switch>
            <Route path="/home" component={UserHome} />
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
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => dispatch(me())
    // loadInitialData() {
    //   dispatch(me())
    // }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
