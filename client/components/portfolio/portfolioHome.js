import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getPortfolioThunk} from '../../store'
import PortfolioList from './portfolioList'

const PortfolioHome = props => {
  const {stocks, portfolioValue} = props.portfolio
  const {getPortfolio} = props

  useEffect(() => {
    fetchData()

    // this will update the portfolio view every 5000 ms(5 seconds)
    const interval = setInterval(() => {
      console.log('getting portfolio')
      getPortfolio()
    }, 5000)

    async function fetchData() {
      await getPortfolio()
    }

    return () => clearInterval(interval)
  }, [])
  console.log('PORTFOLIO: ', props)

  return (
    <div id="portfolio-container">
      <div>
        <h2>Your Portfolio: ${+portfolioValue.toFixed(2)}</h2>
      </div>

      {stocks.length ? (
        stocks.map(stock => {
          return <PortfolioList key={stock.id} stock={stock} />
        })
      ) : (
        <h3>You do not own stocks.</h3>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    portfolio: state.portfolio,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolioThunk())
  }
}

export default connect(mapState, mapDispatch)(PortfolioHome)
