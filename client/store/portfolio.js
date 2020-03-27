import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_PORTFOLIO = 'GET_PORTFOLIO'
const BUY_UPDATE_VALUE = 'GOT_VALUE'

/**
 * INITIAL STATE
 */
const defaultPortfolio = {
  stocks: [],
  portfolioValue: 0,
  test: []
}

/**
 * ACTION CREATORS
 */
const gotPortfolio = portfolio => ({type: GOT_PORTFOLIO, portfolio})
const buyUpdateValue = details => ({type: BUY_UPDATE_VALUE, details})
const updatePortfolioValue = portfolio => ({type: UPDATE_VALUE, portfolio})
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
    console.log('update: redux', details)
    const {ticker, quantity, companyName} = details
    const {data} = await axios.put('/api/portfolio/increase', {
      ticker,
      quantity,
      companyName
    })
    // console.log("data redux: ", data)
  } catch (error) {
    console.log(error)
  }
}

export const updatePortfolioValueThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/portfolio')
    console.log('THUNK DATA: ', data)
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
      return {
        stocks: [...action.portfolio],
        totalValue: state.totalValue
      }
    default:
      return state
  }
}
