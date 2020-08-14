import React, {useEffect, useState} from 'react'
import axios from 'axios'

const StockNewsHome = () => {
  const [news, setNews] = useState([])

  const newsAPI =
    'http://newsapi.org/v2/everything?domains=wsj.com&apiKey=586d409720d74ca3acf8bca32af34781'

  useEffect(() => {
    fetchData()

    async function fetchData() {
      const {data} = await axios.get(newsAPI)

      let newData = []

      for (let i = 0; i < 10; i++) {
        newData.push(data.articles[i])
      }
      setNews(newData)
    }
  }, [])

  return (
    <div id="stocknews-container">
      <h1>HELLO</h1>
    </div>
  )
}

export default StockNewsHome
