import {useNavigate} from "react-router"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash, faPen} from "@fortawesome/free-solid-svg-icons"
import axiosInstance from "../../tools/axios_instance"

export default function ToUpdateNewsCard({onDelete, cardTitle, newsTitle, newsId}) {
  const navigate = useNavigate()

  async function handleDelete() {
    console.log(newsId)
    const confirmingDelete = window.confirm(
      "Are you sure you want to delete this news?"
    )
    if (!confirmingDelete) {
      return
    }

    try {
      await axiosInstance.delete(`/news/delete/${newsId}`).then((res) => {
        onDelete(newsId) // Update state in parent
      })
    } catch (error) {
      console.error("Error while deleting the news!", error)
    }
  }

  function handleEdit() {
    navigate(`/update-news/${newsId}`)
  }

  return (
    <div className="update-card-main-container">
      <div className="update-card-container">
        <div className="update-card-titles" newsid={newsId}>
          <h5 className="update-card-title"> Card: {cardTitle}</h5>
          <h5 className="update-news-title">News: {newsTitle}</h5>
        </div>
        <div className="update-card-icons">
          <FontAwesomeIcon
            icon={faPen}
            className="update-card-pen"
            onClick={handleEdit}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="update-card-trash"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}
