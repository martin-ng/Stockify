import React, {useState, useEffect, useAsyncHook} from 'react'
import {connect} from 'react-redux'
import {me, getTickersThunk} from '../../store'
import config from '../../../config'
import Axios from 'axios'

const TradeBox = props => {
  const [tickers, setTickers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState('')
  const [count, setCount] = useState(0)
  const handleChange = e => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    fetchData()

    const interval = setInterval(() => {
      console.log('getting tickers')
      fetchData()
    }, 600000)

    async function fetchData() {
      const response = await Axios.get(
        'https://sandbox.iexapis.com//beta/ref-data/symbols?token=' +
          config.IEX_TEST_API_KEY
      )
      setTickers(response.data)
    }

    return () => clearInterval(interval)
  }, [])

  useEffect(
    () => {
      const results = tickers.filter(element => {
        let current = element.symbol
        console.log('current: ', current)
        return current.toLowerCase().includes(searchTerm)
      })
      setSearchResults(results)
    },
    [searchTerm]
  )

  // tickers.forEach(element => console.log("element: ", element))
  console.log('search results: ', searchResults)
  const {user} = props

  return (
    <div id="trade-container">
      <div>
        <div>
          <h1>Cash Balance: ${user.cashBalance}</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
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
    getTicker: () => dispatch(getTickersThunk())
  }
}

export default connect(mapState, mapDispatch)(TradeBox)
