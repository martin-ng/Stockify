import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {
  getTickersThunk,
  getTransactionsThunk,
  makeTransactionsThunk,
  getPortfolioThunk,
  buyUpdatePortfolio,
  me
} from '../../store'

const TradeHome = props => {
  const [ticker, setTicker] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [errorMsg, setError] = useState('')

  const {
    user,
    getUser,
    getTicker,
    company,
    makeOrder,
    increasePortfolio,
    updatePortfolio,
    updateTransactions
  } = props
  const {companyName, open} = props.company

  // useEffect(() => {

  //   const interval = setInterval(() => {
  //     console.log('getting portfolio')
  //     props.getPortfolio()
  //     // portfolioValue(props.portfolio)
  //   }, 5000)

  //   return () => clearInterval(interval)
  // }, [])

  const calculateTotal = (shares, price, balance) => {
    let total = +(shares * price).toFixed(2)
    return balance - total
  }

  const totalCost = calculateTotal(
    quantity,
    company.latestPrice,
    user.cashBalance
  )

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
      updatePortfolio()
      updateTransactions()
      getUser()
    } else if (quantity <= 0) {
      console.log('please put a number higher than 0')
    } else if (user.cashBalance >= totalCoast) {
      console.log('You do not have enough money!')
    }
  }

  return (
    <div id="trade-container">
      <h1>Cash Balance: ${user.cashBalance}</h1>
      <input
        type="number"
        placeholder="Search Company Ticker"
        name="symbol"
        onChange={event => {
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
              Total :{' '}
              {totalCost < 0
                ? 'You do not have enough money'
                : '$' + totalCost.toFixed(2)}
            </p>

            <input
              type="text"
              name="symbol quantity"
              value={quantity}
              placeholder={quantity}
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
              type="submit"
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
    updatePortfolio: () => dispatch(getPortfolioThunk()),
    updateTransactions: () => dispatch(getTransactionsThunk()),
    getUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(TradeHome)
