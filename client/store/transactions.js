import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_TRANSACTIONS = 'GET_TRANSACTIONS'
const MAKE_TRANSACTIONS = 'MAKE_TRANSACTIONS'

/**
 * INITIAL STATE
 */
const defaultTransactions = {
  transactions: []
}

/**
 * ACTION CREATORS
 */
const gotTransactions = transactions => ({type: GOT_TRANSACTIONS, transactions})
const makeTransactions = orderDetails => ({
  type: MAKE_TRANSACTIONS,
  orderDetails
})

/**
 * THUNK CREATORS
 */

export const getTransactionsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/transactions')
    dispatch(gotTransactions(data))
  } catch (error) {
    console.log(error)
  }
}

export const makeTransactionsThunk = orderDetails => async dispatch => {
  const {action, ticker, price, quantity} = orderDetails
  const {data} = await axios.post('/api/transactions/create', {
    action,
    ticker,
    price,
    quantity
  })
}

/**
 * REDUCER
 */
export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return {
        transactions: [...action.transactions]
      }

    default:
      return state
  }
}
