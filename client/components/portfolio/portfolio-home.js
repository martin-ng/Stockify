import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPortfolioThunk} from '../../store'
import PortfolioList from './portfolio-list'

const PortfolioHome = props => {
  useEffect(() => {
    fetchData()
    async function fetchData() {
      await props.getPortfolio()
    }
  }, [])

  const {stocks} = props
  console.log('stocks props: ', props)
  console.log('stocks: ', stocks)

  return (
    <div>
      <div>
        <h1>Your Portfolio</h1>
      </div>
      <div>
        <h2>Your Balance: </h2>
      </div>
      {stocks.map((stock, index) => {
        return <PortfolioList key={index} stock={stock} />
      })}
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

export default connect(mapState, mapDispatch)(PortfolioHome)
