import "./news_card.css"
import { NavLink } from "react-router"

export default function NewsCard({title, text, image, imgAlt, newsId}) {
  return (
    <NavLink to={`/news/${newsId}`} className="main-news-card">
      <img
        className="main-news-card-img"
        src={image}
        alt={imgAlt}
      />
      <div className="main-news-card-text-container">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </NavLink>
  )
}
