import React, {useEffect} from 'react'
import {connect} from 'react-redux'
// import {getPortfolioThunk} from '../../store'

const StockNewsHome = () => {
  //   const {stocks, portfolioValue} = props.portfolio
  //   const {getPortfolio} = props

  //   useEffect(() => {
  //     fetchData()

  //     // this will update the portfolio view every 5000 ms(5 seconds)
  //     const interval = setInterval(() => {
  //       console.log('getting portfolio')
  //       getPortfolio()
  //     }, 5000)

  //     async function fetchData() {
  //       await getPortfolio()
  //     }

  //     return () => clearInterval(interval)
  //   }, [])

  return (
    <div id="stocknews-container">
      <h1>Helloasdasda</h1>
    </div>
  )
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     user: state.user,
//     portfolio: state.portfolio,
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     getPortfolio: () => dispatch(getPortfolioThunk())
//   }
// }
export default StockNewsHome
// export default connect(mapState, mapDispatch)(StockNewsHome)
