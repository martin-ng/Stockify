import React from 'react'
import {connect} from 'react-redux'

const TransactionsList = props => {
  const {
    datePurchased,
    action,
    symbol,
    priceAtPurchase,
    totalShares
  } = props.transaction

  return (
    <div>
      <div className="transactions-list-row">
        <h3>{symbol}</h3>
        <h3>
          {action}: {totalShares} shares
        </h3>
      </div>
      <div className="transactions-list-row">
        <p>Date: {datePurchased}</p>
        <p>price/share: ${priceAtPurchase}</p>
      </div>
      <div className="transactions-border" />
    </div>
  )
}

export default TransactionsList
