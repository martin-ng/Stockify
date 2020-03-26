import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPortfolioThunk} from '../../store'

const PortfolioList = props => {
  //   useEffect(() => {
  //     fetchData()
  //     async function fetchData() {
  //       await props.getPortfolio()
  //     }
  //   }, [])

  return (
    <div>
      <div>
        <h1>Symbol {props.symbol}</h1>
      </div>
      <div>
        <h2>Shares {props.totalShares} </h2>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    stocks: state.portfolio.stocks,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolioThunk())
  }
}

export default connect(mapState, mapDispatch)(PortfolioList)
