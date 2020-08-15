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
  console.log('description', description)
  return (
    <div>
      <div className="news-card">
        <div>
          <img className="card-image" src={urlToImage} />
        </div>
        <div className="card-desc">
          <a href={url} className="card-title">
            {title}
          </a>
          <h4>{description}</h4>
          <h4>{publishedAt}</h4>
          <h4>{title}</h4>
        </div>
      </div>

      <div className="news-border" />
    </div>
  )
}

export default NewsCard
