import axios from 'axios'
import {makeTransactionsThunk} from './transactions'

/**
 * ACTION TYPES
 */
const GOT_PORTFOLIO = 'GET_PORTFOLIO'

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

export const buyUpdatePortfolioThunk = details => async dispatch => {
  let res
  try {
    const {ticker, quantity, companyName, open} = details
    res = await axios.put('/api/portfolio/buy', {
      ticker,
      quantity,
      companyName,
      open
    })
  } catch (error) {
    console.log(error)
  }
}

// let quantityToInt = +parseInt(quantityToSell, 10).toFixed(2)

export const sellUpdatePortfolioThunk = details => async dispatch => {
  let res
  try {
    res = await axios.put('/api/portfolio/sell', {details})
    dispatch(makeTransactionsThunk(details))
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
      // eslint-disable-next-line no-case-declarations
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
