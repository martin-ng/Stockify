import React, {useEffect, useState} from 'react'
import axios from 'axios'
import NewsCard from './newsCard'

const StockNewsHome = () => {
  const [newsList, setNews] = useState([])

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
      <div>
        <h2>Recent News</h2>
      </div>
      <div id="card-box">
        {newsList.length ? (
          // prints the transaction history from newest to least recent
          newsList.map(news => {
            return <NewsCard key={news.id} news={news} />
          })
        ) : (
          <h3>Loading news, please hold.</h3>
        )}
      </div>
    </div>
  )
}

export default StockNewsHome
