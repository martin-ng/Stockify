import React, {useState} from 'react'
import {connect} from 'react-redux'
import {sellUpdatePortfolioThunk, makeSellTransactionsThunk} from '../../store'

const PortfolioList = props => {
  const {
    symbol,
    openingPrice,
    companyName,
    totalShares,
    latestPrice
  } = props.stock

  const [quantity, setQuantity] = useState(0)
  const totalValue = +(totalShares * latestPrice).toFixed(2)
  const difference = +(latestPrice - openingPrice).toFixed(2)

  const stockColor = value => {
    if (value === 0) return 'grey'
    return value > 0 ? 'green' : 'red'
  }

  const sellStock = (
    sharesOwned,
    quantityToSell,
    stockPrice,
    companySymbol
  ) => {
    let action = 'SELL'
    let details = {sharesOwned, quantityToSell, stockPrice, companySymbol}
    props.sellShares(details)
    props.makeTransaction({action, companySymbol, stockPrice, quantityToSell})
  }

  return (
    <div>
      <div className="portfolio-list-row">
        <h2 style={{color: stockColor(difference)}}>{symbol}</h2>
        <h3>{companyName}</h3>
      </div>
      <div className="portfolio-list-row">
        <div>
          <p>Total shares: {totalShares}</p>
          <p style={{color: stockColor(difference)}}>Total: ${totalValue}</p>
        </div>
        <div>
          <input
            type="number"
            name="symbol quantity"
            placeholder={quantity}
            onChange={event => {
              setQuantity(event.target.value)
            }}
          />
          <button
            type="submit"
            disabled={quantity > totalShares}
            onClick={() =>
              sellStock(totalShares, quantity, latestPrice, symbol)
            }
          >
            Sell
          </button>
        </div>
      </div>
      <div className="portfolio-border" />
    </div>
  )
}

const mapState = state => {
  return {
    company: state.tickers.company,
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    sellShares: details => dispatch(sellUpdatePortfolioThunk(details)),
    makeTransaction: details => dispatch(makeSellTransactionsThunk(details))
  }
}

export default connect(mapState, mapDispatch)(PortfolioList)
