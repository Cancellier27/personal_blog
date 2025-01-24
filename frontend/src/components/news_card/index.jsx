import "./news_card.css"

export default function NewsCard({title, text, image, imgAlt}) {
  return (
    <a href="#" className="main-news-card">
      <img
        className="main-news-card-img"
        src={image}
        alt={imgAlt}
      />
      <div className="main-news-card-text-container">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </a>
  )
}
