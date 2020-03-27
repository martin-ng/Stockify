import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_PORTFOLIO = 'GET_PORTFOLIO'
const GOT_PORTFOLIO_VALUE = 'GET_PORTFOLIO_VALUE'
const BUY_UPDATE_VALUE = 'GOT_VALUE'

/**
 * INITIAL STATE
 */
const defaultPortfolio = {
  stocks: [],
  portfolioValue: 0
}

/**
 * ACTION CREATORS
 */
const gotPortfolio = portfolio => ({type: GOT_PORTFOLIO, portfolio})
// const updatePortfolioValue = portfolio => ({type: UPDATE_VALUE, portfolio})
const buyUpdateValue = details => ({type: BUY_UPDATE_VALUE, details})
/**
 * THUNK CREATORS
 */

export const getPortfolioThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/portfolio')
    dispatch(gotPortfolio(data))
  } catch (error) {
    console.log(error)
  }
}

export const buyUpdatePortfolio = details => async dispatch => {
  try {
    const {ticker, quantity, companyName, open} = details
    const {data} = await axios.put('/api/portfolio/increase', {
      ticker,
      quantity,
      companyName,
      open
    })
  } catch (error) {
    console.log(error)
  }
}

export const updatePortfolioValueThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/portfolio')
    dispatch(gotPortfolio(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GOT_PORTFOLIO:
      let portfolioValue = 0

      action.portfolio.forEach(stock => {
        let element = stock.latestPrice
        element = +element.toFixed(2)
        portfolioValue += element * stock.totalShares
      })

      return {
        stocks: [...action.portfolio],
        portfolioValue
      }
    default:
      return state
  }
}
