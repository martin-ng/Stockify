import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {
  getTickersThunk,
  getTransactionsThunk,
  makeTransactionsThunk,
  buyUpdatePortfolio,
  me
} from '../../store'

const TradeHome = props => {
  const [ticker, setTicker] = useState('')
  const [quantity, setQuantity] = useState(0)
  // const [count, setCount] = useState(0)
  const [errorMsg, setError] = useState('')

  const {
    user,
    getUser,
    getTicker,
    company,
    makeOrder,
    increasePortfolio
  } = props
  const {companyName, open} = props.company

  useEffect(
    () => {
      getUser()
    },
    [ticker, quantity]
  )

  const calculateTotal = (shares, price) => {
    let total = +(shares * price).toFixed(2)
    return total
  }

  const totalCost = calculateTotal(quantity, company.latestPrice)

  const onClickHandler = action => {
    let details = {
      action,
      ticker,
      price: totalCost,
      quantity,
      companyName,
      open
    }

    if (quantity > 0 && user.cashBalance >= totalCost) {
      makeOrder(details)
      increasePortfolio(details)
    } else if (quantity <= 0) {
      console.log('please put a number higher than 0')
    } else if (user.cashBalance >= totalCost) {
      console.log('You do not have enough money!')
    }
  }
  console.log('balance', props)
  return (
    <div id="trade-container">
      <h1>Cash Balance: ${user.cashBalance}</h1>
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

            <p>
              Total:
              {+totalCost.toFixed(2) > user.cashBalance
                ? 'You do not have enough money'
                : '$' + totalCost.toFixed(2)}
            </p>

            <input
              type="text"
              id="quantity-field"
              name="symbol quantity"
              value={quantity}
              onChange={event => {
                const regex = /^\d+$/
                if (
                  event.target.value === '' ||
                  regex.test(event.target.value)
                ) {
                  setQuantity(event.target.value)
                } else {
                  setError('Please input a number!')
                }
              }}
            />
            <button
              type="reset"
              defaultValue="Reset"
              disabled={quantity <= 0 || totalCost < 0}
              onClick={() => onClickHandler('BUY')}
            >
              Checkout
            </button>
            <div>{errorMsg.length ? <p>{errorMsg}</p> : <br />}</div>
          </div>
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
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getTicker: ticker => dispatch(getTickersThunk(ticker)),
    makeOrder: orderDetails => dispatch(makeTransactionsThunk(orderDetails)),
    increasePortfolio: orderDetails =>
      dispatch(buyUpdatePortfolio(orderDetails)),
    getUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(TradeHome)
