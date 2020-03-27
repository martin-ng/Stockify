import React, {useState} from 'react'
import {connect} from 'react-redux'
import {me, getTickersThunk} from '../../store'

const TradeDetails = props => {
  const [quantity, setQuantity] = useState(0)
  const [errorMsg, setError] = useState('')

  const calculateTotal = (shares, price, balance) => {
    let total = +(shares * price).toFixed(2)
    console.log('TOTAL: ', total)
    console.log('balance: ', balance)
    return total <= balance ? total : -1
  }

  const {user, getTicker, company} = props
  const totalCost = calculateTotal(
    quantity,
    company.latestPrice,
    user.cashBalance
  )

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
              <form>
                <h1>{company.symbol}</h1>
                <div>
                  <h2>{company.companyName}</h2>
                  <p>Price: ${company.latestPrice}</p>
                  {totalCost === -1 ? (
                    <p>You do not have enough money!</p>
                  ) : (
                    <p>Total : ${totalCost}</p>
                  )}
                </div>
                <button type="submit">Checkout</button>
              </form>
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
