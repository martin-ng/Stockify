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

  console.log('PORTFOLIO LIST: ', props)
  return (
    <div>
      <div>
        <h2>{symbol}</h2>
        <h3>{companyName}</h3>
      </div>
      <div>
        <p>Current price: {latestPrice}</p>
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
