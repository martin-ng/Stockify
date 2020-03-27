import React, {useState} from 'react'
import {connect} from 'react-redux'
import {me, getTickersThunk} from '../../store'

const TradeDetails = props => {
  const [quantity, setQuantity] = useState(0)
  const [ticker, setTicker] = useState('')

  const [symbol, setSymbol] = useState('')
  const [latestPrice, setLatestPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [errorMsg, setError] = useState('')

  const {user, getTicker, company} = props

  console.log('company: ', company)
  console.log('price: ', company.latestPrice)
  return (
    <div>
      <div>
        <div>
          <input
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
          {company.symbol ? (
            <div>
              <h1>{company.symbol}</h1>
              <div>
                <h2>{company.companyName}</h2>
                <p>Price: ${company.latestPrice}</p>
              </div>
            </div>
          ) : (
            <div />
          )}
          <input
            type="text"
            placeholder="Amount"
            name="symbol quantity"
            value={quantity}
            onChange={event => {
              const regex = /^\d+$/
              if (event.target.value === '' || regex.test(event.target.value)) {
                setQuantity(event.target.value)
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
    company: state.tickers.company,
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getTicker: ticker => dispatch(getTickersThunk(ticker))
  }
}

export default connect(mapState, mapDispatch)(TradeDetails)
