import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getTransactionsThunk} from '../../store'
import TransactionsList from './transactionsList'

const TransactionsHome = props => {
  useEffect(() => {
    props.getTransactions()
  }, [])

  const {transactions} = props

  console.log('TRANSACTIONS: ', transactions)

  return (
    <div id="transactions-container">
      <div>
        <h1>Your Transaction's History</h1>
      </div>

      {transactions.length ? (
        transactions.map(transaction => {
          return (
            <TransactionsList key={transaction.id} transaction={transaction} />
          )
        })
      ) : (
        <h3>YOU DO NOT HAVE A TRANSACTION'S HISTORY</h3>
      )}
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
