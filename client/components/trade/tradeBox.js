import React, {useState} from 'react'
import {connect} from 'react-redux'
import {me, getTickersThunk} from '../../store'
import config from '../../../config'
import Axios from 'axios'

const TradeBox = props => {
  const [quantity, setQuantity] = useState('')
  const [ticker, setTicker] = useState(1)
  const [amount, setAmount] = useState(0)
  const [errorMsg, setError] = useState('')

  const {user, getTicker, symbols} = props

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
                getTicker(event.target.value)
              }
              setTicker(event.target.value)
            }}
          />
          <input
            className="trade-box-container"
            type="text"
            placeholder="Amount"
            name="symbol quantity"
            value={amount}
            onChange={event => {
              const regex = /^\d+$/
              if (event.target.value === '' || regex.test(event.target.value)) {
                setAmount(event.target.value)
              } else {
                setError('Please input a number!')
              }
            }}
          />
          <div>{errorMsg.length ? <p>{errorMsg}</p> : <br />}</div>
        </div>
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
