import axios from 'axios'
import {getPortfolioThunk} from './portfolio'
import {me} from './user'

/**
 * ACTION TYPES
 */
const GOT_TRANSACTIONS = 'GET_TRANSACTIONS'

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
  try {
    let res
    res = await axios.post('/api/transactions/create', orderDetails)
    // this will allow both portfolio and transactions view to update on purchase
    dispatch(getPortfolioThunk())
    dispatch(getTransactionsThunk())
    dispatch(me())
  } catch (error) {
    console.log(error)
  }
}

export const makeSellTransactionsThunk = orderDetails => async dispatch => {
  let res
  try {
    let action = orderDetails.action,
      ticker = orderDetails.companySymbol,
      price = orderDetails.stockPrice,
      quantity = orderDetails.quantityToSell

    res = await axios.post('/api/transactions/create', {
      action,
      ticker,
      price,
      quantity
    })
  } catch (error) {
    console.log(error)
  }
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
