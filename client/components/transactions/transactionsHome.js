import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getTransactionsThunk} from '../../store'
import TransactionsList from './transactionsList'
import TradeHome from '../trade/tradeHome'

const TransactionsHome = props => {
  const {transactions, getTransactions} = props

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <div id="test-container">
      <div id="transactions-container">
        <div>
          <h2>Your Transaction's History</h2>
        </div>

        {transactions.length ? (
          // prints the transaction history from newest to least recent
          transactions
            .slice(0)
            .reverse()
            .map(transaction => {
              return (
                <TransactionsList
                  key={transaction.id}
                  transaction={transaction}
                />
              )
            })
        ) : (
          <h3>You do not have a transaction history</h3>
        )}
      </div>
      <TradeHome />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    transactions: state.transactions.transactions,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getTransactions: () => dispatch(getTransactionsThunk())
  }
}

export default connect(mapState, mapDispatch)(TransactionsHome)
