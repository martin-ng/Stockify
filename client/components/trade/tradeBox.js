import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {} from '../../store'

const TradeBox = props => {
  const [companySymbol, setSymbol] = useState('')

  return (
    <div>
      <h1>Cash</h1>
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
  return {
    getPortfolio: () => dispatch(getPortfolioThunk())
  }
}

export default connect(mapState, mapDispatch)(TradeBox)
