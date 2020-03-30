import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {
  getTickersThunk,
  makeTransactionsThunk,
  buyUpdatePortfolioThunk,
  me
} from '../../store'

const TradeHome = props => {
  const [ticker, setTicker] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [errorMsgNumber, setErrorNumber] = useState('')

  const {user, getTicker, company, makeOrder, increasePortfolio} = props

  const {companyName, open, latestPrice} = props.company

  const calculateTotal = (shares, price) => {
    let total = +(shares * price).toFixed(2)
    return total
  }

  const totalCost = calculateTotal(quantity, company.latestPrice)

  const resetState = () => {
    setQuantity('')
  }

  const onClickHandler = action => {
    let details = {
      action,
      ticker,
      price: totalCost,
      quantity,
      companyName,
      open
    }
    makeOrder(details)
    increasePortfolio(details)
    resetState()
  }

  return (
    <div id="trade-container">
      <h2>Cash Balance: ${user.cashBalance}</h2>

      <input
        id="input-company-symbol"
        type="text"
        placeholder="Search Company Ticker"
        value={ticker}
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
          <div id="trade-company-symbol">
            <h2>{company.symbol}</h2>
            {/* <div> */}
            <h3>{company.companyName}</h3>
          </div>

          <p>Price: ${latestPrice.toFixed(2)}</p>

          <p>
            {+totalCost.toFixed(2) > user.cashBalance
              ? 'You do not have enough money'
              : 'Total: $' + totalCost.toFixed(2)}
          </p>

          <input
            type="text"
            id="input-trade-quantity"
            name="symbol quantity"
            value={quantity}
            onChange={event => {
              const regex = /^\d+$/
              if (event.target.value === '' || regex.test(event.target.value)) {
                setErrorNumber('')
                setQuantity(event.target.value)
              } else {
                setErrorNumber('Please input a valid number!')
              }
            }}
          />
          <div>
            <button
              id="checkout-button"
              type="reset"
              defaultValue="Reset"
              disabled={quantity <= 0 || totalCost > user.cashBalance}
              onClick={() => onClickHandler('BUY')}
            >
              Checkout
            </button>
          </div>
          <div>{errorMsgNumber.length ? <p>{errorMsgNumber}</p> : <br />}</div>
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    company: state.tickers.company,
    portfolio: state.portfolio,
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getTicker: ticker => dispatch(getTickersThunk(ticker)),
    makeOrder: orderDetails => dispatch(makeTransactionsThunk(orderDetails)),
    increasePortfolio: orderDetails =>
      dispatch(buyUpdatePortfolioThunk(orderDetails)),
    getUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(TradeHome)
