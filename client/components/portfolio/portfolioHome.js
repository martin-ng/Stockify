import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getPortfolioThunk} from '../../store'
import PortfolioList from './portfolioList'

const PortfolioHome = props => {
  const [totalValue, setTotalValue] = useState(0)
  const {stocks, portfolioValue} = props.portfolio

  useEffect(() => {
    fetchData()

    const interval = setInterval(() => {
      console.log('getting portfolio')
      props.getPortfolio()
    }, 5000)

    async function fetchData() {
      await props.getPortfolio()
    }

    return () => clearInterval(interval)
  }, [])

  return (
    <div id="portfolio-container">
      <div>
        <h1>Your Portfolio ${+portfolioValue.toFixed(2)}</h1>
      </div>

      {stocks.length ? (
        stocks.map(stock => {
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
    portfolio: state.portfolio,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolioThunk()),
    getPortfolioValue: symbols => dispatch()
  }
}

export default connect(mapState, mapDispatch)(PortfolioHome)
