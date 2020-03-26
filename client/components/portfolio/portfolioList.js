import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPortfolioThunk} from '../../store'

const PortfolioList = props => {
  const {
    symbol,
    openingPrice,
    companyName,
    totalShares,
    latestPrice
  } = props.stock

  const totalValue = +(totalShares * latestPrice).toFixed(2)
  const difference = +(latestPrice - openingPrice).toFixed(2)
  const stockColor = value => {
    if (value === 0) return 'grey'
    return value > 0 ? 'green' : 'red'
  }

  console.log('PORTFOLIO LIST: ', props)
  return (
    <div>
      <div>
        <h2>{symbol}</h2>
        <h3>{companyName}</h3>
      </div>
      <div>
        <p style={{color: stockColor(difference)}}>Total Value {totalValue}</p>
        <p>Total shares: {totalShares}</p>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(PortfolioList)
