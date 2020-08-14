import React from 'react'

const NewsCard = props => {
  const {
    author,
    content,
    description,
    publishedAt,
    source,
    title,
    url,
    urlToImage
  } = props.news

  return (
    <div>
      <div className="news-card">
        <img className="card-image" src={urlToImage} />
        <h3>{author}</h3>
        <h3>{title}</h3>
      </div>

      <div className="news-border" />
    </div>
  )
}

export default NewsCard
