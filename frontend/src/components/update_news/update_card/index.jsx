import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash, faPen} from "@fortawesome/free-solid-svg-icons"

export default function UpdateCard({cardTitle, newsTitle, newsId}) {
  return (
    <div className="update-card-main-container">
      <div className="update-card-container">
        <div className="update-card-titles" newsid={newsId}>
          <h5 className="update-card-title"> Card: {cardTitle}</h5>
          <h5 className="update-news-title">News: {newsTitle}</h5>
        </div>
        <div className="update-card-icons">
          <FontAwesomeIcon icon={faPen} className="update-card-pen" />
          <FontAwesomeIcon icon={faTrash} className="update-card-trash" />
        </div>
      </div>
    </div>
  )
}
