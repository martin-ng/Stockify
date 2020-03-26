import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {me} from '../../store'

const TradeBox = props => {
  const {user} = props

  return (
    <div id="trade-container">
      <div>
        <div>
          <h1>Cash Balance: ${user.cashBalance}</h1>
        </div>

        {/* {transactions.length ? (
        transactions.map(transaction => {
          return (
            <TransactionsList key={transaction.id} transaction={transaction} />
          )
        })
      ) : (
        <h3>YOU DO NOT HAVE A TRANSACTION'S HISTORY</h3>
      )} */}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // stocks: state.portfolio.stocks,
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(TradeBox)
