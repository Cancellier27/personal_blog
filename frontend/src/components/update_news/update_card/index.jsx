import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons"
import axiosInstance from "../../../tools/axios_instance"

export default function UpdateCard({ onDelete, cardTitle, newsTitle, newsId }) {
  async function handleDelete() {
    try {
      await axiosInstance.delete(`/news/delete/${newsId}`)
      console.log("News deleted successfully!")
      onDelete(newsId) // Update state in parent
    } catch (error) {
      console.error("Error while deleting the news!", error)
    }
  }

  return (
    <div className="update-card-main-container">
      <div className="update-card-container">
        <div className="update-card-titles" newsid={newsId}>
          <h5 className="update-card-title"> Card: {cardTitle}</h5>
          <h5 className="update-news-title">News: {newsTitle}</h5>
        </div>
        <div className="update-card-icons">
          <FontAwesomeIcon icon={faPen} className="update-card-pen" />
          <FontAwesomeIcon icon={faTrash} className="update-card-trash" onClick={handleDelete} />
        </div>
      </div>
    </div>
  )
}
