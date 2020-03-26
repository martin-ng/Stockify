import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_PORTFOLIO = 'GET_PORTFOLIO'
const UPDATE_VALUE = 'GOT_VALUE'

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

// export const updatePortfolioValueThunk = () => async dispatch => {
//   try {
//     const {data} = await axios.get('/api/portfolio')
//     console.log("THUNK DATA: ", data)
//     dispatch(gotPortfolio(data))
//   } catch (error) {
//     console.log(error)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultPortfolio, action) {
  console.log('action portfolio; ', action.portfolio)
  switch (action.type) {
    case GOT_PORTFOLIO:
      return {
        stocks: [...action.portfolio],
        totalValue: state.totalValue
      }
    // case GOT_VALUE:
    //   return {
    //     stocks: stocks,
    //     totalValue: state.totalValue,
    //     test: [...action.portfolio]
    //   }
    default:
      return state
  }
}
