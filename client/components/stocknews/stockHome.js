import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

const StockNewsHome = () => {
  const [news, setNews] = useState([])
  const [count, setCount] = useState(0)

  const stockNewsAPI = '586d409720d74ca3acf8bca32af34781'
  const newsAPI =
    'http://newsapi.org/v2/everything?domains=wsj.com&apiKey=586d409720d74ca3acf8bca32af34781'
  // useEffect(() => {
  //   fetchData()
  //     setCount(count + 1)
  //     console.log(count)
  //   function fetchData() {
  //     // let newsData = await axios.get(newsAPI)
  //     // console.log('news data', newsData.data.articles)
  //     // let newArr = newsData.data.articles
  //     // console.log('newArr', newArr)
  //     let newArr = [1, 2, 3]
  //     setNews(newArr)
  //     setCount(count + 1)
  //     setCount(count + 1)
  //     console.log(count)
  //     setCount(count + 1)
  //     console.log(count)
  //     // console.log('news', news)
  //   }

  // }, [])
  // console.log('news', news)
  return (
    <div>
      <h1>hi</h1>
    </div>
    // <div id="stocknews-container">
    // <h1>HELLO</h1>
    //   <p>You clicked {count} times</p>
    //   <button type='submit' onClick={() => setCount(count + 1)}>
    //     Click me
    //   </button>
    // </div>
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
