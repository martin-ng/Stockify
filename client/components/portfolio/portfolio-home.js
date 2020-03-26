import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  getPortfolioThunk,
  updatePortfolioValue,
  getPortfolioValueThunk
} from '../../store'
import PortfolioList from './portfolio-list'
import Axios from 'axios'

const PortfolioHome = props => {
  useEffect(() => {
    loadInitialData()

    const interval = setInterval(() => {
      console.log('getting portfolio')
      props.getPortfolio()
    }, 5000)

    async function loadInitialData() {
      await props.getPortfolio()
    }
    return () => clearInterval(interval)
  }, [])

  const {portfolio} = props
  console.log('props: ', props.portfolio)

  return (
    <div id="portfolio-container">
      <div>
        <h1>Your Portfolio</h1>
      </div>
      <div>
        <h2>Your Balance: </h2>
      </div>
      {portfolio.length ? (
        portfolio.map(stock => {
          return <PortfolioList key={stock.id} stock={stock} />
        })
      ) : (
        <h3>YOU DO NOT OWN STOCKS</h3>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    portfolio: state.portfolio.stocks,
    // totalValue: state.portfolio.totalValue,
    test: state.portfolio.test,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolioThunk()),
    updateValues: () => dispatch(updatePortfolioValue())
    // getPortfolioValue: portfolio => dispatch(getPortfolioValueThunk(portfolio))
  }
}

export default connect(mapState, mapDispatch)(PortfolioHome)
