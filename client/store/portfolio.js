import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_PORTFOLIO = 'GET_PORTFOLIO'

/**
 * INITIAL STATE
 */
const defaultPortfolio = {
  stocks: [],
  totalValue: 0
}

/**
 * ACTION CREATORS
 */
const gotPortfolio = portfolio => ({type: GOT_PORTFOLIO, portfolio})

/**
 * THUNK CREATORS
 */
// export const me = () => async dispatch => {
//   try {
//     const res = await axios.get('/auth/me')
//     dispatch(getUser(res.data || defaultUser))
//   } catch (err) {
//     console.error(err)
//   }
// }

export const getPortfolioThunk = () => async dispatch => {
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
  console.log('action portfolio; ', action.portfolio)
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
