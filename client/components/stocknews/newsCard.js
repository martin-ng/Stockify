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

  let newDate = publishedAt.split('T')
  const datePublished = newDate[0]
  const timePublished = newDate[1].slice(0, 5)
  const formatDescription = description.slice(0, 200)

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
          <span>
            <p>
              {datePublished} {timePublished}
            </p>
          </span>
          <p>{`${formatDescription}...`}</p>
        </div>
      </div>

      <div className="news-border" />
    </div>
  )
}

export default NewsCard
