import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPortfolioThunk} from '../../store'
import PortfolioList from './portfolioList'

const PortfolioHome = props => {
  const [totalValue, setTotalValue] = useState(0)
  const [data, setData] = useState([])

  const testing = () => {
    console.log('testing: ')
  }

  useEffect(() => {
    fetchData()

    const interval = setInterval(() => {
      console.log('getting portfolio')
      props.getPortfolio()
      // portfolioValue(props.portfolio)
    }, 5000)

    async function fetchData() {
      await props.getPortfolio()
      setData(props.portfolio)
    }
    // const portfolioValue = portfolio => {
    //   let total = portfolio.reduce((acc, current) => {
    //     let shares = current.totalShares
    //     let price = current.latestPrice
    //     return acc + (+((shares * price).toFixed(2)))
    //   }, 0)
    //   // portfolio.forEach(el => console.log("el: ", el))
    //   console.log("TOTAL VALUE: ", total)
    //   setTotalValue(total)
    // }
    return () => clearInterval(interval)
  }, [])

  useEffect(
    () => {
      if (props.portfolio.length) {
        portfolioValue(props.portfolio)
      }
    },
    [totalValue]
  )

  console.log(totalValue)

  // const portfolioValue = portfolio => {
  //   let total = portfolio.reduce((acc, current) => {
  //     let shares = current.totalShares
  //     let price = current.latestPrice
  //     return acc + (+((shares * price).toFixed(2)))
  //   }, 0)
  //   // portfolio.forEach(el => console.log("el: ", el))
  //   setTotalValue(totalValue + total)
  // }

  // useEffect(() => {
  //   portfolioValue(props.portfolio)
  // })

  const {portfolio} = props

  // if (portfolio.length) {
  //   portfolioValue(portfolio)
  // }

  return (
    <div id="portfolio-container">
      <div>
        <h1>Your Portfolio {totalValue}</h1>
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolioThunk())
  }
}

export default connect(mapState, mapDispatch)(PortfolioHome)
