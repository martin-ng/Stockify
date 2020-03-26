import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPortfolioThunk} from '../../store'

const PortfolioHome = props => {
  useEffect(() => {
    fetchData()
    async function fetchData() {
      await props.getPortfolio()
    }
  }, [])

  console.log('portfolio home: ', props)

  return (
    <div>
      <h2>STOCKS</h2>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    stocks: state.portfolio.stocks,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolioThunk())
  }
}

export default connect(mapState, mapDispatch)(PortfolioHome)

/**
 * PROP TYPES
 */
//   UserHome.propTypes = {
//     email: PropTypes.string
//   }
