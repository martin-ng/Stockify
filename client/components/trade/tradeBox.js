import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

const TradeBox = props => {
  return (
    <div id="trade-container">
      <h1>BUY/SELL STOCKS</h1>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // stocks: state.portfolio.stocks,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  // return {
  //   getPortfolio: () => dispatch(getPortfolioThunk())
  // }
}

export default connect(mapState, mapDispatch)(TradeBox)
