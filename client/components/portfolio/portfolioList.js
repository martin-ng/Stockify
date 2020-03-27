import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

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

  return (
    <div>
      <div>
        <h2 style={{color: stockColor(difference)}}>{symbol}</h2>
        <h3>{companyName}</h3>
      </div>
      <div>
        <p>Total shares: {totalShares}</p>
        <p style={{color: stockColor(difference)}}>${totalValue}/share</p>
      </div>
    </div>
  )
}

export default PortfolioList
