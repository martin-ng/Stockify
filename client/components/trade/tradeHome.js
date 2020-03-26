import React from 'react'
import {connect} from 'react-redux'
import {getTickersThunk} from '../../store'
import TradeDetails from './tradeDetails'

const TradeHome = props => {
  const {user} = props

  return (
    <div id="trade-container">
      <h1>Cash Balance: ${user.cashBalance}</h1>
      <TradeDetails />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getTicker: ticker => dispatch(getTickersThunk(ticker))
  }
}

export default connect(mapState, mapDispatch)(TradeHome)
