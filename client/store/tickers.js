import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_TICKERS = 'GET_TICKERS'
// const UPDATE_VALUE = 'GOT_VALUE'

/**
 * INITIAL STATE
 */
const defaultTickers = {
  company: {}
}

/**
 * ACTION CREATORS
 */
const gotTickers = tickers => ({type: GOT_TICKERS, tickers})

/**
 * THUNK CREATORS
 */

export const getTickersThunk = ticker => async dispatch => {
  try {
    const {data} = await axios.get(`/api/tickers/${ticker}`)
    dispatch(gotTickers(data.quote))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultTickers, action) {
  switch (action.type) {
    case GOT_TICKERS:
      return {
        company: {...action.tickers}
      }

    default:
      return state
  }
}
