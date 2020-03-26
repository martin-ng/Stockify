import React, {useState} from 'react'
import {connect} from 'react-redux'
import {me, getTickersThunk} from '../../store'
import config from '../../../config'
import Axios from 'axios'

const TradeBox = props => {
  const [quantity, setQuantity] = useState('')
  const [ticker, setTicker] = useState(1)

  const {user, getTicker} = props

  return (
    <div id="trade-container">
      <div>
        <div>
          <h1>Cash Balance: ${user.cashBalance}</h1>
        </div>
        <div>
          <input
            className="trade-box-container"
            type="text"
            placeholder="Search Company Ticker"
            name="symbol"
            onChange={event => {
              if (event.target.value !== '') {
                console.log('event: ', event.target.value)
                getTicker(event.target.value)
              }
              setTicker(event.target.value)
            }}
          />

          {/* <input type='submit' value='search' /> */}
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
    symbols: state.tickers,
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getTicker: ticker => dispatch(getTickersThunk(ticker))
  }
}

export default connect(mapState, mapDispatch)(TradeBox)
